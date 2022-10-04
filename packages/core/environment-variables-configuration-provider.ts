import { ConfigurationProvider } from './configuration-provider';

export class EnvironmentVariablesConfigurationProvider extends ConfigurationProvider {
  constructor(private prefix?: string) {
    super();
    this.load();
  }

  public override load(): void {
    const env = process.env;
    const keys = Object.keys(env);

    keys.forEach((key) => {
      const value = env[key];

      if (value !== undefined) {
        const envKey = key.replace(/_/g, '.');
        this.set(envKey, value);
      }
    });
  }
}
