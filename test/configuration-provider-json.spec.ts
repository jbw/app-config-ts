import { JsonConfigurationProvider, JsonConfigurationSource } from '../src/json/implementations';

describe("configuration-provider-json", () => { 
  it("should be able to load a json file", () => {
    const jsonConfigSource = new JsonConfigurationProvider(new JsonConfigurationSource());
    jsonConfigSource.loadFile(`{ "connectionString": "mongodb://localhost:27017/test" }`);
    const connectionString = jsonConfigSource.get('connectionString');
    expect(connectionString).toBe("mongodb://localhost:27017/test");
  });
});