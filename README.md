# Welcome to Ectropy!

Typed configuration for your applications how you want it when you want it. 

* Type your configuration with `class`, `interface` and `type` to provide typed access to your configuration files. 
* Slice and dice a configuration file into many types depending on the scenario and usage in your app.
* Override configuration with environment variables by convention. 
* Add multiple configuration files (e.g. `config.dev.json`, `condfig.prod.json`) which override values by layering (order matters!)

### Setup

`examples/basic/app.ts`

```ts
const root = new ConfigurationBuilder()
  .setBasePath('./')
  .addEnvironmentVariables()
  .add(new JsonConfigurationSource('heroes.config.json'))
  .build();

```

### Usage 
Create a type and bind it to your configuration. This can be a subsection of the configuration so you can use different settings based on your scenario. 

```ts
type HeroesConfig = {
  spiderman: {
    powers: {
      strength: number;
    };
  };
};
```

```ts
const { spiderman } = root.getWithType<HeroesConfig>('hero');

// 🤩
console.log(`Spider-Man strength: ${spiderman.powers.strength}`);
```

### Config file

`examples/basic/heroes.config.json`

```json
{
  "hero": {
    "spiderman": {
      "name": "Spider-Man",
      "powers": {
        "strength": 100,
        "speed": 100,
        "intelligence": 100,
        "combat": 100
      }
    }
  }
}
```
