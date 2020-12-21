---
slug: python-on-vercel
category: next-vercel
title: Using Vercel to host a Python API.
caption: Sending the Python Data-Science Stack to production easily.
date: "December 21th, 2020"
tags: ["Vercel", "Python", "Data-Science", "Pandas"]
image: "images/python-on-vercel/shahadat-rahman-voM1Z9cGPCU-unsplash.jpg"
---

#### **The best front-end developper experience brought to data scientists.**

![Abstract image](images/python-on-vercel/christopher-burns-Kj2SaNHG-hg-unsplash.jpg)

### **Vercel Serverless Functions**

This blog's first post was about [Vercel Serverless Functions](blog/build-deploy-a-vercel-api). Since then, we have started to witness the adoption of Vercel as a framework. The benefits are enormous: preview deployments, cheap hosting, and amazing developper experience. While the adoption for Node.js has been great in the past few months, some of the other runtimes provided by Vercel deserve more attention.

In this blog post, we will explore hosting a Python API using Vercel Serverless Functions and see if the same advantages apply to the Python data science stack.

### **Setting up**

The setup will be similar to starting a Node.js Vercel API. We will need an account at [Vercel](https://vercel.com/) and connect it to the CLI.

```sh
yarn global add vercel
vercel login
```

After you have completed the steps to login, we will create a base project in a new folder.

```sh
mkdir vercel-python-api
cd vercel-python-api
```

Now comes the weird part. We will initialize a Javascript project in order to manage our Python API.

```sh
yarn init -y
mkdir api
yarn add vercel -D
```

While this is counterintuitive at first, there are major advantages. The Python toolchain is great, but managing Python runtimes on a project per project basis is always a challenge. Vercel provides an amazing opportunity of solving this problem by using them as a cloud provider. For this reason, we will add a `package.json` to our project. Open your favorite code editor and make sure your `package.json` has the same content.

```json
{
  "name": "vercel-python-api",
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

Once this is done, we will instantiate the project and add it to our Vercel Dashboard. From the root of the repo, run `vercel` and accept all the default parameters. This will deploy our empty project to our Vercel account. Let's move on to actually adding some code!

### **Setting up API routes**

While the Python runtime is still in Beta, it provides for a really easy way to create API routes. Vercel uses the folder structure of your project in order to expose API routes. By default, files added to the `/api` folder will be exposed. Let's go ahead and create our first route. Create a `api/index.py` file and add the following content to it.

```python
from http.server import BaseHTTPRequestHandler


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/plain')
        self.end_headers()
        self.wfile.write(str('Hello World!!').encode())
        return
```

Run your project using:

```sh
yarn start
```

This will start a local development server on http://localhost:3000/api. Navigating to this link will give you a "Hello world" message. All of this without managing any 3rd party library in Python!

### **Using 3rd party libraries**

This is all good, but what if you are planning on hosting a machine learning model or a dataset? Vercel provides with a super simple way of installing 3rd party libraries. All you have to do is add a `requirements.txt` file to the root of your project. Let's create one and add the NumPy library to it. Your file should have the following content.

```txt
numpy
```

Leaving the version number empty will default to using the latest version. Let's now modify our `api/index.py` function to generate random dice rolls using NumPy:

```python
from http.server import BaseHTTPRequestHandler
import numpy as np


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/plain')
        self.end_headers()
        self.wfile.write(str(np.random.choice([1, 2, 3, 4, 5, 6])).encode())
        return
```

Navigating to http://localhost:3000/api will now give you a random number between 1 and 6 like a dice roll would give you. All of this without managing your own Python version or virtual env!

### **Deploying and expanding to Data Science usecases**

The main advantages of this is just how simple the toolset is. In order to deploy our new dice roll API, all we have to do is call `vercel` like this.

```sh
yarn deploy
```

Connecting to a GitHub repo will also have the added benefit of enabling preview deployments. Preview deployments are a nice way to check your code in a environment similar to production when you are submitting pull requests.

NumPy was used as a demonstration library, but any library available on pip would be available. This really starts to open up the different use cases. The following use cases come to mind:

- Hosting a production ready SciPy machine learning model.
- Hosting a data aggregation API.
- Making a data API returning training data sets.

### **Conclusion**

Getting an API project started with Vercel Serverless functions is convenient and really fast. Here are some takeaways:

- Vercel takes zero configurations and is able to run your project.
- You can start using the Python data stack with ease without having to manage a Python installation.
- A Javascript toolset for Python is not completly crazy.

[@BibeauGuillaume](https://twitter.com/BibeauGuillaume) on Twitter for any questions!
