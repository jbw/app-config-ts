import { ConfigurationProvider } from './ConfigurationProvider';
import { FileConfigurationSource } from './file-configuration-source';

export abstract class FileConfigurationProvider extends ConfigurationProvider {

  constructor(private readonly source: FileConfigurationSource) {
    super();

    this.load();
  }

  abstract loadFile(stream: any): void;

  public override load(): void { 
    this.loadFile(this.source.path);

  }

}
