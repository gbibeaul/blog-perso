---
slug: hosting-react-vite
category: next-vercel
title: Instant React Dev Server
caption: Speed up development with the fastest tooling around!
date: "April 15, 2021"
tags: ["Next.js", "Typescript", "React"]
image: "images/hosting-react-vite/parastoo-maleki-nr3pa6Vx-fs-unsplash.jpg"
---

#### **Boost your developer experience up a knotch!**

![snowy image](images/hosting-react-vite/lukas-zischke-9UiLvaIbG3g-unsplash.jpg)


## **What is Vite?**

Vite is an interesting project! It is a set of tools that come together to give you a blazing fast developer environment. When using Vite in a React project, you can start a development server within half a second. Vite achieves this speed by using ES Modules to serve Javascript assets in development mode. 

It also offers a build command that will bundle your code in a more traditional way for production. This gives you the best of both worlds! You can have a super-fast dev server while keeping the traditional benefits of tree-shaking, lazy-loading and chunk splitting in production. Let's learn how to set up all of this!

## Setting up

The first thing that we need to do is set up a basic folder structure. Vite comes with some handy templates that allow us to create a project fast! Let's create a Typescript React app:

``` sh
yarn create @vitejs/app react-vite --template react-ts
```

This command will create a Vite app using the React Typescript template. It will populate your project with all the relevant dependencies and `package.json` scripts needed to run both your dev server and build your app. Let's explore a little bit our `package.json` file:

``` json
{
  "name": "react-vite",
  "version": "0.0.0",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "serve": "vite preview"
  },
  "dependencies": {
    "react": "^17.0.0",
    "react-dom": "^17.0.0"
  },
  "devDependencies": {
    "@types/react": "^17.0.0",
    "@types/react-dom": "^17.0.0",
    "@vitejs/plugin-react-refresh": "^1.3.1",
    "typescript": "^4.1.2",
    "vite": "^2.1.5"
  }
}
```
Vite does a pretty good job of keeping things light! The dependencies are kept to the strict minimum for running a react application. 

Another interesting thing to note is that all of the tools are included directly in the Vite package. The dev server, CLI and build scripts are all directly included inside Vite! This is great as it is a one-stop shop for all your project needs. 

That's it for setting up! One command and everything is ready! We do need to host this, however! Let's jump on it!

## Hosting on Vercel

Vite is certainly a contender when it comes to offering the best developer experience. In this regard, it is only natural that we would want to pair it with the best developer cloud out there when it comes to developer experience: Vercel!

Luckily, Vite provides a build script. Under the hood, Vite uses the Rollup bundler. All the configuration and setup is done for you so all that you have to do is call the build script when you want to produce a static bundle for your site. Let's now go ahead and set this up for Vercel hosting (be sure to be connected to the Vercel CLI):

``` sh
cd react-vite 
yarn add vercel -D
yarn vercel
```
This will trigger the Vercel CLI and ask you some basic questions. You should keep all the defaults except for the `Output Directory`. Set this one to `dist` to be sure this works with Vite's Typescript bundling. Once this is done, Vercel will proceed to deploy your project online. Let's now add a deploy command to our project. Your `package.json` will now look like this:

``` json
{
  "name": "react-vite",
  "version": "0.0.0",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "serve": "vite preview",
    "deploy": "vercel --prod"
  },
  "dependencies": {
    "react": "^17.0.0",
    "react-dom": "^17.0.0"
  },
  "devDependencies": {
    "@types/react": "^17.0.0",
    "@types/react-dom": "^17.0.0",
    "@vitejs/plugin-react-refresh": "^1.3.1",
    "typescript": "^4.1.2",
    "vercel": "^21.3.3",
    "vite": "^2.1.5"
  }
}
```
Once this is done, you now a developer setup with a super-fast dev server and a convenient deployment process!


## Conclusion

- Vite is a great toolset that gives a great developer experience out of the box.
- By providing a pre-configured build script, Vite integrates well with Vercel

Connect with me on Twitter [@gbibeaul](https://twitter.com/BibeauGuillaume) if you have any questions.

