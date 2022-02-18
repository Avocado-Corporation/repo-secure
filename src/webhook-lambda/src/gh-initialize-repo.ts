import { RepositoryCreatedEvent } from '@octokit/webhooks-types';
import addIssue from './gh-issue';
import { getTemplate, addFile } from './gh-repo-content';

const initializeRepo = async (body: RepositoryCreatedEvent) => {
  // add a Template README file
  try {
    console.log('Initializing repo');
    const content = await getTemplate(
      body.organization?.login || '',
      'repo-secure',
      'README.md'
    );
    console.log('call to add README');

    await addFile({
      content: content,
      message: 'Repo Secure initial commit',
      owner: body.organization?.login || '',
      path: 'README.md',
      repo: body.repository.name
    });
    console.log('added a README');
  } catch (error) {
    console.log('unable to add README file: ', error);
    await addIssue({
      title: `Missing README`,
      body: `@${body.sender.login} @Avocado-Corporation/avocado-security \n 
                New repo was created but failed to add README `,
      owner: body.organization?.login || '',
      repo: body.repository.name
    });
  }
  // add a basic .gitignore
  try {
    const content = await getTemplate(
      body.organization?.login || '',
      'repo-secure',
      '.gitIgnore' //purposely spelled wrong  to show the issue created if it fails
    );

    await addFile({
      content: content,
      message: 'Repo Secure initial commit',
      owner: body.organization?.login || '',
      path: '.gitIgnore',
      repo: body.repository.name
    });
  } catch (error) {
    console.log('unable to add .gitignore file: ', error);
    await addIssue({
      title: `Missing .gitignore`,
      body: `@${body.sender.login}\n @Avocado-Corporation/avocado-security \n 
                New repo was created but failed to add .gitignore `,
      owner: body.organization?.login || '',
      repo: body.repository.name
    });
  }
};

export default initializeRepo;
