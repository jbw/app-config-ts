import { ConfigurationBuilder } from '@app-config-ts/core/configuration-builder';
import { JsonConfigurationSource } from '@app-config-ts/json';
import HeroesConfig from './heroes.config';

const root = new ConfigurationBuilder()
  .setBasePath('./')
  .addEnvironmentVariables()
  .add(new JsonConfigurationSource('heroes.config.json'))
  .build();

const { spiderman } = root.getSectionWithType<HeroesConfig>('hero');
console.log(`Spider-Man strength: ${spiderman.powers.strength}`);
