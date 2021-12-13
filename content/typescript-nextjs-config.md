---
slug: typescript-nextjs-config
category: next-vercel
title: Type safe environment variables
caption: Solve those nasty Typescript errors!
date: "December 12, 2021"
tags: ["Nextjs", "Vercel"]
image: "images/typescript-nextjs-config/philip-myrtorp-dFKvTeqt4z4-unsplash.jpg"
---

[Follow me on Twitter!](https://twitter.com/contrariancoder)

#### **Catching configuration errors before they happen!**



![tooling image](images/typescript-nextjs-config/philip-myrtorp-dFKvTeqt4z4-unsplash.jpg)

### **The importance of configurations in applications.**

The different tools for building applications have gotten good recently! As Front-End developers, we care mostly about the user experience aspect of our application but we still have to make sure our applications run in the right setting!

This is where configuration and environment variables come in! A great resource to get an introduction to the topic is the [3rd factor of 12 factors app](https://12factor.net/config) guide. However we won't be diving into the details as this blog is meant to provide you with quick solutions to common problems. Our focus in this post is to achieve type safety with configurations and environment variables.

### **Setting up**

This tutorial is meant to be agnostic of platforms. To ensure we don't waste time setting up, we will use a Next.js application hosted on Vercel. Vercel provides a [turnkey solution to passing environment variables to Next.js](https://vercel.com/docs/concepts/projects/environment-variables). This will let us focus on coding instead of learning different platform quirks that come from passing environment variables to our application. Here is a quick reminder on bootstrapping a new Next.js application with Typescript.

```sh
yarn create next-app --typescript
cd next-app
```

After this is done, you can proceed to create a `.env.local` file at the root of the project that Next.js will read automatically:

```sh
touch .env.local
```

### **Adding environment variables in Next.js**

We need to explore a regular scenario: you have different environments that your server interacts with such as local, staging, QA and so forth. If more often than not this will mean different URLs connecting you to your APIs. Our simple scenario will have two environment variables that will be added to our `.env.local`. One for interacting with the Ethereum blockchain and one for fetching Graphql CMS data.

We should also be adding those variables in the Vercel project  dashboard for our deployments but this is not relevant to our tutorial. Here are our values in `.env.local`.

``` txt
NEXT_PUBLIC_ETH_NETWORK=Rinkeby
CMS_API_URL=http://localhost:4000/graphql
```

In Next.js, any variable you prefix with `NEXT_PUBLIC` will be made available to code that runs on the browser. Any other variables will be scoped to the server(`getStaticProps` and `getServerSideProps`). In our scenario, the server will hydrate our pages with CMS data so we will keep `CMS_API_URL` hidden from the browser while `NEXT_PUBLIC_ETH_NETWORK` would be consumed in the browser for calling the Ethereum blockchain.


### **Providing type safe environmennt varialbe to our code**

However, we now face a dilemma. How can we be sure that those values will not break our code? We often don't control the build systems as Front-End developers so we should at least try to prevent errors from happening where we can! Here comes in type guards in Typescript. Here is an example where we will ensure we have a real Ethereum network:


``` ts
/**
* This enum allows us to set values that can be valid in our application to our liking.
*/
enum EthNetworks {
    Mainnet = 'mainnet',
    Ropsten = 'ropsten',
    Rinkeby = 'rinkeby',
    Kovan = 'kovan',
}

/**
 * 
 * @param network a string representing the network passed as an env variable
 * @returns a boolean that evaluates if the string is present in our Enum of netowrks
 */
const isEthNetwork = (network: string | undefined): network is EthNetworks => {
    return (network as EthNetworks) in EthNetworks;
}


/**
 * 
 * @param network the 
 * @returns 
 */
export const getSafeConfig = (): EthNetworks => {
    const network = process.env.NEXT_PUBLIC_ETH_NETWORK;
    if (isEthNetwork(network)) {
        return network as EthNetworks;
    } else {
        return EthNetworks.Kovan;
    }
}

```

There are a few things going on in there.


 The first is a [Typescript Enum](https://www.typescriptlang.org/docs/handbook/enums.html). This is similar to an object. Its goal is to represent declaratively the allowed values in our application. 

``` ts
enum EthNetworks {
    Mainnet = 'mainnet',
    Ropsten = 'ropsten',
    Rinkeby = 'rinkeby',
    Kovan = 'kovan',
}
```

After this, we are using a type guard. A type guard is a fancy function that returns a boolean. The boolean indicates if a value is of a specific type.

```ts
const isEthNetwork = (network: string | undefined): network is EthNetworks => {
    return (network as EthNetworks) in EthNetworks;
}
```

And Lastly, we have an exported function that will give access to the sanitized environment variable or a safe default value.


```ts
export const getSafeConfig = (): EthNetworks => {
    const network = process.env.NEXT_PUBLIC_ETH_NETWORK;
    if (isEthNetwork(network)) {
        return network as EthNetworks;
    } else {
        return EthNetworks.Kovan;
    }
}

```
### **Conclusion**

Operations and deployments around software impact your code like it or not. The best we can do as Front-End DevOps practitioners is to prevent wrong values to be passed to our application!
Applying these principles will let you enjoy stressfree deploys! 


[@contrariancoder](https://twitter.com/contrariancoder) on Twitter for any
questions!
