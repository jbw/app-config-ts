import { ConfigurationBuilder } from '../packages/ectropy/configuration-builder';
import { JsonConfigurationSource } from '../packages/ectropy-json/JsonConfigurationSource';
import { IConfigurationProvider } from '../packages/ectropy/abstractions/IConfigurationProvider';
import { IConfigurationRoot } from '../packages/ectropy/abstractions/IConfigurationRoot';

function buildConfigurationProvider(path: string): IConfigurationProvider {
  const source = new JsonConfigurationSource();
  source.path = path;

  const builder = new ConfigurationBuilder();
  builder.add(source);

  const provider: IConfigurationProvider = source.build(builder);
  provider.load();
  return provider;
}

describe('configuration-root', () => {
  it('should load configuration from json file', () => {
    // given
    const source = new JsonConfigurationSource();
    source.path = './test/examples/basic/basic-configuration-2.json';

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
    const source = new JsonConfigurationSource();
    source.path = './test/examples/array/basic-configuration-array.json';

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
    const source = new JsonConfigurationSource();
    source.path = './test/examples/basic/basic-configuration-1.json';

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
  const source = new JsonConfigurationSource();
  source.path = './test/examples/basic/basic-configuration-1.json';

  const builder = new ConfigurationBuilder();
  builder.add(source);

  const root: IConfigurationRoot = builder.build();

  // when
  const section = root.getSection('logging').getSection('level');

  expect(section.value).toEqual('debug');
});

it('should get value from nested config', () => {
  // given
  const source = new JsonConfigurationSource();
  source.path = './test/examples/basic/basic-configuration-1.json';

  const builder = new ConfigurationBuilder();
  builder.add(source);

  const root: IConfigurationRoot = builder.build();

  // when
  const section = root.getSection('logging');
  const value = section.get('level');
  expect(value).toEqual('debug');
});

it('should handle basic types', () => {
  // given
  const source = new JsonConfigurationSource();
  source.path = './test/examples/basic/basic-types.json';

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

  it('reloads when file changes', () => {});
});

describe('empty object handling', () => {
  it('empty object adds as null', () => {
    // given
    const provider: IConfigurationProvider = buildConfigurationProvider('./test/examples/empty/empty-object.json');

    // when
    const value = provider.get('key');

    // then
    expect(value).toBeUndefined();
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
    const provider: IConfigurationProvider = buildConfigurationProvider(
      './test/examples/envvars/overridden-by-envvar.json',
    );

    // when
    process.env.LOGGING_LEVEL = 'debug';
    const value = provider.get('logging.level');

    // then
    expect(value).toBe('debug');
  });
});

describe('overriding with multiple config files', () => {
  it.only('overrides taking oldest specficied', () => {
    // given
    const devSource = new JsonConfigurationSource();
    devSource.path = './test/examples/overriding-multiple-configs/dev-config.json';

    const prodSource = new JsonConfigurationSource();
    prodSource.path = './test/examples/overriding-multiple-configs/prod-config.json';

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
// describe('overriding configurations', () => {
//   it('overrides a base configuration with override one', () => {});
// });

// describe('overriding configuation values by convention', () => {
//   it('overrides value with environment variable', () => {});
// });
