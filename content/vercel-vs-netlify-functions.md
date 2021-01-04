---
slug: vercel-vs-netlify-functions
category: next-vercel
title: What is the best developer cloud for your serverless functions.
caption: Taking developer experience to the next level.
date: "Monday January 4th, 2021"
tags: ["Vercel", "Netlify", "Serverless"]
image: "images/vercel-vs-netlify-functions/philip-graves-5nhuw-QHdkw-unsplash.jpg"
---

#### **What is the best developer cloud for your serverless functions.**

![Abstract image](images/vercel-vs-netlify-functions/philip-graves-5nhuw-QHdkw-unsplash.jpg)

AWS Lambda was introduced over 6 years ago in November 2014. In the fast moving world of cloud computing Lambda is now considered a mature service! There are countless runtimes available and Lambda integrates with a plethora of AWS services. Since it's inception, Lambda has proven it's worth and remains the king of low cost cloud computing. One area where it does not shine however is on the developer experience.

It takes even for senior developers a fare amount of reading to setup even a simple CI/CD pipeline to deploy Lambda applications. Great tooling like the [Serverless Framework](https://www.serverless.com/) and [AWS SAM](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-specification.html) exist but in the last few years we have seen the rise of Developer clouds like [Vercel](https://vercel.com/l) and [Netlify](https://www.netlify.com/). Those clouds aim to provide with a complete platform over AWS Lambda. In this post we will analyse their offering and see how they adapt to common application scenarios.

## Setting up

**Netlify**

Setting up Netlify functions requires a little bit of configuration. To set them up it is necessary to either to add a `netlify.toml` file or to navigate to the functions pages of your site settings ([more details here](https://docs.netlify.com/functions/overview/)). There are options to then customize the your build or even to use unpackaged functions.

**Vercel**

Vercel automatically looks for functions in the `/api` folder of your project. Connecting to the rest of the toolset requires no configuration from developers and most functions will run out of the box. The first time you run your project you will have to connect it to the Vercel cloud in order to run your project in dev mode.

#### **Winner:** Vercel

<br/>

## Tooling

**Netlify**

Netlify provides a mature ecosystem and toolset. That experiences crosses over to the functions toolset. The Netlify CLI is available on NPM and provides a everything needed to deploy and run your code locally. One thing to note when running a Netlify dev server is that functions are not routed automatically to the main server, instead they are made available on http://localhost:60258/.

**Vercel**

Vercel first attracted attention for being the company behind Next.js. When using Next.js it becomes clear why this framework is so popular in the React ecosystem: the developer experience is top notch. The same mentality was brought over into their CLI. It offers a great toolset to deploy and interact with your application. It offers a bit less options than the Netlify CLI but all of them work effortlessly. When running the dev server, functions will be made available at http://localhost:3000/api.

#### **Winner:** Tie

<br/>

## Configuration options.

**Netlify**

Netlify offers a great deal of customization with their `netlify.toml` file. The use of Netlify plugins can also help simplify a lot of developement workflows. These plugins add powerfull capabilities to your builds and can extend the use of Netlify as a platform. Netlify environment variables are also easily available to the functions.

**Vercel**

Vercel offers almost the same level of customization when using their `vercel.json` configuration file. There is however a gradual shift away from this way of configurating project and a heightened focus on their zero config offering. The documentation is well built but we are often left with the impression that Vercel is prioritizing their zero config offering. However, more runtimes are offered out of the box like python go and ruby.

#### **Winner:** Netlify

<br/>

## Developer Experience

**Netlify**

After a fair amount of reading and setup, the Netlify serverless dev experience is smooth sailing! The dev server is snappy and provides a great selection of logs. Working with Typescript takes more configuration and does not work out of the box however. Connecting the Netlify CLI is quick and takes minimal effort. Preview deployments are also easy to integrate!

**Vercel**

Vercel claims it is the optimal workflow for frontend teams. This is a bold claim and they mostly deliver on it. They support typescript out of the box and offer automatic preview deployments on all projects hosted on their platform. Vercel is focused on delivering a great experience on every aspect of their platform.

#### **Winner:** Vercel

<br/>

## Conclusion

#### **Overall winner:** Vercel

Our recommendation for serverless is Vercel. Here are the main reasons:

- The unit of deployment is now small enough that amazing platforms like Netlify and Vercel can deliver an amazing developer experience on top of this paradigmn.
- Netlify shines on the maturity of it's ecosystem and with it's continued focus on delivering a great platform.
- Vercel takes the crown with the huge amount of work they have done on their zero config experience. Almost everything is 1 command or 1 click away in Vercel and this means that the platform is almost never a blocker. That allows the developer to focus on creating features while saving tons of money spent on configuration.

[@BibeauGuillaume](https://twitter.com/BibeauGuillaume) on Twitter for any questions!
