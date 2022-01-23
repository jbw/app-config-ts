import { IConfigurationBuilder, IConfigurationProvider, IConfigurationRoot, IConfigurationSource } from '../abstractions/abstractions';
export declare class JsonConfigurationSource implements IConfigurationSource {
    /**
     * @description This is the interface for the configuration of the application.
     */
    build(builder: IConfigurationBuilder): IConfigurationProvider;
}
export declare class JsonConfigurationBuilder implements IConfigurationBuilder {
    readonly sources: IConfigurationSource[];
    add(source: IConfigurationSource): IConfigurationBuilder;
    build(): IConfigurationRoot;
}
export declare class ConfigurationProvider implements IConfigurationProvider {
    private readonly source;
    constructor(source: IConfigurationSource);
    get(key: string): string;
    set(key: string, value: string): void;
    load(): void;
}
export declare abstract class FileConfigurationProvider extends ConfigurationProvider {
    get(key: string): string;
    set(key: string, value: string): void;
    abstract loadFile(stream: any): void;
}
export declare class JsonConfigurationProvider extends FileConfigurationProvider {
    data: any;
    get(key: string): string;
    set(key: string, value: string): void;
    loadFile(text: string): void;
}
