import { IConfigurationRoot } from './abstractions/IConfigurationRoot';
import { IConfigurationProvider } from "./abstractions/IConfigurationProvider";


export class ConfigurationRoot implements IConfigurationRoot {
  public providers: IConfigurationProvider[] = [];

  constructor(providers: IConfigurationProvider[]) {
    this.providers = providers;
  }
}
