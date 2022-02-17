//  set protections on main branch for new repo
import {
  RepositoryCreatedEvent,
  RepositoryEvent,
} from '@octokit/webhooks-types';
import { Octokit } from '@octokit/rest';
import { createAppAuth } from '@octokit/auth-app';
import addIssue from './gh-issue';
import {
  addFile,
  addSecurity,
  addVulnerabilityAlerts,
  getTemplate,
} from './gh-security-policy';

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

const initializeRepo = async (body: RepositoryCreatedEvent) => {
  const content = await getTemplate(
    body.organization?.login || '',
    'repo-secure',
    'README.md',
  );
  await addFile({
    content: Buffer.from(content).toString('base64'),
    message: 'Repo Secure initial commit',
    owner: body.organization?.login || '',
    path: 'README.md',
    repo: body.repository.name,
  });
};

const setDefaultBranchProtections = async (body: RepositoryCreatedEvent) => {
  try {
    console.log(
      `creating a new OctoKit form installion id: ${body.installation?.id}`,
    );

    console.log(`Setting  Branch Protections on : \n
        ${body.repository.name} \n
        on branch: ${body.repository.default_branch}\n
        for organization: ${body.repository.owner.login}`);

    // eslint-disable-next-line no-undef
    const response = await gh.repos.updateBranchProtection({
      branch: body.repository?.default_branch,
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
    console.log(
      `Octokit Response on branch protection:\n ${JSON.stringify(response)}`,
    );
    await addIssue({
      title: `Branch protections have been added to '${body.repository.default_branch}' branch`,
      body: `@${body.sender.login}\n
        Contributors can issue a pull request to add to the ${body.repository.default_branch} branch.\n
        At least 1 reviewer will be required to merge contributions to the ${body.repository.default_branch} branch\n
        Administrators are asked to do the same but can override when necessary.\n `,
      owner: body.repository.owner.login,
      repo: body.repository.name,
    });
    return response;
  } catch (error: any) {
    console.log(
      `something went wrong setting branch protection on ${body.repository.name}\n Message:\n ${error}`,
    );
    throw new Error(error);
  }
};

const RepoEvents = async (body: RepositoryEvent) => {
  console.log(`in repository events working with: ${JSON.stringify(body)}`);
  try {
    switch (body.action) {
      case 'created':
        console.log(`new repo created: ${body.repository.name}`);
        await initializeRepo(body);
        await setDefaultBranchProtections(body);
        //this one must go first
        await addVulnerabilityAlerts(
          body.organization?.login || '',
          body.repository.name,
        );
        await addSecurity(body.organization?.login || '', body.repository.name);

        break;
      default:
        console.log('not handled');
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export default RepoEvents;
