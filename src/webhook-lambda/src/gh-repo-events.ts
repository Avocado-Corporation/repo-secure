//  set protections on main branch for new repo
import {
  RepositoryCreatedEvent,
  RepositoryEvent
} from '@octokit/webhooks-types';
import { Octokit } from '@octokit/rest';
import { createAppAuth } from '@octokit/auth-app';
import addIssue from './gh-issue';
import {
  addCodeOwners,
  addSecurity,
  addSecurityPolicy,
  addVulnerabilityAlerts
} from './gh-security-policy';
import initializeRepo from './gh-initialize-repo';

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

const setDefaultBranchProtections = async (body: RepositoryCreatedEvent) => {
  try {
    console.log(
      `Setting  Branch Protections on : \n
        ${body.repository.name} \n
        on branch: ${body.repository.default_branch}\n
        for organization: ${body.repository.owner.login}`
    );
    const response = await gh.repos.updateBranchProtection({
      branch: body.repository?.default_branch,
      owner: body.repository.owner.login,
      repo: body.repository.name,
      required_status_checks: null,
      enforce_admins: true,
      required_pull_request_reviews: {
        dismissal_restrictions: {},
        dismiss_stale_reviews: true,
        require_code_owner_reviews: true
      },
      restrictions: null
    });
    console.log(
      `Octokit Response on branch protection:\n ${JSON.stringify(response)}`
    );
    await addIssue({
      title: `Branch protections have been added to '${body.repository.default_branch}' branch`,
      body: `@${body.sender.login}\n
        Contributors can issue a pull request to add to the ${body.repository.default_branch} branch.\n
        At least 1 reviewer will be required to merge contributions to the ${body.repository.default_branch} branch\n
        Administrators are asked to do the same but can override when necessary.\n `,
      owner: body.repository.owner.login,
      repo: body.repository.name
    });
  } catch (error: any) {
    console.log(
      `something went wrong setting branch protection on ${body.repository.name}\n Message:\n ${error}`
    );
    await addIssue({
      title: `Failed to add branch protections to '${body.repository.default_branch}' branch`,
      body: `@${body.sender.login} @Avocado-Corporation/avocado-security \n 
                New repo was created but failed to add branch protections. Please add. `,
      owner: body.organization?.login || '',
      repo: body.repository.name
    });
  }
};

const RepoEvents = async (body: RepositoryEvent) => {
  console.log(`in repository events working with: ${JSON.stringify(body)}`);
  try {
    switch (body.action) {
      case 'created':
        console.log(`new repo created: ${body.repository.name}`);
        await initializeRepo(body);
        console.log('Initialized Repo');

        await addSecurityPolicy(body);
        console.log('Added a security policy');

        await addCodeOwners(body);
        console.log('Added codeowners file.');
        /* this one must go first!
          You can also enable on the Organization settings for all repo's
          kept here as an optional implementation if for any reason you do not want it enabled on all repos.

          If you prefer to enable it as a organization setting comment/delete:
          await addVulnerabilityAlerts
          await addSecurity
        */
        await addVulnerabilityAlerts(
          body.organization?.login || '',
          body.repository.name
        );
        console.log('Added vulnerability alerts');

        await addSecurity(body.organization?.login || '', body.repository.name);
        console.log('Added automated security');

        await setDefaultBranchProtections(body);
        console.log('Set branch protections');

        break;
      default:
        console.log('not handled');
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export default RepoEvents;
