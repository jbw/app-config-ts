import { IConfigurationProvider } from "../ectropy/abstractions/IConfigurationProvider";
import { IConfigurationBuilder } from "../ectropy/abstractions/IConfigurationBuilder";
import { IConfigurationSource } from "../ectropy/abstractions/IConfigurationSource";
import { JsonConfigurationProvider } from './JsonConfigurationProvider';


export class JsonConfigurationSource implements IConfigurationSource {
  /**
   * @description This is the interface for the configuration of the application.
   */
  public build(builder: IConfigurationBuilder): IConfigurationProvider {
    return new JsonConfigurationProvider(this);
  }

}
