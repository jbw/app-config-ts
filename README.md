# Welcome to Ectropy!


### Setup
```ts
const root = new ConfigurationBuilder()
  .setBasePath('./')
  .add(new EnvironmentVariablesConfigurationSource())
  .add(new JsonConfigurationSource('heroes.config.json'))
  .build() as ConfigurationRoot;

const { spiderman } = root.getWithType<HeroesConfig>('hero');

console.log(`Spider-Man strength: ${spiderman.powers.strength}`);
```

### Type 

```ts
type HeroesConfig = {
  spiderman: {
    powers: {
      strength: number;
    };
  };
};

export default HeroesConfig;
```

### Config
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
