//  set protections on main branch for new repo
import { RepositoryCreatedEvent, RepositoryEvent } from '@octokit/webhooks-types';
import octokit from './gh-octokit';

const setDefaultBranchProtections = async (body: RepositoryCreatedEvent) => {
  try {
    return await octokit(body.installation?.id).then((OctoKit) => {
      OctoKit.repos.updateBranchProtection({
        branch: body.repository.default_branch,
        owner: body.repository.owner.login,
        repo: body.repository.name,
        required_status_checks: null,
        enforce_admins: true,
        required_pull_request_reviews: {
          dismissal_restrictions: {},
          dismiss_stale_reviews: true,
          require_code_owner_reviews: true,
        },
        restrictions: null,
      });
    });
  } catch (error: any) {
    throw new Error(error);
  }
};

const repository = async (body:RepositoryEvent) => {
  console.log(body);
  switch (body.action) {
    case 'created':
      console.log(`new repo created: ${body.repository.name}`);
      await setDefaultBranchProtections(body);
      break;
    default: console.log('not handled');
  }
};

export default repository;
