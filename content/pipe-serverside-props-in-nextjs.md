---
slug: pipe-serverside-props-in-nextjs
category: next-vercel
title: Using a pipe function in Next.js getServerSideProps
caption: Organize your server side props with ease!
date: "July 25th, 2020"
tags: ["Next.js", "Typescript", "React"]
image: "images/daniel-mirlea-WGdliLPgMaA-unsplash.jpg"
---

#### **Simplify your Next.js server side props**

![snowy image](images/daniel-mirlea-WGdliLPgMaA-unsplash.jpg)

## **Jamstack mentality**

The React and web development community has witnessed in recent years the rise in popularity of frameworks that embrace the [Jamstack](https://jamstack.org/) ideas.
These platforms offer the promise of more performant web pages by using a variety of techniques. While [Gatsby](https://www.gatsbyjs.org/) has built an amazing set of tools dedicated to generating static sites with ease, [Next.js](https://nextjs.org/) has focused on offering flexibility in how it fetches data and renders pages.

While both of these platforms have their strengths and weaknesses, it is important to establish a strong data fetching strategy in any project. Next.js offers two main ways of fetching data before the page is loaded client-side:

- [getStaticProps](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation)
- [getServerSideProps](https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering)

In this tutorial, we will focus on building a piping function to simplify the organization of getServerSideProps functions.

## **Pipe functions**

A pipe function is not a new concept for people familiar with functional programming. The idea is to initiate a series of functions that push information downwards transforming along the way the information into a desired format. Here is a simple example:

```typescript
const double = (num) => num * 2;
const add1 = (num) => num + 1;

pipe(double, add1)(5); // equivalent of add1(double(5))
// returns 11
```

The idea between a pipe function is pretty simple to understand and to implement in JavaScript. However, there is an interesting challenge around building such a functionality when working with promises and asynchronous data fetching.

The `.then` notation is already operating similarly but does not serve our purpose of having a reusable function that can pass props to Next.js' `getServerSideProps`. Let's get down to business and implement such a function in TypeScript.

```typescript
type PipedGetServerSideProps = (arg?: any) => Promise<any> | any;

export const ssrPipe = (...functions: PipedGetServerSideProps[]) => async (
  input: any
): Promise<{
  props: Object;
}> => {
  return {
    props: await functions.reduce(
      (chain, func) => chain.then(func),
      Promise.resolve(input)
    ),
  };
};
```

There are 4 important aspects to understand in this small code snippet:

1. The initial argument will be resolved in order to start a promise chain.
1. By using the spread operator, we can accept an unlimited number of piped functions.
1. Each function receives as an argument the resolved value of the previous Promise.
1. We end up returning the data in the format Next.js is expecting in `getServerSideProps`.

With this in mind, let's explore a real life use case where we need to fetch an user from a session and then use this user ID to fetch information about him. We will not go into implementation details in order to focus on usage of the function.

## Example usage

The first thing to note is that our pipe function is tailored to return an object containing the `props` property. This is to ensure compatibility with `getServerSideProps`, but forces us to only use our pipe function with Next.js. (please read [the related documentation if you are not familiar with the concept](https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering)):

```typescript
export const getServerSideProps: GetServerSideProps = ssrPipe(
  withUser,
  withUserSubscriptions
);
```

The first function will then receive as an argument the Next.js context. It can then proceed to fetch the user session and information based the context object and send along the information to the next function in line:

```typescript
// first function
const withUser async (context) => {
  const { req, res } = context;
  // data fetching and munging goes here
  return { userId: "123" };
};
```

The next function passed will then receive the previous function's return value as an argument. It can then proceed to fetch new information and format it to be passed down the chain. In our example, this is our last function, so we will return an object representing the value of our Page's props:

```typescript
const withUserSubscriptions async ({ userId }) => {
  // additional data fetching and munging goes here
  const res = await fetch(".../somewhere");
  const data = await res.json();
  return {
    userId,
    subscriptions: data,
  };
};
```

An unlimited number of functions can then work together to achieve a pipeline of information. The last function is responsible to return the final Props object. This object will then be injected as a prop to the next.js Page component:

```typescript
function Page({ userId, subscriptions }) {
  return (
    <p>
      {userId} is suscribed to {subscriptions.toString()}
    </p>
  );
}
export const getServerSideProps: GetServerSideProps = ssrPipe(
  withUser,
  withUserSubscriptions
);
```

## Conclusion

- A pipe function is helpful to push down information to the next function.
- The same functionality can be achieved with a single function, but piping helps code organization.
- Next.js offers a great set of tools in React projects that, when well-organized, provide a great developer experience.
