//  create an issue and mention the security team when security event is detected
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

type NewIssue = {
  title: string;
  body: string;
  owner: string;
  /** the name of the repo */
  repo: string;
  label?: string;
};

const addIssue = async (issue: NewIssue) => {
  // eslint-disable-next-line no-undef
  await gh.issues.create({
    label: issue?.label || '',
    owner: issue.owner,
    repo: issue.repo,
    title: issue.title,
    body: issue.body,
  });
};

export default addIssue;
