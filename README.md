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
        <li><a href="#installation">Installation</a></li>
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

This project allows for some basic Security Best practices when a repository is created on Github. It uses a [GitHub App](https://docs.github.com/en/developers/apps) to emit events to a WebHook. Project is built using AWS CDK to automatically build the infrastructure (Azure and GCP coming soon).

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [node.js](https://nodejs.dev/)
* [AWS](https://aws.amazon.com/)
* [GitHub Apps](https://docs.github.com/en/developers/apps)
* [AWS CDK](https://aws.amazon.com/cdk/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template


### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Get a free API Key at [https://example.com](https://example.com)
2. Clone the repo
   ```sh
   git clone git@github.com:Avocado-Corporation/repo-secure.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `config.js`
   ```js
   const API_KEY = 'ENTER YOUR API';
   ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [ ] Azure Support
- [ ] GCP Support
- [ ] Add GitHub Events

See the [open issues](https://github.com/Avocado-Corporation/repo-secure/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>



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

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Your Name - [@rud750](https://twitter.com/rudy750) - sarmiento.rudy@gmail.com

Project Link: [https://github.com/Avocado-Corporation/repo-secure](https://github.com/Avocado-Corporation/repo-secure)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Thanks for the Template!](https://github.com/othneildrew/Best-README-Template)
* [Make Great Diagrams](https://excalidraw.com/)
* [Presentation made wit Reveal.js](https://revealjs.com/)
* [Cool Bouncing Octocat](https://codepen.io/deren2525/pen/jJmOQa)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links --> 
[contributors-url]: https://github.com/Avocado-Corporation/repo-secure/graphs/contributors
[product-screenshot]: https://avatars.githubusercontent.com/in/172364?s=30&u=e15980e821323699c95aeff7a3febdca154a8ba3&v=4
