import { FileConfigurationProvider } from '../ectropy/FileConfigurationProvider';
import { JsonConfigurationSource } from './JsonConfigurationSource';
import * as fs from 'fs';

export class JsonConfigurationProvider extends FileConfigurationProvider {
  data: object | unknown;

  constructor(source: JsonConfigurationSource) {
    super(source);
  }

  /**
   * @deprecated Use load() instead.
   * @param text
   */
  public override loadFile(path: string): void {
    const data = fs.readFileSync(path);

    const parsed = JSON.parse(data.toString());

    const result = this.flatten(parsed);
    this.data = result;

    console.log('final', this.data);
  }

  private flatten(obj: object, path = ''): object {
    const result: object = {};

    Object.keys(obj).forEach((key) => {
      const value = obj[key];

      if (typeof value === 'object') {
        const flattened = this.flatten(value, `${path}${key}.`);
        Object.assign(result, flattened);
      } else {
        result[`${path}${key}`] = value;
      }
    });

    return result;
  }
}
