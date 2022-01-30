import { FileConfigurationProvider } from './FileConfigurationProvider';


export class JsonConfigurationProvider extends FileConfigurationProvider {

  data: any;

  public get(key: string): string {
    return this.data[key];
  }

  public set(key: string, value: string): void {
  }

  public override loadFile(text: string): void {
    this.data = JSON.parse(text);
  }
}
