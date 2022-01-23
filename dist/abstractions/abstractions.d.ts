/**
 * @description key/value application configuration properties.
 */
export interface IConfiguration {
    get(key: string): string;
    getSection(section: string): IConfigurationSection;
}
export interface IConfigurationSection {
}
export interface IConfigurationRoot {
}
/**
 * @description This is the interface for the configuration of the application.
 */
export interface IConfigurationSource {
    /**
     * Builds the configuration for this source.
     * @param IConfigurationBuilder The configuration builder.
     * @returns IConfigurationProvider The configuration provider.
     */
    build(IConfigurationBuilder: any): IConfigurationProvider;
}
/**
 * @description Builds application configuration.
 */
export interface IConfigurationBuilder {
    readonly sources: IConfigurationSource[];
    add(IConfigurationSource: any): IConfigurationBuilder;
    build(): IConfigurationRoot;
}
/**
 * @description Provides configuration key/values for an application.
 */
export interface IConfigurationProvider {
    get(key: string): string;
    set(key: string, value: string): void;
    load(): void;
}
