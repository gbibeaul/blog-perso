---
slug: build-deploy-a-vercel-api
title: How to build and deploy a Node API on Vercel Serverless functions
caption: Learn the easiest API depoyment in town...
date: "9 July 2020"
tags: ["Vercel", "Typescript", "Node"]
image: "images/paulo-victor-lJ37JsyEJP0-unsplash.jpg"
---

Probably the simplest way to deploy a REST api in 2020.

![Zeit is now Vercel](images/vercel.png)

### **Vercel Serverless Functions**

[Vercel (formerly Zeit)](https://vercel.com/), the company behind [Next.js](https://nextjs.org/) and the [SWR fetching library](https://github.com/vercel/swr), has a nice serverless offering. Theyrecently came out with 0 configuration deployments. These deployments open the door to really fast project setup and deployments. Today in this first tutorial we will cover how to set up a Typescript REST api using Vercel Serverless Functions with minimal overhead.

### **Setting up**

We first need to install the Vercel CLI and login. Be sure you have an account at [Vercel (formerly Zeit)](https://vercel.com/).

```bash
yarn global add vercel
vercel login
```

The login step will require you to enter your email and follow the instructions. Make sure you complete the instructions and then create a new project.

```bash
mkdir vercel-api
cd vercel-api
yarn init -y
mkdir api
```

Let's add the only dev dependency to run our project locally.

```bash
yarn add vercel -D
```

Once this is done open the project folder in your favorite editor and open `package.json`. We will need to add a script section to have a proper dev environment. We will need a script for deploying and a script for starting the dev server. Your file should look like this.

```json
{
  "name": "vercel-api",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "start": "vercel dev",
    "deploy": "vercel deploy --prod"
  },
  "devDependencies": {
    "vercel": "^19.1.1"
  }
}
```

Our last step before running the project is locally is to connect it to the vercel dashboard. From the root of the project run `vercel` and accept all the default parameters. We are using Vercel's 0 config set up. The project will be uploaded a first time but will not contain any endpoints.

We now need to create our first end point. Create the `api/index.ts` file. Vercel will define your API routes based on your folder and file structure. It will look under each folder or file for a default export and will create a corresponding serverless function to handle the route. Now, let's add the following code to our base api route in `api/index.ts`

```typescript
import { NowRequest, NowResponse } from "@vercel/node";

export default (req: NowRequest, res: NowResponse) => {
  return res.json({ message: "Hello World" });
};
```

Run the project using

```bash
yarn start
```

This will start a local development server on http://localhost:3000/api. Navigating to this first endpoint will give you an Hello world Message.

Now let's go ahead and add a dynamic route using query parameters. Vercel Serverless Function handles dynamic routes in a similar way to next.js. You can use the `[paramName].ts` syntax to define the name of the query parameter. To see this in action let's create a user folder and id route:

```bash
mkdir api/users
touch "api/users/[id].ts"
```

in your `api/users/[id].ts` file add the following code.

```typescript
import { NowRequest, NowResponse } from "@vercel/node";

const users = ["Bob Smith", "Guillame Bibeau"];

export default (req: NowRequest, res: NowResponse) => {
  const { id } = req.query;
  res.status(200).json({ user: users[Number(id)] });
};
```

You can access the query parameter under the req.query object made available to the handler. Navigating or sending a request to `http://localhost:3000/api/users/0` Should now give you the corresponding user from the users array: `{user: "Bob Smith"}`.

### **Deploying**

Now that you have the basic folder structure and code of your API we can proceed and deploy the API on Vercel's cloud platform. One interesting thing to note before proceeding is that Vercel is let's us use Typescript without even needing to compile in webpack or having to configure anything. While this is not recommended for production projects it is interesting to get a prototype API online quickly! Now let's deploy all of this:

```bash
yarn deploy
```

The Vercel CLI will proceed to build all the necessary Serverless Functions bundles and you can just sit while the magic happens. After a couple of seconds you should be prompted with the deployed URL to your service. To test it out navigate to the url and add then to `/api/users/0`. You should get the same results as the development server.

### **Conclusion**

Getting an API project started with Vercel Serverless functions is convenient and really fast. Here are some takeaways:

- Vercel takes 0 configuration and is able to run your project
- You can start using typescript, javascript or any supported languages
- the repo code is here [Github](https://github.com/gbibeaul/vercel-api-starter/tree/master)

Send any questions or comments at g.bibeaulaviolette@gmail.com!
