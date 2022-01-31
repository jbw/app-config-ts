import { ConfigurationBuilder } from '../packages/ectropy/configuration-builder'
import { JsonConfigurationSource } from '../packages/ectropy-json/JsonConfigurationSource'
import { IConfigurationProvider } from '../packages/ectropy/abstractions/IConfigurationProvider'
import { JsonConfigurationProvider } from '../packages/ectropy-json/JsonConfigurationProvider'
import { IConfigurationRoot } from '../packages/ectropy/abstractions/IConfigurationRoot'

describe('configuration-root', () => {
  it('should load configuration from json file', () => {
    // given
    const source = new JsonConfigurationSource()
    source.path = './test/examples/basic/basic-configuration-2.json'

    const builder = new ConfigurationBuilder()
    builder.add(source)

    const root: IConfigurationRoot = builder.build()

    // when
    const value = root.get('logging.level')

    // then
    expect(value).toBe('debug')
  })

  it('get values from array', () => {
    // given
    const source = new JsonConfigurationSource()
    source.path = './test/examples/basic/basic-configuration-array.json'

    const builder = new ConfigurationBuilder()
    builder.add(source)

    const root: IConfigurationRoot = builder.build()

    // when
    const value = root.get('connections.0.host')

    // then
    expect(value).toBe('localhost1')
  })

  it('should get section', () => {
    // given
    const source = new JsonConfigurationSource()
    source.path = './test/examples/basic/basic-configuration-1.json'

    const builder = new ConfigurationBuilder()
    builder.add(source)

    const root: IConfigurationRoot = builder.build()

    // when
    const section = root.getSection('logging.level')

    expect(section.value).toEqual('debug')
  })
})

it('should get top level section', () => {
  // given
  const source = new JsonConfigurationSource()
  source.path = './test/examples/basic/basic-configuration-1.json'

  const builder = new ConfigurationBuilder()
  builder.add(source)

  const root: IConfigurationRoot = builder.build()

  // when
  const section = root.getSection('logging').getSection('level')

  expect(section.value).toEqual('debug')
})

it('should get value from nested config', () => {
  // given
  const source = new JsonConfigurationSource()
  source.path = './test/examples/basic/basic-configuration-1.json'

  const builder = new ConfigurationBuilder()
  builder.add(source)

  const root: IConfigurationRoot = builder.build()

  // when
  const section = root.getSection('logging')
  const value = section.get('level')
  expect(value).toEqual('debug')
})


describe('provider', () => {
  it('grabs value for a nested section', () => {
    // given
    const source = new JsonConfigurationSource()
    source.path = './test/examples/basic/basic-configuration-1.json'

    const builder = new ConfigurationBuilder()
    builder.add(source)

    const provider: IConfigurationProvider = source.build(builder)
    provider.load()

    // when
    const value = provider.get('logging.level')

    // then
    expect(value).toEqual('debug')

 })

  it('reloads when file changes', () => {})
})

describe('overriding configurations', () => {
  it('overrides a base configuration with override one', () => {})
})

describe('overriding configuation values by convention', () => {
  it('overrides value with environment variable', () => {})
})
