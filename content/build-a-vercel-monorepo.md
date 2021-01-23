---
slug: build-a-vercel-monorepo
category: next-vercel
title: How to Use Yarn Workspaces to Build a Vercel Monorepo
caption: Simplifie how you manage your repos!
date: "January 22nd, 2021"
tags: ["Vercel", "Typescript", "Node", "Python"]
image: "images/build-a-vercel-monorepo/lucas-benjamin-wQLAGv4_OYs-unsplash.jpg"
---

#### **Simplifie how you manage your repos!**

![Abstract image](images/build-a-vercel-monorepo/lucas-benjamin-wQLAGv4_OYs-unsplash.jpg)

### **What is a monorepo**

When I first joined Shutterstock around 2 and a half years ago, I was unaware of the challenges of managing a repository where tens or even haundreds of developers work and contribute. This was my first contact with the concept of a monorepo: A singular repository containing a multitude of different projects. Watercooler talk with my collegues centered around how Google managed billions of lines of code into a single repo. The idea being that centralizing code can lead to more granular deployments and sharing of tools.

The reality however was that managing a monorepo is in itself a rare expertise that is difficult to find outside of tech giants. The tooling was hard to get right and a lot of time was spent managing complexity. Since then however [yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) have become really good and developer centric clouds like vercel have made deployments much easier. This is why this week we will create our own Vercel monorepo!

<hr />
<br />

### **Setting up 🏗️**

The first thing we need is a new folder where we can create a repository. Let's run the following commands to generate the files we need.

```bash
mkdir vercel-monorepo
cd vercel-monorepo
mkdir packages
yarn init -y
```

This will initialize an empty yarn project inside the folder. However a monorepo is structured a little bit differently than a typical project. Each "package" or "project" functions as it's own independant project and has the ability to share node modules with other projects! To make this happen we need to specify where our workspaces will be. This is done by using the workspaces section of our package.json. Let's replace the content of the one we generated with this code.

```json
{
  "name": "vercel-monorepo",
  "version": "1.0.0",
  "private": "true",
  "workspaces": ["packages/*"],
  "license": "MIT"
}
```

<hr />
<br />

### **Adding a React Application**

We now have a basic setup but we have no application yet! Let's create a really simple React application running typescript with `create-react-app`. We will generate the react application and put it inside the packages folder since this is where all our applications will go:

```bash
cd packages
npx create-react-app ui --template typescript
```

After this command runs we will now have a react application however this will also create node_modules at the root of our folder since yarn workspaces have the ability to share node_modules between the different workspaces. For this reason we will have to add a `.gitignore` file at the root of the repo. You should also run `git init` at the root of the repo if you have not yet one so. Once you ahve create the root `.gitignore` add the following content to it to ignore node_modules.

```txt
node_modules
```

This will tell git to ignore your node_modules folder. The last part we need to do is to link this application to vercel. Ensure you have downloaded the vercel CLI and logged in to it. Follow [these instructions](https://vercel.com/docs/cli#commands/login) if you need assistance doing this. Once this is done we will connect the application by running vercel from the application repo.

```bash
cd packages/ui
vercel
```

Follow and answer the questions and then we are almost done! We will just need to add one script to our `package.json` script section in the ui section.

```json
{
  "name": "@vercel-monorepo/ui",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.11.4",
    "@testing-library/react": "^11.1.0",
    "@testing-library/user-event": "^12.1.10",
    "@types/jest": "^26.0.15",
    "@types/node": "^12.0.0",
    "@types/react": "^16.9.53",
    "@types/react-dom": "^16.9.8",
    "react": "^17.0.1",
    "react-dom": "^17.0.1",
    "react-scripts": "4.0.1",
    "typescript": "^4.0.3",
    "web-vitals": "^0.2.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "deploy": "vercel deploy --prod"
  },
  "eslintConfig": {
    "extends": ["react-app", "react-app/jest"]
  },
  "browserslist": {
    "production": [">0.2%", "not dead", "not op_mini all"],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

<hr />
<br />

### **Adding a Vercel Node API**

For the next example app we will add we will create a really simple Vercel APi that will serve some data to our react application. Let's run the following commands from the root of the repo.

```bash
mkdir packages/functions
mkdir packages/functions/api
touch packages/functions/api/index.ts packages/functions/package.json
```

Add the following content to the `packages/functions/package.json` file.

```json
{
  "name": "@vercel-monorepo/functions",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "dev": "vercel dev --listen 4000",
    "deploy": "vercel deploy --prod"
  },
  "devDependencies": {
    "vercel": "^19.1.1"
  }
}
```

Also add the following content to the `packages/functions/api/index.ts` file.

```ts
import { NowRequest, NowResponse } from "@vercel/node";

export default (req: NowRequest, res: NowResponse) => {
  return res.json({ message: "Hello World" });
};
```

Once this is done, connect the functions app to vercel in a similar way that we did with the react application.

```bash
cd packages/functions
vercel
```

Congratulations! You have just created a serverless function application and a react ui under the same repo! Obviously this is a similar setup to next.js but the best part about our current setup is that you could also add completly different types of applications like a python api or a Gastby application. Before we call it a day however, let's work a bit on our script section to make this monorepo more useful.

<hr />
<br />

### **Adding helper scripts**

The one thing we are missing for this monorepo is some dev scripts and deploy scripts. Let's modify our root `package.json`.

```json
{
  "name": "vercel-monorepo",
  "version": "1.0.0",
  "private": "true",
  "workspaces": ["packages/*"],
  "license": "MIT",
  "scripts": {
    "start:ui": "yarn --cwd packages/ui start",
    "start:functions": "yarn --cwd packages/functions start",
    "deploy:ui": "yarn --cwd packages/ui deploy",
    "deploy:functions": "yarn --cwd packages/functions deploy"
  }
}
```

We now have a selection of passtrough scripts that can help us manage our repo directly from the root!

### **Conclusions**

You can find the finalized code on this [repo](https://github.com/gbibeaul/vercel-monorepo). The initial setup is quite an involved process but it is a much simpler alternative than using monorepo management systems like Bazel or Lerna. Here are a few takeaways:

- Vercel treats each project seperatly even they are sharing ressources in a monorepo
- This is a great setup if you wish to depoy different project under a single domain you own on Vercel
- Yarn workspaces allow you to share modules accross different applications that you are hosting under a single repo.

[@BibeauGuillaume](https://twitter.com/BibeauGuillaume) on Twitter for any questions!
