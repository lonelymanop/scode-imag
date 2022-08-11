import * as dotEnv from 'dotenv';
import {projectSeed, userSeed} from './helpers/seed';

dotEnv.config({path: `${__dirname}/../.env.test`});

async function clean() {
  await projectSeed.clean();
  await userSeed.clean();
}

clean();