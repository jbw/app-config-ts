import { ConfigurationBuilder } from '../packages/ectropy/configuration-builder';
import { JsonConfigurationSource } from '../packages/ectropy-json/JsonConfigurationSource';
import { IConfigurationProvider } from '../packages/ectropy/abstractions/IConfigurationProvider';
import { JsonConfigurationProvider } from '../packages/ectropy-json/JsonConfigurationProvider';
import { IConfigurationRoot } from '../packages/ectropy/abstractions/IConfigurationRoot';

describe("loading a configuration", () => {

  it("loads a json file", () => {

    const builder = new ConfigurationBuilder();
    builder.add(new JsonConfigurationSource());
    const config = builder.build();

  });

  it("grabs value for a nested section", () => {

    // given
    const source = new JsonConfigurationSource();
    source.path = './test/examples/basic/basic-configuration-1.json';

    const builder = new ConfigurationBuilder();
    builder.add(source);

    // const root: IConfigurationRoot = builder.build();
 
    const provider: IConfigurationProvider = source.build(builder);
    provider.load();


    // when
    const value = provider.get('logging')

    // then
    expect(value).toMatchObject({
      "level": "debug",
      "format": "json"
    });

  });

  it("reloads when file changes", () => {

  });

});

describe("overriding configurations", () => {

  it("overrides a base configuration with override one", () => {

  })
})

describe("overriding configuation values by convention", () => {


  it("overrides value with environment variable", () => {

  });
});