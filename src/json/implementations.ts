import { IConfigurationBuilder, IConfigurationProvider, IConfigurationRoot, IConfigurationSource } from '../abstractions/abstractions';

export class JsonConfigurationSource implements IConfigurationSource {
  /**
   * @description This is the interface for the configuration of the application.
   */
  public build(builder: IConfigurationBuilder): IConfigurationProvider {
    return new JsonConfigurationProvider(this);
  }

}

export class JsonConfigurationBuilder implements IConfigurationBuilder {
  public readonly sources: IConfigurationSource[] = [];

  public add(source: IConfigurationSource): IConfigurationBuilder {
    this.sources.push(source);
    return this;
  }

  public build(): IConfigurationRoot {
    throw new Error("Method not implemented.");
  }
}

export class ConfigurationProvider implements IConfigurationProvider {
  constructor(private readonly source: IConfigurationSource) {

  }

  public get(key: string): string {
    throw new Error("Method not implemented.");
  }

  public set(key: string, value: string): void {
    throw new Error("Method not implemented.");
  }

  public load(): void {
    throw new Error("Method not implemented.");
  }
}

export abstract class FileConfigurationProvider extends ConfigurationProvider {


  public get(key: string): string {
    throw new Error("Method not implemented.");
  }

  public set(key: string, value: string): void {
    throw new Error("Method not implemented.");
  }

  abstract loadFile(stream: any): void;
}

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
