
import { IConfigurationProvider } from "../ectropy/abstractions/IConfigurationProvider";

export abstract class ConfigurationProvider implements IConfigurationProvider {


  public readonly data: any;

  constructor() {
    this.data = {};
  }

  public get(key: string): string {
    return this.data[key];
  }

  public set(key: string, value: string): void {
    this.data[key] = value;
  }

  public abstract load(): void;
}
