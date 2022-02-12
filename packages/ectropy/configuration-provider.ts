import { ConfigurationPath } from './configuration-path';
import { IConfigurationProvider } from './configuration-provider.interface';

export abstract class ConfigurationProvider implements IConfigurationProvider {
  data: object;

  constructor() {
    this.data = {};
  }

  public get(key: string): string | null {
    const envKey = key.toUpperCase().replace(/\./g, '_');

    const envValue = process.env[envKey];
    if (envValue) {
      this.set(key, envValue.toString());
    }

    console.log('ConfigurationProvider.get', key, this.data);

    const value = this.data[key];
    console.log('ConfigurationProvider.get', key, value);

    if (value === null) {
      return '';
    }
    if (typeof value === 'object' && Object.keys(value).length === 0) {
      return null;
    }

    return value;
  }

  public set(key: string, value: string): void {
    this.data[key] = value;
  }

  public abstract load(): void;

  public getChildKeys(parentPath: string): string[] {
    console.debug('ConfigurationProvider.getChildKeys', parentPath);
    const results: string[] = [];

    if (parentPath == null) {
      console.log('parentPath == null');
      Object.keys(this.data).forEach((dataKey) => {
        results.push(this.segment(dataKey, 0));
      });
    } else {
      const keys = Object.keys(this.data);

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        console.log('childkey', key, parentPath);

        if (
          key.startsWith(parentPath) &&
          key.length > parentPath.length &&
          key.charAt(parentPath.length) === ConfigurationPath.keyDelimiter
        ) {
          console.log(parentPath);
          const segment = this.segment(key, parentPath.length + 1);
          results.push(segment);
        }
      }
    }

    return results;
  }

  private segment(key: string, prefixLength: number): string {
    console.log('segment', key, prefixLength);
    const index = key.indexOf(ConfigurationPath.keyDelimiter, prefixLength);
    console.log('index', index);
    const segment = index < 0 ? key.substring(prefixLength) : key.substring(prefixLength, index);
    return segment;
  }
}
