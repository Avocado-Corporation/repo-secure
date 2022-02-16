//  add a security policy to a new repo and best practices to repo
import { Octokit } from '@octokit/rest';
import { createAppAuth } from '@octokit/auth-app';

const ghRepoSecurePK = Buffer.from(
  process.env?.GH_REPOSECURE_PK || '',
  'base64',
).toString();

const gh = new Octokit({
  authStrategy: createAppAuth,
  auth: {
    appId: process.env?.GH_APP_ID || '',
    privateKey: ghRepoSecurePK,
    installationId: process.env.INSTALLATION_ID,
  },
});

const getTemplate = (fileName: string) => {
  gh.repos.getContent({
    owner: '',
    repo: '',
    path: `/docs/templates/${fileName}`,
  });
};

type NewFile = {
  owner: string;
  repo: string;
  path: string;
  message: string;
  content: any;
};
const addFile = (file: NewFile) => {
  gh.repos.createOrUpdateFileContents({
    ...file,
  });
};

const addSecurity = async (owner: string, repo: string) => {
  gh.rest.repos.enableAutomatedSecurityFixes({
    owner,
    repo,
  });
};

const addVulnerabilityAlerts = async (owner: string, repo: string) => {
  gh.rest.repos.enableVulnerabilityAlerts({
    owner,
    repo,
  });
};

// eslint-disable-next-line object-curly-newline
export { addSecurity, addVulnerabilityAlerts, getTemplate, addFile };
