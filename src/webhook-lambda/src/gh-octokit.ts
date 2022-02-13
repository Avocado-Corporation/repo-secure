import { Octokit } from '@octokit/rest';
import { createAppAuth } from '@octokit/auth-app';

const octokit = async (installationId: any):Promise<Octokit> => {
  const ghRepoSecurePK = Buffer.from(process.env?.GH_REPOSECURE_PK || '', 'base64').toString();
  console.log(`created a new OctoKit form installion id: ${installationId}`);
  return new Octokit({
    authStrategy: createAppAuth,
    auth: {
      appId: process.env.GH_APP_ID,
      privateKey: ghRepoSecurePK,
      installationId,
    },

  });
};

export default octokit;
