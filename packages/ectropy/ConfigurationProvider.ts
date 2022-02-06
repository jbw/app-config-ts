import { IConfigurationProvider } from '../ectropy/abstractions/IConfigurationProvider';

export abstract class ConfigurationProvider implements IConfigurationProvider {
  public readonly data: object | never;

  constructor() {
    this.data = {};
  }

  public get(key: string): string {
    console.log('ConfigurationProvider.get', key, this.data[key]);
    return this.data[key];
  }

  public set(key: string, value: string): void {
    this.data[key] = value;
  }

  public abstract load(): void;

  public getChildKeys(parentPath: string): string[] {
    console.log('ConfigurationProvider.getChildKeys', parentPath);
    const results: string[] = [];
    const keys = Object.keys(this.data);
    console.log('ConfigurationProvider.getChildKeys', keys);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];

      console.log('datakey1', key, parentPath);

      if (key.startsWith(parentPath) && key.length > parentPath.length && key.charAt(parentPath.length) === '.') {
        results.push(this.segment(key, parentPath.length + 1));
      }
    }

    return results;
  }

  private segment(key: string, prefixLength: number): string {
    const index = key.indexOf('.', prefixLength);

    const segment = index < 0 ? key.substring(prefixLength) : key.substring(prefixLength, index);
    console.log('segment', key, prefixLength, index, segment);
    return segment;
  }
}
