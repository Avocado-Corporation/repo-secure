import { createAppAuth } from '@octokit/auth-app';
import { Octokit } from '@octokit/rest';

const ghRepoSecurePK = Buffer.from(
  process.env?.GH_REPOSECURE_PK || '',
  'base64'
).toString();

const gh = new Octokit({
  authStrategy: createAppAuth,
  auth: {
    appId: process.env?.GH_APP_ID || '',
    privateKey: ghRepoSecurePK,
    installationId: process.env.INSTALLATION_ID
  }
});

const getTemplate = async (owner: string, repo: string, fileName: string) => {
  console.log(`Getting template for: ${fileName}`);

  const template = await gh.repos.getContent({
    owner,
    repo,
    path: `/docs/templates/${fileName}`
  });
  const { content = {} } = { ...template.data };
  console.log('Template Received: ', fileName);
  return content;
};

type NewFile = {
  owner: string;
  repo: string;
  path: string;
  message: string;
  content: any;
};
const addFile = async (file: NewFile) => {
  await gh.repos.createOrUpdateFileContents({
    ...file
  });
};
export { addFile, getTemplate };
