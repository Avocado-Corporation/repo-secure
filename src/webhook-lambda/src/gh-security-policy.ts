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

const getTemplate = async (owner: string, repo: string, fileName: string) => {
  const template = await gh.repos.getContent({
    owner,
    repo,
    path: `/docs/templates/${fileName}`,
  });
  const { content = {} } = { ...template.data };
  console.log('Template Received: ', content);
  return template;
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
    ...file,
  });
};

const addSecurity = async (owner: string, repo: string) => {
  const octokit = new Octokit({
    auth: process.env.REPO_SECURE_PAT,
    previews: ['london-preview'],
  });
  const addSecurityResponse =
    await octokit.rest.repos.enableAutomatedSecurityFixes({
      owner,
      repo,
    });
  console.log(`Add Security Response: ${addSecurityResponse}`);
};

const addVulnerabilityAlerts = async (owner: string, repo: string) => {
  const octokit = new Octokit({
    auth: process.env.REPO_SECURE_PAT,
    previews: ['dorian-preview'],
  });
  const addAlertsResponse = await octokit.rest.repos.enableVulnerabilityAlerts({
    owner,
    repo,
  });
  console.log(`Add Alerts Response: ${addAlertsResponse}`);
};

// eslint-disable-next-line object-curly-newline
export { addSecurity, addVulnerabilityAlerts, getTemplate, addFile };
