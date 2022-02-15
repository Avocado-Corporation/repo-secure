//  set protections on main branch for new repo
import {
  RepositoryCreatedEvent,
  RepositoryEvent,
} from '@octokit/webhooks-types';
import octokit from './gh-octokit';

const setDefaultBranchProtections = async (body: RepositoryCreatedEvent) => {
  try {
    const gh = await octokit(body.installation?.id);
    console.log(`Setting Branch Protections on : ${body.repository.name} \n
        on branch: ${body.repository.default_branch}\n
        for organization: ${body.repository.owner.login}`);

    const response = await gh.repos.updateBranchProtection({
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
    await gh.issues.create({
      owner: body.repository.owner.login,
      repo: body.repository.full_name,
      title: `Branch protections have been updated for '${body.repository.default_branch}' branch`,
      body:
        `Users will not be able to push directly to the ${body.repository.default_branch} branch.\n` +
        `At least 1 review will be required to merge to ${body.repository.default_branch}\n` +
        'Administrators are asked to do the same but can override in necessary circumstances.\n ',
    });
    console.log(
      `Octokit Response on branch protection:\n ${JSON.stringify(response)}`,
    );
    return response;
  } catch (error: any) {
    console.log(
      `something went wrong setting branch protection on ${body.repository.name}\n Message:\n ${error}`,
    );
    throw new Error(error);
  }
};

const repository = async (body: RepositoryEvent) => {
  console.log(`in repository events working with: ${JSON.stringify(body)}`);
  try {
    switch (body.action) {
      case 'created':
        console.log(`new repo created: ${body.repository.name}`);
        await setDefaultBranchProtections(body);
        break;
      default:
        console.log('not handled');
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export default repository;
