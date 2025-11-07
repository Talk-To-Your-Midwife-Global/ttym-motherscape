<a id="readme-top"></a>
<div> 

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![GNU General Public License v3.0 ][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

</div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="https://images.ctfassets.net/9tqg16rqsgmt/qFlKvXLX3J5ilptZp0TYG/05eed8c2ad55eadd33add19dac66cab3/banner.png" alt="Logo" width="100%">
  </a>

  <h3 align="center">Obaa+ App (TTYM-GLOBAL)</h3>

  <p align="center">
   A mobile web application that provides a wholistic view into a user's reproductive health from the menstrual cycle all the way to pregnancy, helping keep track through developed reproductive cycle tracking tools and educational resources.
    <br />
    <a href="https://github.com/Talk-To-Your-Midwife-Global/ttym-motherscape/"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://www.loom.com/share/9038ec7c40654d81bacda771ecd5b824">View Demo</a>
    &middot;
    <a href="https://github.com/Talk-To-Your-Midwife-Global/ttym-motherscape/issues/new?labels=bug&template=bug_report.md">Report Bug</a>
    &middot;
    <a href="https://github.com/Talk-To-Your-Midwife-Global/ttym-motherscape/issues/new?labels=enhancement&template=feature_request.md">Request Feature</a>
  </p>
</div>



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

[![Product Name Screen Shot][product-screenshot]](https://github.com/Talk-To-Your-Midwife-Global/ttym-motherscape)

There are other sexual reproductive health trackers available in the world and they are great, some even more mobile
than this mobile web application. But none seem to be more than just tracking tools. That's where **Obaa** comes in. A
wholistic approach to sexual reproductive health. One that encapsulates everything relating SRH in an intuitive,
expressive way. It is a hard task but necessary. A system that knows, takes initiative and informs in helpful way for
girls and women all around the world. A system so amazing that it'll be the last one you ever need -- I think this is
it.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

The technologies that make this application possible currently are :

* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

* pnpm
  ```sh
  npm install -g pnpm@latest-10
  ```
* Posthog Account [Create PostHog Account](https://us.posthog.com/signup)
* Contentful Account [Create Contentful Account](https://be.contentful.com/login/)

Visit [PNPM installation guide](https://pnpm.io/installation)

### Installation Process

1. Clone the repo
   ```sh
   git clone https://github.com/Talk-To-Your-Midwife-Global/ttym-motherscape.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your ENV variables in `.env.local`
   ```js
   HOSTNAME_URI='127.0.0.1:8000/api/v1';
   NEXT_PUBLIC_HOSTNAME='127.0.0.1:8000/api/v1'
   NEXT_PUBLIC_WS_URL=127.0.0.1:8000
   NEXT_PUBLIC_CLIENT_ROUTE="http://localhost:{port}"
   CONTENTFUL_SPACE_ID={SPACE_ID_GOES_HERE}
   CONTENTFUL_TOKEN={CONTENTFUL_API_TOKEN}
   environment="development"
   NEXT_PUBLIC_ENVIRONMENT="development"
   NEXT_PUBLIC_POSTHOG_KEY={POSTHOG_KEY}
   NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
   ```
5. Change git remote url to avoid accidental pushes to base project
   ```sh
   git remote set-url origin github_username/repo_name
   git remote -v # confirm the changes
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
<!-- ## Usage -->
<!--
Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p> 
-->


<!-- ROADMAP -->

## Roadmap

- [ ] Add Changelog
- [ ] Add Additional Templates w/ Examples
- [ ] Add "components" document to easily copy & paste sections of the readme
- [ ] Multi-language Support
    - [ ] Twi
    - [ ] Ga
- [ ] Gamifying the education experience on the app with streaks and video content

See the [open issues](https://github.com/othneildrew/Best-README-Template/issues) for a full list of proposed features (
and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any
contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also
simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request.

**NB: [Git Branching Strategy](https://nvie.com/posts/a-successful-git-branching-model/)**:

### Top contributors:

<a href="https://github.com/Talk-To-Your-Midwife-Global/ttym-motherscape/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Talk-To-Your-Midwife-Global/ttym-motherscape" alt="contrib.rocks image" />
</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->

## License

Distributed under the **GNU General Public License v3.0** License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->

## Contact

Your Name - [@Prince_KAsiedu](https://x.com/Prince_KAsiedu) - prince@talktoyourmidwife.com

Project
Link: [https://github.com/Talk-To-Your-Midwife-Global/ttym-motherscape](https://github.com/Talk-To-Your-Midwife-Global/ttym-motherscape)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

A special thank you to the creators of these tools and resources. These have helped made this project what it is today.

* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [TailwindCSS](https://tailwindcss.com/)
* [Sonner](https://sonner.emilkowal.ski/)
* [Img Shields](https://shields.io)
* [Iconify Design](https://iconify.design/)
* [Vaul](https://vaul.emilkowal.ski/)
* [A successful git branching model](https://nvie.com/posts/a-successful-git-branching-model/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/Talk-To-Your-Midwife-Global/ttym-motherscape.svg?style=for-the-badge

[contributors-url]: https://github.com/Talk-To-Your-Midwife-Global/ttym-motherscape/graphs/contributors

[forks-shield]: https://img.shields.io/github/forks/Talk-To-Your-Midwife-Global/ttym-motherscape.svg?style=for-the-badge

[forks-url]: https://github.com/Talk-To-Your-Midwife-Global/ttym-motherscape/network/members

[stars-shield]: https://img.shields.io/github/stars/Talk-To-Your-Midwife-Global/ttym-motherscape.svg?style=for-the-badge

[stars-url]: https://github.com/Talk-To-Your-Midwife-Global/ttym-motherscape/stargazers

[issues-shield]: https://img.shields.io/github/issues/Talk-To-Your-Midwife-Global/ttym-motherscape.svg?style=for-the-badge

[issues-url]: https://github.com/Talk-To-Your-Midwife-Global/ttym-motherscape/issues

[license-shield]: https://img.shields.io/github/license/Talk-To-Your-Midwife-Global/ttym-motherscape

[license-url]: https://github.com/Talk-To-Your-Midwife-Global/ttym-motherscape/blob/main/LICENSE

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555

[linkedin-url]: https://www.linkedin.com/company/ttym-global/posts/?feedView=all

[product-screenshot]: https://images.ctfassets.net/9tqg16rqsgmt/79WbYrbKKF2Ai17DJBWaVs/00b8372e326931ae4182cf718b3fa57a/iPhone_15_Pro.webp

[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white

[Next-url]: https://nextjs.org/

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB

[React-url]: https://reactjs.org/

[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D

[Vue-url]: https://vuejs.org/

[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white

[Angular-url]: https://angular.io/

[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00

[Svelte-url]: https://svelte.dev/

[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white

[Laravel-url]: https://laravel.com

[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white

[Bootstrap-url]: https://getbootstrap.com

[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white

[JQuery-url]: https://jquery.com