/* eslint-disable quotes */
/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
import { Octokit } from '@octokit/rest';
import { createAppAuth } from '@octokit/auth-app';

exports.handler = async (event) => {
  const PK = Buffer.from(process.env.PK || '', 'base64').toString();
  console.log(PK);
  const appOctokit = new Octokit({
    authStrategy: createAppAuth,
    auth: {
      appId: 171967,
      privateKey: PK,
      installationId: 23218238,
    },
  });

  const response = await appOctokit.repos.updateBranchProtection({
    branch: 'main',
    owner: 'Avocado-Corporation',
    repo: 'test6',
    required_status_checks: null,
    enforce_admins: true,
    required_pull_request_reviews: {
      dismissal_restrictions: {},
      dismiss_stale_reviews: true,
      require_code_owner_reviews: true,
    },
    restrictions: null,
  });

  return response;
};
