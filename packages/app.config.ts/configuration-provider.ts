import { ConfigurationPath } from './configuration-path';
import { IConfigurationProvider } from './configuration-provider.interface';

export abstract class ConfigurationProvider implements IConfigurationProvider {
  data: object;

  constructor() {
    this.data = {};
  }

  public get(key: string): string | null {
    const value = this.data[key];

    // Handle null values as empty strings
    if (value === null) {
      return '';
    }

    // Handle empty objects as null
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
      Object.keys(this.data).forEach((key) => {
        results.push(this.segment(key, 0));
      });
    } else {
      Object.keys(this.data).forEach((key) => {
        if (
          key.startsWith(parentPath) &&
          key.length > parentPath.length &&
          key.charAt(parentPath.length) === ConfigurationPath.keyDelimiter
        ) {
          const segment = this.segment(key, parentPath.length + 1);
          results.push(segment);
        }
      });
    }
    return results;
  }

  private segment(key: string, prefixLength: number): string {
    const index = key.indexOf(ConfigurationPath.keyDelimiter, prefixLength);
    const segment = index < 0 ? key.substring(prefixLength) : key.substring(prefixLength, index);
    return segment;
  }
}
