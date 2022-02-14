//  set protections on main branch for new repo
import { RepositoryCreatedEvent, RepositoryEvent } from '@octokit/webhooks-types';
// import octokit from './gh-octokit';
import { Octokit } from '@octokit/rest';
import { createAppAuth, StrategyOptions } from '@octokit/auth-app';

const setDefaultBranchProtections = async (body: RepositoryCreatedEvent) => {
  try {
    // return await octokit(body.installation?.id).then(async (OctoKit) => {
    console.log(`Setting Branch Protections on : ${body.repository.name} \n
                    on branch: ${body.repository.default_branch}\n
                    for organization: ${body.repository.owner.login}`);
    const ghRepoSecurePK = Buffer.from(process.env?.GH_REPOSECURE_PK || '', 'base64').toString();
    console.log(`created a new OctoKit form installion id: ${body.installation?.id}`);
    // const authOptions: StrategyOptions = {
    //   appId: process.env.GH_APP_ID || '',
    //   privateKey: ghRepoSecurePK,
    //   installationId: body.installation?.id,
    //   clientId: process.env.CLIENT_ID,
    //   clientSecret: process.env.CLIENT_SECRET,
    //   type: 'installation',
    // };
    // const auth = await createAppAuth(authOptions)({ type: 'installation' });
    const gh = new Octokit({
      authStrategy: createAppAuth,
      auth: {
        appId: process.env.GH_APP_ID || '',
        privateKey: ghRepoSecurePK,
        installationId: body.installation?.id,
      },
    });
    const testResp = await gh.request('POST /repos/{owner}/{repo}/issues', {
      owner: body.repository.owner.login,
      repo: body.repository.name,
      title: 'title',
    });
    console.log('TEST', JSON.stringify(testResp));

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
          `Users will not be able to push directly to the ${body.repository.default_branch} branch.\n`
          + `At least 1 review will be required to merge to ${body.repository.default_branch}\n`
          + 'Administrators are asked to do the same but can override in necessary circumstances.\n ',
    });
    console.log(`Octokit Response on branch protection:\n ${JSON.stringify(response)}`);
    return response;
  } catch (error: any) {
    console.log(`something went wrong setting branch protection on ${body.repository.name}\n Message:\n ${error}`);
    throw new Error(error);
  }
};

const repository = async (body:RepositoryEvent) => {
  console.log(`in repository events working with: ${JSON.stringify(body)}`);
  try {
    switch (body.action) {
      case 'created':
        console.log(`new repo created: ${body.repository.name}`);
        await setDefaultBranchProtections(body);
        break;
      default: console.log('not handled');
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export default repository;
