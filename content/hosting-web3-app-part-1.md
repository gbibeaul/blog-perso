---
slug: hosting-web3-app-part-1
category: next-vercel
title: How to host a Web3 app on Vercel
caption: Is there anything different about it?
date: "November 21, 2021"
tags: ["Web3", "Metamask", "Vercel"]
image: "images/hosting-web3-app-part-1/erlend-ekseth-0a5VbkqqFFE-unsplash.jpg"
---

#### **Is there anything different about it?**

![tooling image](images/hosting-web3-app-part-1/erlend-ekseth-0a5VbkqqFFE-unsplash.jpg)

### **What is a Web3 app? Does it change how we work as frontend developers?**

While Bitcoin is now part of the common vocabulary, there is a lot of talks
recently about a concept that is still a little hard to understand to the
average developer. The concept of a decentralized application (Dapp for short or
Web3 app) is starting to gather a lot of attention on the web. Many people are
starting to label themselves as "Web3 developers" and people are wondering what
is the difference between a Web3 app and a traditional web app.

If we elevate ourselves above the crypto hype, we can start to ask ourselves
relevant questions. How do we host and deploy those apps? How do we use them?
How do we use them in the browser? The good news is that from a coding
perspective, the answer is clear: a Web3 app is still calling modules, APIs and
libraries. It is still using the same JavaScript language as we are used to.

In short, a Web3 app is still a web app, but it follows a set of philosophies:
anonymity, security and privacy. Let's dive into the details to understand some
of those basic concepts! In this post, we will build a simple Web3 app that uses
the [Metamask](https://metamask.io/) browser extension. We will use the
[Ethereum](https://ethereum.org/) blockchain to store data and interact with the
blockchain.

This is not a complete app, but it is a good starting point to understand the
basics.

### **Setting up**

We will start with a simple Next.js app. Let's start by creating a new project:

```sh
yarn create next-app --typescript
cd next-app
```

Once this is done, we will need to install the metamask extension. Metamask is a
simple extension that allows you to interact with the Ethereum blockchain and
create wallets for it. Please follow the instructions on their
[website](https://metamask.io/download). Once the Metamask is installed, we can
proceed and create a wallet. Follow
[this great post](https://myterablock.medium.com/how-to-create-or-import-a-Metamask-wallet-a551fc2f5a6b)
for more details on how to do it.

### **Connecting the wallet to the app**

In order to interact with Metamask, we need to connect it to the app. While we
are using Next.js, Metamask works by injecting a new property on the Window
object. This means that we will not be able to use any of the Metamask features
on the server-side. This means that most features of a web3 app are client-side.
The interesting part is that we can use the Metamask API to interact with the
blockchain. The blockchain then provides a backend to our application. We'll
explore in further posts how to interact with the blockchain.

For now, let's install some packages to make it easier to interact with
Metamask. We will also create a simple Hook that will allow us to interact with
the Metamask API.

```sh
yarn add @metamask/detect-provider @metamask/onboarding @metamask/providers
touch hooks/use-metamask.tsx
```

Once this is done, make sure you have this content in your
`hooks/use-metamask.tsx` file:

```ts
import React from "react";
import MetaMaskOnboarding from "@metamask/onboarding";
import { MetaMaskInpageProvider } from "@metamask/providers";
import detectEthereumProvider from "@metamask/detect-provider";

export const useMetamask = () => {
  const [account, setAccount] = React.useState<string>("");
  const [ethereum, setEthereum] = React.useState<MetaMaskInpageProvider | null>(
    null,
  );

  const onboarding = React.useRef<MetaMaskOnboarding>();

  function handleOnboarding() {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      ethereum?.request({ method: "eth_requestAccounts" }).then((accounts) => {
        console.log(accounts);
      });
    } else {
      onboarding.current?.startOnboarding();
    }
  }

  function handleAccountChange(accounts?: string[]) {
    if (accounts && accounts.length > 0) {
      setAccount(accounts[0]);
      return;
    }
    if (accounts && accounts.length === 0) {
      setAccount("");
      return;
    }
    if (ethereum?.selectedAddress) {
      setAccount(ethereum?.selectedAddress);
      return;
    }
  }

  React.useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }

    detectEthereumProvider().then((provider) => {
      if (!provider) {
        return;
      }

      setEthereum(provider as MetaMaskInpageProvider);
    });
  }, []);

  React.useEffect(() => {
    if (ethereum) {
      handleAccountChange();

      ethereum?.on("accountsChanged", handleAccountChange);
    }
  }, [ethereum]);

  return { ethereum, account, handleOnboarding };
};
```

This hook creates a way for us to watch which wallets are currently in use in
the Metamask extension. We will use this to determine if we need to show the
onboarding screen or not. Once we are done adding it to our application, let's
modify the content of the `pages/index.tsx` file to use it:

```ts
import type { NextPage } from "next";
import Head from "next/head";
import { useMetamask } from "../hooks/use-metamask";

const Home: NextPage = () => {
  const { account, handleOnboarding } = useMetamask();

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {account.length === 0
        ? (
          <button onClick={handleOnboarding}>
            Connect
          </button>
        )
        : account}
    </div>
  );
};

export default Home;
```

This simple code just checks if the user has a wallet connected to the Metamask
extension. If they don't have one, it will prompt them to connect one or install
the extension. If they do have one, it will display the address of the wallet.

Obviously, this is not a complete app, but it is a good starting point to
understand the basics.

If you wish to test out the app, you can run the following command and navigate
to [localhost:3000](http://localhost:3000).

```sh
yarn dev
```

### **Deploying the Web3 app to Vercel**

The next step is to deploy the app to Vercel. We will use the
[Vercel CLI](https://vercel.com/docs/cli). The good news is that you can deploy
the app to Vercel in a few minutes. Nothing changes in deploying the frontend
part of a Web3 app. The only thing that changes is the backend part which is
essentially smart contracts and a blockchain!

Let's start by connecting to our Vercel account:

```sh
vercel login
```

Once this is done, we can deploy the app to Vercel.

```sh
vercel deploy
```

Since this is a next.js app, nothing has changed in the deployment process! We
can follow the steps in the deployment process to deploy the app to Vercel. We
will end up with a new URL for our app. If we visit this URL, we should be able
to interact with our Metamask wallet.

### **Conclusion**

A simple Web3 app is now deployed to Vercel. The real difference for a frontend
Web3 app is in the way we build it, not in the deployment. We will continue to
explore the deployment process in the next post when we will cover how to deploy
smart contracts to the blockchain. Web3 is an exciting new world and we can
build great things with it once we start to understand the basics. Here is a
recap:

- Metamask handles authentication to our wallet and the blockchain.
- Server interactions are difficult since Metamask injects a new property on the
  Window object.
- Deployments are not different from other apps.

[@contrariancoder](https://twitter.com/contrariancoder) on Twitter for any
questions!
