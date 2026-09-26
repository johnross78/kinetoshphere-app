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
      // RC5 uses the plugin's native iOS YouTube player for YouTube-hosted exercises.
      // Keep the main-WebView patch as a fallback for any remaining embeds, and
      // use the plugin's internal WKWebView Referer fix for Error 152/153.
      patchRefererHeader: true,
      refererHeader: 'https://www.youtube.com'
    }
  }
};

export default config;
