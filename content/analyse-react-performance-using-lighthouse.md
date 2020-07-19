---
slug: analyse-react-performance-using-lighthouse
title: Automate website performance reports with Github Actions
caption: Never have a low SEO score again!
date: "July 19th, 2020"
tags: ["Github", "SEO", "CI/CD"]
image: "images/casey-horner-fUlDLRuXt9U-unsplash.jpg"
---

#### **Never have a low SEO score again!**

![Lighthouse image](images/dan-meyers-YTvAi5nRWdc-unsplash.jpg)

### **The importance of SEO**

Search Engine Optimization is important for anybody wishing to make their mark online. Google and other search engines tend to first show websites that have better performance and follow accessibility principles. A good way to know how your website is performing in those areas is to generate a [Lighthouse report](https://github.com/GoogleChrome/lighthouse). The report will analyse your website in 4 categories:

- Performance
- Accessibility
- Best Practices
- SEO

The easiest way to see how your website is currently doing is by [opening the Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/open). Inside the DevTools, navigating to the Lighthouse tab will give you access to generating a report. This is conveniant to get a good understanding of where you stand. However, keeping a high score can be demanding as websites and projects grow in scale. This is where an automated report everytime you open a pull request can help.

### **Lighthouse CI**

Luckily for us, we can use the a combination of [GitHub Actions](https://github.com/features/actions) and the [Lighthouse CI CLI](https://www.npmjs.com/package/@lhci/cli) to automate our reports. Let's try it on a svelte application:

```bash
npx degit sveltejs/template svelte-app
cd svelte-app
yarn add @lhci/cli@0.4.x --dev
yarn install
```

This will generate a minimalist project using the [Svelte Framework](https://svelte.dev/) and instal locally the Lighthouse CI CLI. Once done, navigate to the project and create the GitHub Action file:

```bash
git init
mkdir .github
mkdir .github/workflows
touch .github/workflows/ci.yml
touch lighthouserc.js
```

Add the following content to the `ci.yml` file

```yml
name: CI
on: [push]
jobs:
  lighthouseci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v1
      - run: yarn
      - run: yarn build
      - run: yarn lighthouse
```

Next, make sure you have the following content in `lighthouserc.js`:

```javascript
module.exports = {
  ci: {
    upload: {
      target: "temporary-public-storage",
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.9 }],
        "categories:accessibility": ["error", { minScore: 0.9 }],
        "categories:best-practices": ["error", { minScore: 0.9 }],
        "categories:seo": ["error", { minScore: 0.9 }],
      },
    },
  },
};
```

This file is where most of the action happens. Under the assert section of the configuration, you are able to set the behavior of the GitHub action. In this example we will set a minimum score of 90%, forcing anything under that to result in an error and failing our GitHub action. A value of 90% represents a good target since it means you achieved top performance in all categories. However it might be hard to reach these minimums in a production application.

Finally, modify the package json to have our new scripts:

```json
{
  "name": "svelte-app",
  "version": "1.0.0",
  "scripts": {
    "build": "rollup -c",
    "dev": "rollup -c -w",
    "start": "sirv public",
    "lighthouse": "yarn lhci autorun --upload.target=temporary-public-storage"
  },
  "devDependencies": {
    "@lhci/cli": "0.4.x",
    "@rollup/plugin-commonjs": "^12.0.0",
    "@rollup/plugin-node-resolve": "^8.0.0",
    "rollup": "^2.3.4",
    "rollup-plugin-livereload": "^1.0.0",
    "rollup-plugin-svelte": "^5.0.3",
    "rollup-plugin-terser": "^5.1.2",
    "svelte": "^3.0.0"
  },
  "dependencies": {
    "sirv-cli": "^0.4.4"
  }
}
```

Once you proceed and [upload this repo to GitHub](https://docs.github.com/en/github/getting-started-with-github/create-a-repo), the action will run on any Pull Request submitted on your repo!

### **Conclusion**

- Understanding performance in regards to SEO is crucial
- Having frequent checks and automated reports can help keeping a good score
- Automating small tasks around projects does not have to be complicated!
