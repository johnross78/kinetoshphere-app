import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.kinetosphere.app',
  appName: 'Kinetosphere',
  webDir: 'www',
  server: {
    iosScheme: 'kinetosphere'
  },
  plugins: {
    YoutubePlayer: {
      // The Kinetosphere player remains our existing inline IFrame API player.
      // This plugin's Capacitor 8 sync hook patches the main WKWebView so
      // YouTube requests carry a valid HTTPS Referer on iOS/iPadOS.
      patchRefererHeader: true,
      refererHeader: 'https://www.youtube.com'
    }
  }
};

export default config;
