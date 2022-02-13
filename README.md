# Welcome to Ectropy!

### Setup

`examples/basic/app.ts`

```ts
const root = new ConfigurationBuilder()
  .setBasePath('./')
  .addEnvironmentVariables()
  .add(new JsonConfigurationSource('heroes.config.json'))
  .build();

const { spiderman } = root.getWithType<HeroesConfig>('hero');

console.log(`Spider-Man strength: ${spiderman.powers.strength}`);
```

### Type

`examples/basic/heroes.config.ts`

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
