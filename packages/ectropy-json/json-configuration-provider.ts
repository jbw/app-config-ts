import * as fs from 'fs';

import { FileConfigurationProvider } from '../ectropy/file-configuration-provider';
import { JsonConfigurationSource } from './json-configuration-source';
import { ConfigurationPath } from '../ectropy/configuration-path';

export class JsonConfigurationProvider extends FileConfigurationProvider {
  constructor(source: JsonConfigurationSource) {
    super(source);
  }

  public override loadFile(path: string): void {
    const data = fs.readFileSync(path);

    this.data = JsonParser.parse(data);
  }
}

export class JsonParser {
  public static parse(data: object): object {
    const parsed = JSON.parse(data.toString());
    const result = this.flatten(parsed);

    return result;
  }

  private static flatten(obj: object, path = ''): object {
    const result: object = {};
    Object.keys(obj).forEach((key) => {
      const value = obj[key];

      if (value === null) {
        // Set as empty string
        result[`${path}${key}`] = '';
      } else if (typeof value === 'object') {
        // Recurse until we reach a value
        const flattened = this.flatten(value, `${path}${key}${ConfigurationPath.keyDelimiter}`);

        Object.assign(result, flattened);
      } else {
        // Assume these are values
        result[`${path}${key}`] = value;
      }
    });

    return result;
  }
}
