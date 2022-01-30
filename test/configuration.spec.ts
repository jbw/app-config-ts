import { JsonConfigurationBuilder } from '../packages/ectropy-json/JsonConfigurationBuilder';
import { JsonConfigurationSource } from '../packages/ectropy-json/JsonConfigurationSource';

describe("loading a configuration", () => { 

  it("loads a json file", () => {

    const builder = new JsonConfigurationBuilder();
    builder.add(new JsonConfigurationSource());
    const config = builder.build();
    
  });

  it("grabs value for a nested section", () => {

  });

  it("reloads when file changes", () => {  
  });


  
});

describe("overriding configuation values by convention", () => { 


  it("overrides value with environment variable", () => {  

  });

  
});