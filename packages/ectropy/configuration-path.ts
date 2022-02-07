export class ConfigurationPath {
  static readonly keyDelimiter: string = '.';

  public static combine(path1: string, path2: string): string {
    return path1 + ConfigurationPath.keyDelimiter + path2;
  }

  public static getParentPath(path: string): string {
    return path.substring(0, path.lastIndexOf(ConfigurationPath.keyDelimiter));
  }

  public static getSectionKey(path: string): string {
    return path.substring(path.lastIndexOf(ConfigurationPath.keyDelimiter) + 1);
  }
}
