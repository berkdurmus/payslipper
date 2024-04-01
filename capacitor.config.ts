import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.payslipper.app',
  appName: 'payslipper',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
