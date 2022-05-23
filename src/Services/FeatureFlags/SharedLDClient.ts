import LDClient, { LDUser } from 'launchdarkly-react-native-client-sdk';
import Config from 'react-native-config';
import { getBuildNumber, getVersion } from 'react-native-device-info';

export const getLdUserCustomAttributes = () => ({
  appVersion: getVersion(),
  buildNumber: getBuildNumber(),
  environment: Config.ENV_NAME,
});

export class SharedLDClient {
  private static ldClientInstance: LDClient;

  private static getClientInstance = async () => {
    if (!this.ldClientInstance) {
      const client = new LDClient();
      await client.isInitialized().catch(async () => {
        // Promise rejects if the client is not initialised, configure the client in that case
        await client.configure(
          { mobileKey: Config.LAUNCHDARKLY_SDK_KEY },
          { anonymous: true, custom: getLdUserCustomAttributes() },
          5000,
        );
      });
      this.ldClientInstance = client;
    }
    return this.ldClientInstance;
  };

  static allFlags = async () => {
    const client = await this.getClientInstance();
    return client.allFlags();
  };

  static identifyUser = async (ldUser: LDUser) => {
    const client = await this.getClientInstance();
    await client.identify(ldUser);
  };
}
