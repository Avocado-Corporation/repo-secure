//  add a security policy to a new repo and best practices to repo
import { Octokit } from '@octokit/rest';
import { RepositoryCreatedEvent } from '@octokit/webhooks-types';
import addIssue from './gh-issue';
import { getTemplate, addFile } from './gh-repo-content';

const addSecurity = async (owner: string, repo: string) => {
  const octokit = new Octokit({
    auth: process.env.REPO_SECURE_PAT,
    previews: ['london-preview']
  });

  try {
    const addSecurityResponse =
      await octokit.rest.repos.enableAutomatedSecurityFixes({
        owner,
        repo
      });
    console.log(`Add Security Response: ${addSecurityResponse}`);
  } catch (error) {
    console.log(error);
    await addIssue({
      title: `Automated Security`,
      body: `@Avocado-Corporation/avocado-security \n 
              New repo was created but failed to add automated security fixes `,
      owner,
      repo
    });
  }
};

const addVulnerabilityAlerts = async (owner: string, repo: string) => {
  const octokit = new Octokit({
    auth: process.env.REPO_SECURE_PAT,
    previews: ['dorian-preview']
  });
  try {
    const addAlertsResponse =
      await octokit.rest.repos.enableVulnerabilityAlerts({
        owner,
        repo
      });

    console.log(`Add Alerts Response: ${addAlertsResponse}`);
  } catch (error) {
    console.log(error);
    await addIssue({
      title: `Vulnerability Alerts`,
      body: `@Avocado-Corporation/avocado-security \n 
            New repo was created but failed to add vulnerability alrets `,
      owner,
      repo
    });
  }
};
const addSecurityPolicy = async (body: RepositoryCreatedEvent) => {
  const content = await getTemplate(
    body.organization?.login || '',
    'repo-secure',
    'security.md'
  );

  try {
    await addFile({
      content: content,
      message: 'Repo Secure initial commit',
      owner: body.organization?.login || '',
      path: 'security.md',
      repo: body.repository.name
    });
  } catch (error) {
    await addIssue({
      title: `Failed to add security polify`,
      body: `@${body.sender.login}\n @Avocado-Corporation/avocado-security \n 
          New repo was created without a security policy `,
      owner: body.repository.owner.login,
      repo: body.repository.name
    });
    console.log('unable to add file: ', error);
  }
};

const addCodeOwners = async (body: RepositoryCreatedEvent) => {
  const content = await getTemplate(
    body.organization?.login || '',
    'repo-secure',
    'CODEOWNERS'
  );

  try {
    const codeowners = await addFile({
      content: content,
      message: 'Repo Secure added CODEOWNERS',
      owner: body.organization?.login || '',
      path: 'CODEOWNERS',
      repo: body.repository.name
    });
    console.log('added codeowners', codeowners);
  } catch (error) {
    await addIssue({
      title: `Failed to add CODEOWNERS`,
      body: `@${body.sender.login}\n @Avocado-Corporation/avocado-security \n 
            New repo was created without a CODEOWNERS file `,
      owner: body.repository.owner.login,
      repo: body.repository.name
    });
    console.log('unable to add file: ', error);
  }
};

export {
  addSecurity,
  addVulnerabilityAlerts,
  addCodeOwners,
  addSecurityPolicy
};
