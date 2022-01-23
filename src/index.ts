import { getFileInfo } from 'prettier';
import { JsonConfigurationBuilder, JsonConfigurationProvider, JsonConfigurationSource } from './json/implementations';



const jsonConfigSource = new JsonConfigurationProvider(new JsonConfigurationSource());
jsonConfigSource.loadFile(`{ "connectionString": "mongodb://localhost:27017/test" }`);

const connectionString = jsonConfigSource.get('connectionString');
console.log(connectionString);

const builder = new JsonConfigurationBuilder();
builder.add(new JsonConfigurationSource());
const config = builder.build();
