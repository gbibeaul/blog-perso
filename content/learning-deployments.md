---
slug: learning-deployments
category: opinion
title: Why web developers should know how deployments work
caption: Learning how to deploy an application
date: "April 2, 2021"
tags: ["Education", "Learn in Public", "Deployment"]
image: "images/learning-deployments/inaki-del-olmo-NIJuEQw0RKg-unsplash.jpg"
---

#### **Learning how to deploy an application**

![tooling image](images/learning-deployments/inaki-del-olmo-NIJuEQw0RKg-unsplash.jpg)

## **Why does this matter?**

When I first started my career my team had a really simple deployment pipeline.
The technical lead on the team took 2 days to set up a Jenkins server and
automatically deploy our React application to an AWS S3 bucket on each push to
the main branch. At the time I enjoyed this convenience without thinking much
about it. I knew my code reached customers with speed and we kept them happy by
sending bug fixes promptly.

Being a small web agency, we had a good degree of flexibility and a good
customer understanding of the need for a good process. To me this was a given, I
started my career thinking most companies and projects are well organized. This
is however not the reality. A lot of legacy applications are deployed on a
weekly or even on a monthly schedule in some companies.

## **You can overcome this!**

Even if you are working on a big legacy codebase in a company that is slow to
change you can overcome this! In all the companies I have worked for,
questioning the status quo is a welcomed quality for a developer. As a
developer, your job will be easier to do if you can deploy your code often! This
is why you should propose improvements to how your application is built and how
often it is deployed! Most of you might think that to accomplish this you need
experience in cloud development or DevOps.

While this bears some truth, you should try to develop an understanding of your
build and deployment process! If you have added a script to the script section
of your `package.json` you already have some scripting experience!

## **You already have the underlying skills**

Javascript and Python are scripting languages that have the full toolset needed
to build and deploy an application:

- copying files
- making HTTP requests
- reading and writing JSON
- infrastructure as code (more on that later)

With the 3 tools in the above list, you already have all that you need to build
and deploy a basic website. Most bundlers are available as npm packages, giving
you access to writing your build script in a Javascript file(more on this in an
upcoming post). Deploying is a similar story, platforms like AWS and Netlify
have a whole suite of APIs that you can call to upload app bundles and trigger
deployments! Companies like Vercel go even further and automatically deploy
applications for you when you commit.

However, in a lot of situations, you will not be able to change your hosting
provider and you will not be able to move to a company like Vercel unless you
plan a rewrite of your whole application. In that situation don't accept the
status quo! Propose to your engineering manager or tech lead to try and deploy
the application more often!

## **You will not get to automated deployments in 1 week on legacy projects**

One thing to keep in mind is that going to a fully automated continuous
deployment process will take work. As a web developer, you probably cannot spend
all your time focused on this but by learning the basics of cloud development
and DevOps you will be able to challenge old mentalities. This will bring you
closer to getting a promotion since it shows you have at heart the improvement
of the company and technology organization!

It takes time to learn complex build/deployments. You should start by trying to
deploy a static site on AWS s3 or by trying to create a Serverless Express API.
These small learnings will eventually compound into something bigger! You will
soon acquire knowledge of bundlers, transpilers and even tree shaking!

## **How you can learn**

My goal with this blog was to help people learn those skills in small tutorials
that give them quick results! However, to help more people to learn this I have
partnered with Udacity to launch a course teaching automated deployments for
Javascript developers. This course is part of a whole
[nano degree teaching Full Stack Javascript Development!](https://www.udacity.com/course/full-stack-javascript-developer-nanodegree--nd0067).

The last course in the nano degree (the one I teach) will show you how to:

1. deploy cloud infrastructure
2. interact with cloud services with a CLI
3. write relevant scripts to automate operations like build and deploy
4. write a complete pipeline to automate the deployment process using CircleCI

This post is not about selling this course, you could decide to learn all of
this by reading documentation and reading tutorials. However, if you are looking
at a well-structured introduction course to deployments this will give you all
the tools you need to progress quickly!

## **Coming soon: my DevOps course for Web Developers**

This collaboration with Udacity was the first step in creating my own full
DevOps course. This course will teach you all you need to build, deploy and
manage complex Javascript application platforms. It will cover:

- scripting
- bundlers and transpilers
- pipelines
- cloud infrastructure for Javascript applications
- cloud providers
- Mono repo management
- much more!

This obviously will take time to build but I look forward to sharing my
knowledge of those topics! I strongly believe that learning this will empower
you and increase your value as a developer!

Connect with me on Twitter
[@contrariancoderl](https://twitter.com/contrariancoder) if you have any
questions about this platform!
