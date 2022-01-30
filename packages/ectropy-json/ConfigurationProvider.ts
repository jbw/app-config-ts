import { IConfigurationProvider } from "../ectropy/abstractions/IConfigurationProvider";
import { IConfigurationSource } from "../ectropy/abstractions/IConfigurationSource";


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
