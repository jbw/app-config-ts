import { ConfigurationBuilder } from '../../packages/core/configuration-builder';
import { JsonConfigurationSource } from '../../packages/json';
import HeroesConfig from './heroes.config';

// eslint-disable-next-line @typescript-eslint/no-empty-function
console.debug = function (): void {};

const root = new ConfigurationBuilder()
  .setBasePath('./')
  .addEnvironmentVariables()
  .add(new JsonConfigurationSource('heroes.config.json'))
  .build();

const { spiderman } = root.getSectionWithType<HeroesConfig>('hero');
console.log(`Spider-Man strength: ${spiderman.powers.strength}`);
