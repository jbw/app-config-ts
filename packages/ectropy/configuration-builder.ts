import { IConfigurationBuilder } from "./abstractions/IConfigurationBuilder";
import { IConfigurationSource } from "./abstractions/IConfigurationSource";
import { IConfigurationRoot } from "./abstractions/IConfigurationRoot";
import { IConfigurationProvider } from './abstractions/IConfigurationProvider';
import { ConfigurationRoot } from './ConfigurationRoot';


export class ConfigurationBuilder implements IConfigurationBuilder {
  public readonly sources: IConfigurationSource[] = [];

  public add(source: IConfigurationSource): IConfigurationBuilder {
    this.sources.push(source);
    return this;
  }

  public build(): IConfigurationRoot {

    const providers: IConfigurationProvider[] = [];
    this.sources.forEach(source => {
      providers.push(source.build(this));
    });

    return new ConfigurationRoot(providers);
  }
}
