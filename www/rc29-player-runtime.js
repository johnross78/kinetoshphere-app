/* RC29 / v6.10.35 runtime guardrails.
   Keeps a locally launched circuit authoritative while background cloud sync is reconciling,
   and fits Player prescription text to the space actually available. */
(() => {
  const clone = value => value == null ? value : JSON.parse(JSON.stringify(value));

  function persistActiveCircuitSoon(){
    try{
      if(!activeCircuit?.items?.length || typeof put!=="function") return;
      const snapshot=clone(activeCircuit);
      Promise.resolve(put("settings",{key:"activeCircuit",value:snapshot}))
        .catch(err=>console.warn("RC29 active circuit persistence warning",err));
    }catch(err){
      console.warn("RC29 active circuit persistence warning",err);
    }
  }

  if(typeof prepareCurrentBuilderCircuitForPlayer==="function"){
    const originalPrepare=prepareCurrentBuilderCircuitForPlayer;
    prepareCurrentBuilderCircuitForPlayer=function(...args){
      const ok=originalPrepare.apply(this,args);
      if(ok) persistActiveCircuitSoon();
      return ok;
    };
  }

  /* A background private-cloud pull used to be able to overwrite activeCircuit with
     an older/empty cloud setting just after a local random circuit entered Player.
     Preserve the local session while the user is actively working with it. */
  if(typeof pullLatestCloud==="function"){
    const originalPullLatestCloud=pullLatestCloud;
    pullLatestCloud=async function(...args){
      const preserveLocal=Boolean(activeCircuit?.items?.length && (workingCircuit?.length || document.body.classList.contains("player-active")));
      const localActive=preserveLocal?clone(activeCircuit):null;
      const result=await originalPullLatestCloud.apply(this,args);

      if(localActive?.items?.length){
        activeCircuit=localActive;
        try{
          await put("settings",{key:"activeCircuit",value:clone(localActive)});
        }catch(err){
          console.warn("RC29 could not restore active circuit after cloud reconciliation",err);
        }
        if(document.body.classList.contains("player-active") && typeof renderPlayer==="function"){
          renderPlayer();
          if(typeof syncPlayerCardHeights==="function") syncPlayerCardHeights();
        }
      }
      return result;
    };
  }

  /* Direct calls to showView("player") also get a builder fallback, so Player never
     renders an empty state while a valid Current Circuit is already in memory. */
  if(typeof showView==="function"){
    const originalShowView=showView;
    showView=function(name,...args){
      if(name==="player" && (!activeCircuit?.items?.length) && workingCircuit?.length && typeof prepareCurrentBuilderCircuitForPlayer==="function"){
        prepareCurrentBuilderCircuitForPlayer();
      }
      return originalShowView.call(this,name,...args);
    };
  }

  function fitPrescriptionText(){
    const row=document.getElementById("prescriptionTimerRow");
    const node=document.getElementById("timer");
    if(!row || !node || !document.body.classList.contains("player-active")) return;
    if(row.clientWidth<20 || row.clientHeight<20) return;

    node.classList.remove("ks-fit-prescription");
    node.style.removeProperty("--ks-fit-font-size");

    const computed=parseFloat(getComputedStyle(node).fontSize)||48;
    let size=Math.min(computed,96);
    const minSize=14;

    node.classList.add("ks-fit-prescription");
    node.style.setProperty("--ks-fit-font-size",size+"px");

    const fits=()=>node.scrollWidth<=row.clientWidth-4 && node.scrollHeight<=row.clientHeight-4;
    while(size>minSize && !fits()){
      size-=2;
      node.style.setProperty("--ks-fit-font-size",size+"px");
    }
  }

  let fitFrame=0;
  function scheduleFit(){
    cancelAnimationFrame(fitFrame);
    fitFrame=requestAnimationFrame(()=>{
      fitPrescriptionText();
      requestAnimationFrame(fitPrescriptionText);
    });
  }

  if(typeof renderPlayer==="function"){
    const originalRenderPlayer=renderPlayer;
    renderPlayer=function(...args){
      const result=originalRenderPlayer.apply(this,args);
      scheduleFit();
      return result;
    };
  }

  window.addEventListener("resize",scheduleFit,{passive:true});
  window.addEventListener("orientationchange",()=>setTimeout(scheduleFit,120),{passive:true});

  const row=document.getElementById("prescriptionTimerRow");
  if(row && "ResizeObserver" in window){
    const observer=new ResizeObserver(scheduleFit);
    observer.observe(row);
  }
})();
