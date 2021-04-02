---
slug: build-a-vercel-monorepo
category: next-vercel
title: How to Use Yarn Workspaces to Build a Vercel Monorepo
caption: Simplify how you manage your repos!
date: "January 22, 2021"
tags: ["Vercel", "Typescript", "Node", "Python"]
image: "images/build-a-vercel-monorepo/lucas-benjamin-wQLAGv4_OYs-unsplash.jpg"
---

#### **Simplify how you manage your repos!**

![Abstract image](images/build-a-vercel-monorepo/lucas-benjamin-wQLAGv4_OYs-unsplash.jpg)

### **What is a monorepo?**

When I first joined Shutterstock around two and a half years ago, I was unaware of the challenges of managing a repository that has over 100 collaborators. This was my first contact with the concept of a monorepo: a singular repository containing a multitude of different projects. Water cooler talk with my collegues centered around how Google managed billions of lines of code into a single repo. The idea being that centralizing code can lead to more granular deployments and sharing code with ease.

The reality however was that managing a monorepo is in itself a rare expertise that is difficult to find outside of tech giants. The tooling was hard to get right and a lot of time was spent managing complexity. Since then however, [yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) have become really good and developer centric clouds like Vercel have made deployments much easier. This is why this week, we will create our own Vercel monorepo!



<hr />
<br />

### **Prerequisites and planning**



Since a monorepo contains a multitude of application, we will be starting from a prebuilt base that I pushed to [this repo](https://github.com/gbibeaul/vercel-monorepo). We will need the following tools in order to connect our monorepo to Vercel:

- **Authenticated Vercel CLI:** You can download it [here](https://vercel.com/download) and login like shown [here](https://vercel.com/docs/cli#commands/login).
- **Yarn to use workspaces:** You can download it like shown [here](https://yarnpkg.com/getting-started/install).

Once this is done, you can go ahead and clone the repo on your computer or you can fork it. After this is done, we will do the following steps which will be explained in more details down below:

1. Connect each application to Vercel
1. Share code between packages
1. Scripting our monorepo

Let's get started!  


<hr />
<br />


### **Connecting to Vercel**

Vercel treats each workspace as a different project. This is useful, because each part of the application is deployed on its own. This makes for faster deployments as they all run in parallel. To configure this, we will have to connect Vercel to each package. Let's start with the functions package:

```bash
cd packages/functions/
vercel
```
This will trigger a couple of questions accepting the default will mostly work here. Once this is done, we can head over to the Vercel dashboard and see our newly deployed project.

![Vercel dashboard image](images/build-a-vercel-monorepo/Screenshot_2021-01-23.png)

Let's proceed and do the same for the React application. Run these commands from the root of the repo:

```bash
cd packages/ui/
vercel
```

This will be a really similar process. Vercel is good at identifying each framework it finds, so this will be mostly just following the questions asked by the CLI if you are using one of the major frameworks or even a smaller one like Svelte.

<hr />
<br />

### **Sharing code between packages**

Once we have connected all our applications to Vercel, we will have a look at the different scripts and how to manage each app with Yarn workspaces. The first thing to note is that a workspace does not have to be a full app! It can be easily a small Javascript module that you want to share between applications! In our monorepo example, we are making a Theme package available to other workspaces under `packages/theme`. You can use this package by installing it to another workspace like this:

```bash
yarn workspace ui add -D @vercel-monorepo/theme
```

Yarn will then recognize this as an internal package and it will be added as a dependency of the UI app. Let's now move to making some scripts for our monorepo.

<hr />
<br />

### **Scripting our monorepos**

Some of our apps already have some scripts. For example, the UI app was built with `create-react-app` so it does not need a Vercel specific dev script. We still need to add a deployment script to that application to its `package.json` script section:

```json
  "deploy": "vercel deploy --prod"
```

We also need Vercel specific scripts in the functions `package.json` since this will use Vercel serverless functions:

```json
  "start": "vercel dev",
  "deploy": "vercel deploy --prod"
```

Since there are potentially many applications inside a monorepo, it can be useful to add to the root `package.json` some scripts that call package specific scripts. We can accomplish this easily by using `yarn --cwd`. This will tell yarn to execute a script directly from a specific folder. Here is an example:

```json
  "start:ui": "yarn --cwd packages/ui start",
  "start:functions": "yarn --cwd packages/functions start",
  "deploy:ui": "yarn --cwd packages/ui deploy",
  "deploy:functions": "yarn --cwd packages/functions deploy"
```


<hr />
<br />

### **Conclusion**

As this example here shows, a monorepo does not have to be complicated. By treating each application as its own Vercel project, we are able to get fast build times and share code between each application easily! Here are a few takeaways:

- Yarn workspaces makes it easy to share code between packages.
- Adding scripts will make your life easier and will save you time.
- Feel free to make a package even for a single file like a theme! It takes no effort and makes code more reusable.
- This monorepo structure makes it easy to add Vercel functions to a project.



Interested in learning more? I am currently working on a course that teaches all about deploying and building web applications. This course is aimed at web developers and makes the whole process so easy that you won't ever need to hire a DevOps team! Connect with me on Twitter [@gbibeaul](https://twitter.com/BibeauGuillaume) if you have any questions.
