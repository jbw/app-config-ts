import { IConfigurationBuilder } from './configuration-builder.interface';
import { IConfigurationProvider } from './configuration-provider.interface';
import { IConfigurationSource } from './configuration-source.interface';
import { EnvironmentVariablesConfigurationProvider } from './environment-variables-configuration-provider';

export class EnvironmentVariablesConfigurationSource implements IConfigurationSource {
  public prefix?: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  build(builder: IConfigurationBuilder): IConfigurationProvider {
    return new EnvironmentVariablesConfigurationProvider(this.prefix);
  }
}
