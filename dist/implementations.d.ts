import { IConfigurationBuilder, IConfigurationProvider, IConfigurationRoot, IConfigurationSource } from './abstractions/abstractions';
export declare class ConfigurationSource implements IConfigurationSource {
    /**
     * @description This is the interface for the configuration of the application.
     */
    build(builder: IConfigurationBuilder): IConfigurationProvider;
}
export declare class ConfigurationBuilder implements IConfigurationBuilder {
    readonly sources: IConfigurationSource[];
    add(source: IConfigurationSource): IConfigurationBuilder;
    build(): IConfigurationRoot;
}
export declare class ConfigurationProvider implements IConfigurationProvider {
    private readonly config;
    constructor(config: IConfigurationRoot);
    get(key: string): string;
    set(key: string, value: string): void;
    load(): void;
}
