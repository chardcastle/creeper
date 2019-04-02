import { env } from './env';

export const config = {
    baseUrl: (env.baseUrl)? env.baseUrl : 'http://creeper-api.local',
    projectTitle: (env.projectTitle)? env.projectTitle : 'Creeper'
};
