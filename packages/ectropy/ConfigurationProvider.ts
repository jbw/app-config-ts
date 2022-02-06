import { IConfigurationProvider } from '../ectropy/abstractions/IConfigurationProvider';

export abstract class ConfigurationProvider implements IConfigurationProvider {
  data: object;

  constructor() {
    this.data = {};
  }

  public get(key: string): string {
    const envKey = key.toUpperCase().replace(/\./g, '_');

    const envValue = process.env[envKey];
    if (envValue) {
      this.set(key, envValue.toString());
    }

    console.debug('ConfigurationProvider.get', key, this.data[key]);

    return this.data[key];
  }

  public set(key: string, value: string): void {
    this.data[key] = value;
  }

  public abstract load(): void;

  public getChildKeys(parentPath: string): string[] {
    console.debug('ConfigurationProvider.getChildKeys', parentPath);
    const results: string[] = [];
    const keys = Object.keys(this.data);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];

      if (key.startsWith(parentPath) && key.length > parentPath.length && key.charAt(parentPath.length) === '.') {
        results.push(this.segment(key, parentPath.length + 1));
      }
    }

    return results;
  }

  private segment(key: string, prefixLength: number): string {
    const index = key.indexOf('.', prefixLength);
    const segment = index < 0 ? key.substring(prefixLength) : key.substring(prefixLength, index);
    return segment;
  }
}
