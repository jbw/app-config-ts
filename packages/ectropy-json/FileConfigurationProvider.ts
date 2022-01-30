import { ConfigurationProvider } from './ConfigurationProvider';


export abstract class FileConfigurationProvider extends ConfigurationProvider {


  public get(key: string): string {
    throw new Error("Method not implemented.");
  }

  public set(key: string, value: string): void {
    throw new Error("Method not implemented.");
  }

  abstract loadFile(stream: any): void;
}
