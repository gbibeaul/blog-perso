---
slug: gcp-vercel-integration
category: next-vercel
title: Google Cloud Platform Integration With Vercel's Next.js
caption: A simplified guide to using GCP services with Next.js and Vercel.
date: 'December 28th, 2020'
tags: ['Vercel', 'GCP', 'Vision API', 'Secrets']
image: 'images/diego-gutierrez--nL-LqkiKXw-unsplash.jpg'
---

<style type="text/css" rel="stylesheet">
* { 
    text-align: justify;
    text-justify: inter-word; 
  }

img {
  border: 1px solid #000;
}

.underline {
  text-decoration: underline;
}

hr {
  margin-top: 50px;
  margin-bottom: 50px;
}
</style>

#### **No documentation? I got you covered 😼**

![main](images/kristaps-ungurs-pBNtBUDNHBw-unsplash.jpg)
<em>Photo by <a href="https://unsplash.com/@kristapsungurs">Kristaps Ungurs</a></em>

<strong>Introduction</strong>

Recently at work, I’ve been tasked to implement a feature that scans for text in images for a Next.js web app that is automatically deployed by Vercel. Since that particular application uses Firebase, it was clear that using the Google Cloud Vision API would be a good idea, since Firebase is essentially a subset of Google Cloud Platform (GCP). Hence, we would only need to manage services from one cloud provider.

A key difference in how GCP works compared to some other cloud providers for authentication is that GCP lets you create something called a service account file, rather than an API key. That service account key file contains data about your GCP project and more importantly, contains your private key.

<hr />

<strong>Why do we need a service account file?</strong>

Simply put, GCP provides cloud services that range from computing power all the way to artificial intelligence. These services each have their own pricing models so the service account file identifies you as the rightful user of those services. If not, then another user could use these cloud services under your name while GCP bills the usage to your name.

<hr />

<strong>The problem</strong>

Typically, if you have access to your deployment servers, you can simply ssh into them and place your service account file in. However, Vercel automates your deployments for you so you cannot have access or ssh into these servers. If GCP used API keys for authentication, it would be much simpler.

So Vercel has something called integrations and there exists a GCP integration that solves this problem. However, there’s essentially no documentation or examples on how to use it as of this article’s publishing date. But today, I will be changing this 😼.

<hr />

<strong>Kicking off our Next.js app with Typescript</strong>

We’ll start by emulating the environment I’ve been working on. The stack used is Next.js with Typescript, Firebase and we’ll add the GCP Vision API on top of it.

Let's first start by initializing a Next.js application with Typescript. We can do so by opening our terminal in our preferred directory and running `npm create-next-app my-app` or `yarn create next-app my-app`

![create-next-app-commands](images/gcp-vercel-integration/create-next-app-commands.png)

As you can see, you can change <em>my-app</em> for any project name of your liking. I named mine <em>gcp-vercel-integration</em>. Change directory into your application with `cd my-app`. For example, I do this by running `cd gcp-vercel-integration` since I named my project as such.

Let's now add a `tsconfig.json` file in the project's root directory. Leave it empty for now, Next.js will populate this file with default typescript options for you later when you run `yarn dev`. Before running your application with `yarn dev`, let's first install the required typescript packages. To do so, run `yarn add -D typescript @types/react`

![nextjs-ts-packages.png](images/gcp-vercel-integration/nextjs-ts-packages.png)

Now, run `yarn dev` and you should see that your `tsconfig.json` file has been populated with the default options as previously mentioned. You should be able to see your app running on http://localhost:3000/

Finally, you can change your files to the appropriate typescript filename extensions. In `pages/`, swap the `_app` and `index` files to have the `.tsx` extension. In the `pages/api/` folder, you should see a file named `hello.js`. Rename it to `image-scan.ts`.

<hr />

<strong>Adding Firebase to our project</strong>

Log into your Google account and <a href="https://console.firebase.google.com/">go to the firebase console</a>. Click on <em>Add a project</em> and give it a name. I will call mine `gcp-vercel-integration`. Proceed and enable analytics if you want, but you don't need to. Add a web app by clicking on the icon (See image below) and give your web app a nickname.

![add-web-app](images/gcp-vercel-integration/add-web-app.png)

From the your Firebase project console's left sidebar, click on the <strong>Storage</strong> option and click on <strong>Get started</strong>. Next, edit your storage rules to allow read and writes. Your storage rules should be similar to:

```txt
rules_version = '1';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```

This allows all reads and writes, which is a security concern. However, we will keep this for the sake of this article. You should implement the appropriate logic based on your app.

Keep going and it will prompt you to select a storage region. I chose <em class='underline'>us-east-4</em> since I live on the east coast.

Now, from your command line, you can run `firebase login` and select the appropriate Google account. If you don't have the Firebase cli command, you can run <code>curl -sL https://firebase.tools | bash</code> and then run `firebase login`.

Run `firebase init` and select the <strong>Storage</strong> option. This is where we will store our images. Next, select the <strong>Use an existing project</strong> and select the firebase project you just created and keep proceeding. Finally, add the Firebase SDK package with `npm i firebase` or `yarn add firebase`.

From the your Firebase project console's left sidebar, you should see a small cog icon on the top. Click on it and go into your project settings. From the General tab, scroll down and you should see this:

![firebase-config](images/gcp-vercel-integration/firebase-config.png)

Copy the config object, as highlighted, and paste it in the `initializeApp()` like so in your `pages/_app.ts`:

```typescript
import '../styles/globals.css';
import firebase from 'firebase/app';

if (!firebase.apps.length)
  firebase.initializeApp(/* Paste the config object here */);

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
```

Congratulations! You have now bootstrapped your Next.js web app with Typescript and Firebase.

<hr />

<strong>Google Vision API Set Up</strong>

It's now time to set up Google Vision. Let's head over to the GCP console at https://console.cloud.google.com. Make sure the GCP console is using your Firebase project. You should see the name on top.

From the API library, search for the Cloud Vision API and enable it for your project. Once enabled, you should be on the Cloud Vision API dashboard. Go back to your terminal and from the root directory of your project, add the GCP Vision SDK with `npm i @google-cloud/vision` or `yarn add @google-cloud/vision`.

<hr />

<strong>Managing Secrets</strong>

Head on over to Vercel and add your project. You will need to push this to a git repository and connect it to Vercel. I'm assuming you know how to do this since it's pretty simple and there are plenty of references for it.

Go to <em>Integrations</em> and add the GCP integration. If you scroll down, you should see instructions on how to generate a service account key. Select your project and follow the instructions they give about the service account file.

![vercel-gcp-secrets](images/gcp-vercel-integration/vercel-gcp-secrets.png)

Once in the dashboard, scroll down and enable the Google Cloud AI services by clicking on the `Add to Project` button.

Now, create an empty `.env.local` file in your root directory and head over to https://www.base64encode.org/ and paste the content of a new service account JSON file in it. This new service account key should be from a new GCP project to ensure that developers can use it to test, rather than use your project's key which is meant to be used in production (If you just want to test it out, you can use the same key as the one you put into Vercel). Encode it and copy the resulting string. Paste the resulting string into your `.env.local` file into the `GCLOUD_CREDENTIALS` environment variable like so:

```txt
GCLOUD_CREDENTIALS=paste-your-encoded-key-here-without-any-quotation-marks-around
```

Finally, create a `next.config.js` file in your root directory. Paste the following in the file:

```javascript
module.exports = {
  env: {
    GCLOUD_CREDENTIALS: process.env.GCLOUD_CREDENTIALS,
  },
};
```

This file allows you to inject environment variables into the application. This is crucial, so make sure you do it properly!

<hr />

<strong>Upload images feature</strong>

We are now done with the set up and ready to code some features. Let's first create the endpoint. This will be the server-side code that will process the image and return the text that is detected. In `pages/api/image-scan.ts`, add the following code:

```typescript
import { NextApiRequest, NextApiResponse } from 'next';
import { ImageAnnotatorClient } from '@google-cloud/vision';

const { client_email, private_key, project_id } = JSON.parse(
  Buffer.from(process.env.GCLOUD_CREDENTIALS, 'base64').toString()
);

const GCPvision = new ImageAnnotatorClient({
  credentials: { client_email, private_key },
  projectId: project_id,
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { sourcePath } = req.body;
  const imageSrc = `gs://${sourcePath}`;

  try {
    const [result] = await GCPvision.textDetection(imageSrc);

    const [{ description }] = result.textAnnotations;
    res.status(200).send([description]);
  } catch (error) {
    res.status(400).send(error);
  }
};
```

What's with all the `JSON.parse()` and `Buffer` stuff about you ask? Well, since the service account JSON has been encoded into a string, we first decode it using the `Buffer` class and then we parse the JSON from the result decoded string. Our web app then has access to our JSON secret object! All that without anyone being able to read our secrets.

In your `pages/index.tsx`, replace the entire file with the following code snippet:

```typescript
import React from 'react';
import Head from 'next/head';
import Firebase from 'firebase/app';

import styles from '../styles/Home.module.css';
import 'firebase/storage';

const uploadFileToStorage = async (file: File) => {
  const storageRef: Firebase.storage.Reference = Firebase.storage().ref();
  const fileRef: Firebase.storage.Reference = storageRef.child(file.name);

  try {
    const {
      ref,
      metadata,
    }: Firebase.storage.UploadTaskSnapshot = await fileRef.put(file, {
      contentType: file.type,
    });
    const fileUrl = await ref.getDownloadURL();

    return { fileUrl, metadata };
  } catch (error) {
    console.error('upload error', error);
  }
};

const sendImageToScan = async (sourcePath: string) => {
  try {
    const textDetected = await fetch('/api/image-scan', {
      method: 'POST',
      body: JSON.stringify({ sourcePath }),
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json());

    return textDetected;
  } catch (error) {
    console.error(error);
  }
};

export default function Home() {
  const [file, setFile] = React.useState<File>(null);
  const [textDetected, setTextDetected] = React.useState<string>(null);

  const handleFileSubmissionForm = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setTextDetected('Loading...');

    try {
      const { metadata } = await uploadFileToStorage(file);
      const [textDetected] = await sendImageToScan(
        `${metadata.bucket}/${metadata.name}`
      );

      setTextDetected(textDetected);
      setFile(null);
    } catch (error) {
      console.log(error);
    }
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    setFile(files.item(0));
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <div>
          <form onSubmit={handleFileSubmissionForm}>
            <label htmlFor='uploader' aria-label='File Upload' />
            <input
              id='uploader'
              type='file'
              accept='image/*'
              onChange={onFileChange}
            />
            <button type='submit' disabled={!file}>
              Submit
            </button>
          </form>

          <span>{textDetected || 'No text detected.. yet 😈'}</span>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href='https://github.com/qjimmy'
          target='_blank'
          rel='noopener noreferrer'
        >
          <svg
            height='32'
            viewBox='0 0 16 16'
            version='1.1'
            width='32'
            aria-hidden='true'
          >
            <path d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z'></path>
          </svg>
          Made by QJ
        </a>
      </footer>
    </div>
  );
}
```

The above code is our client-side React code. It should look something like this:

![base-app](images/gcp-vercel-integration/base-app.png)

That's it! We're done! You can now test it by uploading an image and the DOM will update accordingly with the text that our web app detects. I won't explain the details of the code implementation since this article is mostly about setting up our project and secrets in order to be able to have access to GCP's services.

<hr />

You can see a wrapped up version here: https://gcp-vercel-integration.vercel.app/ (It's slightly modified for security reasons).

<hr />

<strong>Key Takeaways</strong>

<ul>
  <li>GCP and Vercel have a built-in integration to help us manage secrets.</li>
  <li>To use GCP's services locally, one must create a service account key from the GCP console, encode it and store it in the local <strong>.env</strong> or <strong>.env.local</strong> file.</li>
  <li>To have the above's environment variable (GCLOUD_CREDENTIALS) in production and previews, one must go to the Vercel + GCP integration dashboard, enter the production service account JSON content and enable the services.</li>
  <li>The <strong>next.config.js</strong> file is crucial in order to inject the environment variables in our application. Else, we will not be able to access them. If we try without the <strong>next.config.js</strong> file, their values will be <code>undefined</code></li>
  <li>In order to authenticate and use GCP's various services, we can decode and parse the JSON object. We can then use the properties in the service's constructor to demonstrate our credentials to GCP.</li>
</ul>

<hr />

## **About Me**

My name is QJ and I am a software engineer from Montreal, Canada. I work mainly as a fullstack web developer, but I am also passionate about other subjects. Like I mentioned, I haven't found any articles that talk about this incredibly niche subject, so please share it in order to help others! You can support me by following me on <a href="https://github.com/qjimmy">Github <strong>(@qjimmy)</strong></a> and <a href="https://twitter.com/qjnguyen">Twitter <strong>(@qjnguyen)</strong></a>.
