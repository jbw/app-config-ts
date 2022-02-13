import { ConfigurationBuilder } from '../../packages/ectropy/configuration-builder';
import { JsonConfigurationSource } from '../../packages/ectropy-json';
import HeroesConfig from './heroes.config';
import { EnvironmentVariablesConfigurationSource } from '../../packages/ectropy/environment-variables-configuration-source';

// eslint-disable-next-line @typescript-eslint/no-empty-function
console.debug = function (): void {};

const root = new ConfigurationBuilder()
  .setBasePath('./')
  .add(new EnvironmentVariablesConfigurationSource())
  .add(new JsonConfigurationSource('heroes.config.json'))
  .build();

const { spiderman } = root.getSectionWithType<HeroesConfig>('hero');
console.log(`Spider-Man strength: ${spiderman.powers.strength}`);
