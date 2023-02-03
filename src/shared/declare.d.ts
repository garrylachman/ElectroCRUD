declare module 'dockerode-compose' {
  export default class DockerodeCompose {
    constructor(dockerode, file, projectName);

    pull();

    up();

    down();
  }
}

declare module 'knex-hooks';
declare module 'knex-json-filter';
declare module '@jeash/knex-meta';
