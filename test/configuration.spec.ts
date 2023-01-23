import { ConfigurationBuilder } from '../packages/core/configuration-builder';
import { IConfigurationProvider } from '../packages/core/configuration-provider.interface';
import { ConfigurationRoot } from '../packages/core/configuration-root';
import { IConfigurationRoot } from '../packages/core/configuration-root.interface';
import { JsonConfigurationSource } from '../packages/json/json-configuration-source';

function buildConfigurationProvider(path: string): IConfigurationProvider {
  const source = new JsonConfigurationSource(path);

  const builder = new ConfigurationBuilder();
  builder.add(source);

  const provider: IConfigurationProvider = source.build(builder);
  provider.load();
  return provider;
}

describe('configuration loading', () => {
  it('should load configuration using base path', () => {
    const config = new ConfigurationBuilder()
      .setBasePath(__dirname + '/examples/configuration-loading/')
      .add(new JsonConfigurationSource('base-configuration.json'))
      .build();

    expect(config.get('logging.level')).toBe('debug');
  });

  it('should load configuration with base path as __dirname', () => {
    const config = new ConfigurationBuilder()
      .setBasePath(__dirname)
      .add(new JsonConfigurationSource('/examples/configuration-loading/base-configuration.json'))
      .build();

    expect(config.get('logging.level')).toBe('debug');
  });

  it('should load configuration with base path as default', () => {
    const config = new ConfigurationBuilder()
      .setBasePath('./')
      .add(new JsonConfigurationSource('test/examples/configuration-loading/base-configuration.json'))
      .build();
    expect(config.get('logging.level')).toBe('debug');
  });

  it('should load configuration with base path not set', () => {
    const config = new ConfigurationBuilder()

      .add(new JsonConfigurationSource('test/examples/configuration-loading/base-configuration.json'))
      .build();

    expect(config.get('logging.level')).toBe('debug');
  });
});

describe('configuration-root', () => {
  it('should load configuration from json file', () => {
    // given
    const source = new JsonConfigurationSource('./test/examples/basic/basic-configuration-2.json');

    const builder = new ConfigurationBuilder();
    builder.add(source);

    const root: IConfigurationRoot = builder.build();

    // when
    const value = root.get('logging.level');

    // then
    expect(value).toBe('debug');
  });

  it('get values from array', () => {
    // given
    const source = new JsonConfigurationSource('./test/examples/array/basic-configuration-array.json');

    const builder = new ConfigurationBuilder();
    builder.add(source);

    const root: IConfigurationRoot = builder.build();

    // when
    const value = root.get('connections.0.host');

    // then
    expect(value).toBe('localhost1');
  });

  it('should get section', () => {
    // given
    const source = new JsonConfigurationSource('./test/examples/basic/basic-configuration-1.json');

    const builder = new ConfigurationBuilder();
    builder.add(source);

    const root: IConfigurationRoot = builder.build();

    // when
    const section = root.getSection('logging.level');

    expect(section.value).toEqual('debug');
  });
});

it('should get top level section', () => {
  // given
  const source = new JsonConfigurationSource('./test/examples/basic/basic-configuration-1.json');

  const builder = new ConfigurationBuilder();
  builder.add(source);

  const root: IConfigurationRoot = builder.build();

  // when
  const section = root.getSection('logging').getSection('level');

  expect(section.value).toEqual('debug');
});

it('should get value from nested config', () => {
  // given
  const source = new JsonConfigurationSource('./test/examples/basic/basic-configuration-1.json');

  const builder = new ConfigurationBuilder();
  builder.add(source);

  const root: IConfigurationRoot = builder.build();

  // when
  const section = root.getSection('logging');
  const value = section.get('level');
  expect(value).toEqual('debug');
});

it('should get nested value from config using a type', () => {
  // given
  const source = new JsonConfigurationSource('./test/examples/nested/heroes.json');

  const builder = new ConfigurationBuilder();
  builder.add(source);

  const root: IConfigurationRoot = builder.build();

  // when
  const section = (root as ConfigurationRoot).getSectionWithType<{ spiderman: { powers: { strength: number } } }>(
    'hero',
  );
  const value = section.spiderman.powers.strength;
  expect(value).toEqual(100);
});

it('should get nested value from config using a type', () => {
  // given
  const source = new JsonConfigurationSource('./test/examples/nested/heroes.json');

  const builder = new ConfigurationBuilder();
  builder.add(source);

  const root: IConfigurationRoot = builder.build();

  // when
  const spiderman = (root as ConfigurationRoot).getSectionWithType<{ powers: { strength: number } }>('hero.spiderman');
  const value = spiderman.powers.strength;
  expect(value).toEqual(100);
});

it('should get value from config using a type', () => {
  // given
  const source = new JsonConfigurationSource('./test/examples/basic/basic-configuration-1.json');

  const builder = new ConfigurationBuilder();
  builder.add(source);

  const root: IConfigurationRoot = builder.build();

  // when
  const logging = (root as ConfigurationRoot).getSectionWithType<{ level: string; format: string }>('logging');
  const value = logging.level;
  expect(value).toEqual('debug');
});

it('should handle basic types', () => {
  // given
  const source = new JsonConfigurationSource('./test/examples/basic/basic-types.json');

  const builder = new ConfigurationBuilder();
  builder.add(source);

  const root: IConfigurationRoot = builder.build();

  // when
  const children = root.getSection('basicTypes').getSection('array').getSection('0').value;

  expect(children).toEqual(1);
});

describe('provider', () => {
  it('grabs value for a nested section', () => {
    // given
    const provider: IConfigurationProvider = buildConfigurationProvider(
      './test/examples/basic/basic-configuration-1.json',
    );

    // when
    const value = provider.get('logging.level');

    // then
    expect(value).toEqual('debug');
  });
});

describe('empty object handling', () => {
  it('empty object adds as null', () => {
    // given
    const provider: IConfigurationProvider = buildConfigurationProvider('./test/examples/empty/empty-object.json');

    // when
    const value = provider.get('key');

    // then
    expect(value).toBeNull();
  });

  it('null object adds as empty string', () => {
    // given
    const provider: IConfigurationProvider = buildConfigurationProvider('./test/examples/empty/null-object.json');

    // when
    const value = provider.get('key');

    // then
    expect(value).toBe('');
  });

  it('nested object does not add parent', () => {
    // given
    const provider: IConfigurationProvider = buildConfigurationProvider('./test/examples/empty/nested-object.json');

    // when
    const value = provider.get('key.nested');

    // then
    expect(value).toBe('value');
  });
});

describe('overriding with environment variables', () => {
  const env = Object.assign({}, process.env);

  afterAll(() => {
    process.env = env;
  });

  it('environment variables overrides config', () => {
    // given
    process.env.logging_level = 'debug';

    const root = new ConfigurationBuilder()
      .addEnvironmentVariables()
      .add(new JsonConfigurationSource('./test/examples/envvars/overridden-by-envvar.json'))
      .build();

    // when
    const value = root.get('logging.level');

    // then
    expect(value).toBe('debug');
  });
});

describe('overriding with multiple config files', () => {
  it('overrides taking oldest specficied', () => {
    // given
    const devSource = new JsonConfigurationSource('./test/examples/overriding-multiple-configs/dev-config.json');

    const prodSource = new JsonConfigurationSource('./test/examples/overriding-multiple-configs/prod-config.json');

    const builder = new ConfigurationBuilder();
    builder.add(prodSource);
    builder.add(devSource);

    // when
    const root = builder.build();

    // then
    expect(root.get('appName')).toBe('test-app');
    expect(root.get('logging.level')).toBe('info');
    expect(root.get('logging.format')).toBe('json');
    expect(root.get('ssl')).toBe(true);
  });
});
