import { join } from 'path';
import * as slash from 'slash';
import { argv } from 'yargs';

import { BuildType } from './fourinarow.config.interfaces';

/**
 * The enumeration of available environments.
 * @type {Environments}
 */
export const BUILD_TYPES: BuildType = {
  DEVELOPMENT: 'dev',
  PRODUCTION: 'prod'
}

export class FourinarowConfig {

  /**
   * The port where the application will run.
   * The default port is `3000`, which can be overriden by the  `--port` flag when running `npm start`.
   * @type {number}
   */
  PORT = argv['port'] || 3000;

  /**
   * The url of the mongo the database.
   * The default port is `mongodb://localhost:27017/`, which can be overriden by the  `--mongo-url` flag when running `npm start`.
   * @type {number}
   */
  MONGO_URL = argv['mongo-url'] || 'mongodb://localhost:27017/';

  /**
   * The root folder of the project (up one levels from the current directory).
   */
  PROJECT_ROOT = join(__dirname, '../');

  /**
   * The current build type.
   * The default build type is `dev`, which can be overriden by the `--build-type dev|prod` flag when running `npm start`.
   */
  BUILD_TYPE = getBuildType();

  /**
   * The path for the base of the application at runtime.
   * The default path is based on the environment '/',
   * which can be overriden by the `--base` flag when running `npm start`.
   * @type {string}
   */
  APP_BASE = argv['base'] || '/';

  /**
   * The base path of node modules.
   * @type {string}
   */
  NPM_BASE = slash(join(this.APP_BASE, 'node_modules/'));

  /**
   * The directory where the bootstrap file is located.
   * The default directory is `app`.
   * @type {string}
   */
  BOOTSTRAP_DIR = argv['app'] || 'app';

  /**
   * The directory where the client files are located.
   * The default directory is `client`.
   * @type {string}
   */
  APP_CLIENT = argv['client'] || 'client';

  /**
   * The bootstrap file to be used to boot the application. The file to be used is dependent if the hot-loader option is
   * used or not.
   * Per default (non hot-loader mode) the `main.ts` file will be used, with the hot-loader option enabled, the
   * `hot_loader_main.ts` file will be used.
   * @type {string}
   */
  BOOTSTRAP_MODULE = `${this.BOOTSTRAP_DIR}/main`;

  /**
   * The default title of the application as used in the `<title>` tag of the
   * `index.html`.
   * @type {string}
   */
  APP_TITLE = 'Four In A Row';

  /**
   * The base folder of the applications source files.
   * @type {string}
   */
  APP_SRC = this.APP_CLIENT;

  /**
   * The folder of the applications asset files.
   * @type {string}
   */
  ASSETS_SRC = `${this.APP_SRC}/assets`;

  /**
  * The folder of the applications css files.
  * @type {string}
  */
  CSS_SRC = `${this.APP_SRC}/css`;

}

/**
 * Returns the application build type.
 */
function getBuildType() {
  let type = (argv['build-type'] || argv['env'] || '').toLowerCase();
  let base: string[] = argv['_'];
  let prodKeyword = !!base.filter(o => o.indexOf(BUILD_TYPES.PRODUCTION) >= 0).pop();
  if ((base && prodKeyword) || type === BUILD_TYPES.PRODUCTION) {
    return BUILD_TYPES.PRODUCTION;
  } else {
    return BUILD_TYPES.DEVELOPMENT;
  }
}
