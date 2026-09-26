import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.kinetosphere.app',
  appName: 'Kinetosphere',
  webDir: 'www',
  server: {
    iosScheme: 'kinetosphere'
  }
};

export default config;
