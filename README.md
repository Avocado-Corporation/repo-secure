[![CodeQL](https://github.com/Avocado-Corporation/repo-secure/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/Avocado-Corporation/repo-secure/actions/workflows/codeql-analysis.yml) [![Main Deploy](https://github.com/Avocado-Corporation/repo-secure/actions/workflows/deploy-main.yml/badge.svg)](https://github.com/Avocado-Corporation/repo-secure/actions/workflows/deploy-main.yml) [![GitHub issues](https://img.shields.io/github/issues/Avocado-Corporation/repo-secure)](https://github.com/Avocado-Corporation/repo-secure/issues)

# Repo Secure

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#environment-variables">Environment Variables</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

This project allows for some basic security best practices when a repository is created on Github. It uses a [GitHub App](https://docs.github.com/en/developers/apps) to emit events to a WebHook. Project is built using AWS CDK to automatically build the infrastructure (Azure and GCP coming soon).

Repo Secure adds the automatically adds the following secure repository [best practices](https://docs.github.com/en/code-security/getting-started/securing-your-repository):

- README.md template
- .gitignore template
- [SECURITY.md (Security Policy) added](https://docs.github.com/en/code-security/getting-started/adding-a-security-policy-to-your-repository)
- [CODEOWNERS file](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)
- Dependabot alerts are enabled
- Dependabot security updates are enabled
- Default branch protections are enabled

### Built With

- [node.js](https://nodejs.dev/)
- [AWS](https://aws.amazon.com/)
- [AWS CDK](https://aws.amazon.com/cdk/)
- [GitHub Apps](https://docs.github.com/en/developers/apps)
- [Octokit](https://github.com/octokit)

<!-- GETTING STARTED -->

## Getting Started

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

- npm
  ```sh
  npm install typescript aws-cdk -g
  ```

* `npm run build` compile typescript to js
* `npm run watch` watch for changes and compile
* `npm run test` perform the jest unit tests
* `cdk deploy` deploy this stack to your default AWS account/region
* `cdk diff` compare deployed stack with current state
* `cdk synth` emits the synthesized CloudFormation template

## Prerequisites

### GitHub App

This project relies on a [GitHub App](https://docs.github.com/en/developers/apps). GitHub Apps are owned by an organization and allow for subscribing to events and taking actions using the [GitHub API](https://docs.github.com/en/rest) against your organization without the need for a specific user.

For more information on using GitHub Apps and how to set one up see the [Docs](https://docs.github.com/en/developers/apps/building-github-apps/creating-a-github-app).
Here are some basic steps to get you started:

1.  Go to the oranization settings and select the 'Developer Settings' tab.
2.  Choose GitHub Apps and click "New GitHub App".
3.  Type the app name, webhook url and webhook secret.
4.  The following permissions will be needed:
    - Repository Permissions:
      - Administration: read & write
      - Contents: read & write
      - Issues: read & write
      - Metadata: read only (required)
    - Organization Permissions:
      - Events: Read-only
5.  Subscribe to "Repository" events
6.  Keep the "Only on this account" setting.
7.  Click Create GitHub App
8.  Generate and save a private key
9.  Install the App in the Organization.

### Environment Variables

The application uses several environment variables:

```yaml
AWS_ACCESS_KEY_ID: ${{secrets.AWS_ACCESS_KEY_ID}} #For Deployment to AWS
AWS_SECRET_ACCESS_KEY: ${{secrets.AWS_SECRET_ACCESS_KEY}} #For Deployment to AWS
GH_APP_ID: ${{secrets.GH_APP_ID}} #To reference in the serverless funtion. Provided by GitHub as part of the App Installation
GH_REPOSECURE_PK: ${{secrets.GH_REPOSECURE_PK}} #To reference in the serverless funtion. Provided by GitHub as part of the App Installation.
GH_REPOSECURE_WEBHOOK: ${{secrets.GH_REPOSECURE_WEBHOOK}} #To reference in the serverless funtion. Provided by GitHub as part of the App Installation
CLIENT_ID: ${{secrets.CLIENT_ID}} #To reference in the serverless funtion. Provided by GitHub as part of the App Installation
CLIENT_SECRET: ${{secrets.CLIENT_SECRET}} #To reference in the serverless funtion. Provided by GitHub as part of the App Installation
INSTALLATION_ID: ${{secrets.INSTALLATION_ID}} #To reference in the serverless funtion. Provided by GitHub as part of the App Installation
REPO_SECURE_PAT: ${{secrets.REPO_SECURE_PAT}} #Developer PAT used to add security alerts and automate fixes. Use a generic user.
```

They should be added in the following areas of the code:

- [GitHub Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets) - safely store secrets in your repo for use by your Actions.

- [Deployment Pipeline](https://github.com/Avocado-Corporation/repo-secure/blob/main/.github/workflows/deploy-main.yml#L62) - Read from [GitHub Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)

- [Infrastructure as Code (CDK)](https://github.com/Avocado-Corporation/repo-secure/blob/main/cdk/lib/repo-secure-stack.ts#L15) - Set as environment variables for the Lambda function(s).

<!-- USAGE EXAMPLES -->

## Usage

Repo Secure is intended to automate GitHub Repository security best practices according to [here](https://docs.microsoft.com/en-us/learn/modules/maintain-secure-repository-github/2-how-to-maintain-secure-repository) and [here](https://docs.github.com/en/code-security/getting-started/securing-your-repository).

When a repository is created in the organization an event is sent via WebHook to the accompanying API. Using [OctoKit](https://github.com/octokit) and the [GitHub API](https://docs.github.com/en/rest).

_For more examples, please refer to the [Presentation](https://avocado-corporation.github.io/repo-secure) .pdf version available [here](https://github.com/Avocado-Corporation/repo-secure/tree/main/docs)_

<!-- ROADMAP -->

## Roadmap

This is intended to provide a baseline for building a full solution. Some suggested features:

- [Azure Support](https://github.com/Avocado-Corporation/repo-secure/issues/2)
- [GCP Support](https://github.com/Avocado-Corporation/repo-secure/issues/3)
- [Additional GitHub Events](https://github.com/Avocado-Corporation/repo-secure/issues/5)
- [Unit & End to End testing](https://github.com/Avocado-Corporation/repo-secure/issues/6)
- [WAF](https://github.com/Avocado-Corporation/repo-secure/issues/7)
- [Add Metrics using your preferred solution](https://github.com/Avocado-Corporation/repo-secure/issues/8)

See the [open issues](https://github.com/Avocado-Corporation/repo-secure/issues) for a full list of proposed features (and known issues).

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the innersource community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License.

<!-- CONTACT -->

## Contact

Rudy Sarmiento - [@rud750](https://twitter.com/rudy750) - sarmiento.rudy@gmail.com

Project Link: [https://github.com/Avocado-Corporation/repo-secure](https://github.com/Avocado-Corporation/repo-secure)

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [Thanks for the README Template!](https://github.com/othneildrew/Best-README-Template)
- [Great Diagram Tool](https://excalidraw.com/)
- [Presentation made wit Reveal.js](https://revealjs.com/)
- [Cool Bouncing Octocat](https://codepen.io/deren2525/pen/jJmOQa)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-url]: https://github.com/Avocado-Corporation/repo-secure/graphs/contributors
[product-screenshot]: https://avatars.githubusercontent.com/in/172364?s=30&u=e15980e821323699c95aeff7a3febdca154a8ba3&v=4
