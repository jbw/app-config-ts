import { IConfigurationBuilder } from "../ectropy/abstractions/IConfigurationBuilder";
import { IConfigurationSource } from "../ectropy/abstractions/IConfigurationSource";
import { IConfigurationRoot } from "../ectropy/abstractions/IConfigurationRoot";


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
