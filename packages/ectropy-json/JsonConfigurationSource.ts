import { IConfigurationProvider } from "../ectropy/abstractions/IConfigurationProvider";
import { IConfigurationBuilder } from "../ectropy/abstractions/IConfigurationBuilder";
import { JsonConfigurationProvider } from './JsonConfigurationProvider';
import { FileConfigurationSource } from '../ectropy/file-configuration-source';


export class JsonConfigurationSource extends FileConfigurationSource {
  /**
   * @description This is the interface for the configuration of the application.
   */
  public build(builder: IConfigurationBuilder): IConfigurationProvider {
    return new JsonConfigurationProvider(this);
  }

}
