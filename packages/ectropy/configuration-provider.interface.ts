/**
 * @description Provides configuration key/values for an application.
 */
export interface IConfigurationProvider {
  get(key: string): string | null;
  set(key: string, value: string): void;

  /**
   * @description Loads the configuration from the source.
   */
  load(): void;

  getChildKeys(parentPath: string): string[];
}
