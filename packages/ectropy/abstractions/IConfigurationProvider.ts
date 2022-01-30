/**
 * @description Provides configuration key/values for an application.
 */
export interface IConfigurationProvider {

  get(key: string): string;
  set(key: string, value: string): void;
  load(): void;
}
