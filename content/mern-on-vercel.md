---
slug: mern-on-vercel
category: next-vercel
title: Host your existing MERN app on Vercel
caption: Mern in a new way!
date: "December 6, 2020"
tags: ["Vercel", "MERN", "Hosting"]
image: "images/pawel-czerwinski-Lki74Jj7H-U-unsplash.jpg"
---

#### **A refactor well worth the effort.**

![tooling image](images/pawel-czerwinski-Lki74Jj7H-U-unsplash.jpg)

### **Why host MERN apps on vercel?**

The MERN stack is at a crossroads: it is still a hugely popular stack behind a lot of production applications but it's popularity is being attacked by the Jamstack. Sometimes it makes sense to refactor an application to migrate it to a framework like Next.js or Gastby but that can be a huge task.

However, if you don't have the time or ressources for such a big migration, you can still get a lot of benefits like preview deployments and serverless functions if you host your MERN app on Vercel. In this tutorial, we will show you how to adapt such an application to be hosted on Vercel's Cloud. This tutorial assumes a intermediate level of understanding and aims at giving an idea of how the process works.

### **Example Repo**

For the purpose of this post, we will be using an application built by [Nathalie Benarroch](https://twitter.com/Nathalieben26) for her final project as a Web Development bootcamp student. This application follow the typical MERN architecture with a Front-End in React and a Express/Mongo Back-End. Since our goal is to host this app we will not focus on features or potential bugs but it is good to have a general idea of how the code works so please have a look at the [original repository](https://github.com/lavilabs/adapting-express-to-next/tree/original) to explore a bit the structure.

### **Setting up**

After cloning locally the repo and opening a new terminal inside it be sure to add vercel to dev dependencies and follow the instructions to login to your account:

```bash
yarn add vercel -D
vercel login
```

Once you are logged in, change your start command in the root `Package.json` to use the vercel cli instead:

```javascript
  "scripts": {
    "start": "vercel dev",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
```

You should now be able to run the application for a first time by calling the start command:

```bash
yarn start
```

You will be prompted to create a new project. Here you can accept the default settings as Vercel is able to detect that this is a create-react-app repo. The good news is that now we have our Front-End running locally and deployable to Vercel.

### **Setting up environment variables**

While our React application can start locally, we are still missing quite a few things like our Back-end and connecting to our external services(AWS, Mongo, Auth0). Our application will need some env variables in order to connect to those services. We need 5 to be more precise:

```bash
MONGO_URI
AWS_ACCESS_KEY
AWS_SECRET_KEY
AUTH_ZERO_DOMAIN
AUTH_ZERO_CLIENT_ID
```

Luckily, Vercel offers a way to set environment variables and protect them nicely. As always, treat all your environment variables with care and avoid having them committed in source code. Instead we can use the Vercel CLI command to have them directly passed to our hosted application:

```bash
vercel secrets add [secret-name] [secret-value]
```

This should be done for all env variables that our application depends on. Please notes that the secrets will be converted to lowercase and should also be converted in your code. After this is done we can move on into adpating the code to use Vercel Serverless functions.

### **Vercel Serverless functions**

One of the big differences between using Vercel Functions and express is how routing is done. Vercel functions look at the folder structure to establish the API routing. This means that our application will now have a single `Package.json`. We will need to install the dependencies of the Server Directly in the root of the repo with some exceptions: All the Express modules are already handled for us by Vercel so we won't install them:

```bash
yarn add dotenv mongodb morgan aws-sdk
```

This is normally a good time to decide if you need all those dependencies and refactor some areas of your backend to simplify it. After this we are ready to start building out our serverless functions. From analysing the repo we can make out that there is a REST api to fetch clothes and also a file upload feature. We will focus for now on building out the clothing routes.

Let's move the aws and mongo folder to the root of the repo. This will make the database available outside the server folder that will soon be removed.

### Creating the API folder structure.

We can now create our folder structure to let Vercel Identify the routing. We will create a `/api` folder at the root of the repo. Since the current route we are using is named clothing, let's also create `/api/clothing.js`. There will be one twist however, we will handle all our clothing API methods inside this one file. The file should look something like this:

```js
const MongoClient = require("../mongo/client");
const { ObjectId } = require("mongodb");

export default async (req, res) => {
  const client = await MongoClient();
  await client.connect();
  const db = client.db("DriveThruCloset");

  const { method } = req;

  switch (method) {
    case "GET":
      let getResponse = await db.collection("clothing").find({}).toArray();
      res.status(200).json(getResponse);
      break;
    case "POST":
      const { name, description, type } = req.body;
      const { filename } = req.file;

      let postResponse = await db
        .collection("clothing")
        .insert({ name, description, filename, type });
      res.status(200).json(postResponse);
      break;
    case "DELETE":
      const { _id } = req.body;

      let deleteResponse = await db
        .collection("clothing")
        .deleteOne({ _id: ObjectId(_id) });
      res.status(200).json(deleteResponse);
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
  client.close();
};
```

The main difference is that we rely on a switch statement instead of relying on Express to define our methods. This has some advantage and disadvantage but it accomplishes the same as using express. After this is done let's jump to the last part, adapting the React application.

### **Adapting the Front-End**

The last thing we need to do for all of this to come together is to change the base url our application is using to query the Back-End. This is needed since unlike the MERN stack, our new approach uses Serverless Functions that are hosted under the same URl as our Front-End application.

let's find the `src/api/api.js` file and change the base url to follow our new structure:

```js
const baseurl = `${window.location.origin}/api`;

export default (url, options) => fetch(baseurl + url, options);
```

Once this is done we now have a happy path establishing the communication between our Front-End and Back-End!

### **Conclusion**

Adapting an application to run on Vercel can pose some challenges but in the end the low cost and developer experience is well worth it! This post cannot cover every aspect of such a transition as every application is different but the following steps can be followed to adapt most MERN stack applications!

Connect with me on Twitter [@gbibeaul](https://twitter.com/BibeauGuillaume) if you have any questions on the process!
