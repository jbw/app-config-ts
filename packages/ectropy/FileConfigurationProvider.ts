import { ConfigurationProvider } from './ConfigurationProvider';
import { FileConfigurationSource } from './file-configuration-source';

export abstract class FileConfigurationProvider extends ConfigurationProvider {
  constructor(private readonly source: FileConfigurationSource) {
    super();

    this.load();
  }

  abstract loadFile(path?: string): void;

  public override load(): void {
    this.loadFile(this.source.path);
  }
}
