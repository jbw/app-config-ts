import { FileConfigurationProvider } from '../ectropy/FileConfigurationProvider';
import { JsonConfigurationSource } from './JsonConfigurationSource';
import * as fs from "fs";


export class JsonConfigurationProvider extends FileConfigurationProvider {

  data: any;

  constructor(source: JsonConfigurationSource) {
    super(source);
  }
  
  /**
   * @deprecated Use load() instead.
   * @param text
   */
  public override loadFile(path: string): void {
    const data = fs.readFileSync(path);
    
    this.data = JSON.parse(data.toString());
  }
}
