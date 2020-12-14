---
slug: image-optimization-nextjs
category: next-vercel
title: Optimize Your Images With The New Component From Next.js
caption: Get busy engineering features without worrying about the performance of your images
date: 'December 14th, 2020'
tags: ['Vercel', 'Image', 'SEO']
image: 'images/claus-pescha-gF7l9cOBPgk-unsplash.jpg'
---

<style type="text/css" rel="stylesheet">
* { 
    text-align: justify;
    text-justify: inter-word; 
  }

img {
  border: 1px solid #000;
}
</style>

#### **A beautiful solution that lightens the burden for developers.**

<em>Photo by <a href="https://unsplash.com/@jon_chng">Jonathan Chng</a></em>

![christmas](images/jonathan-chng--gymUYe-fL8-unsplash.jpg)

## **The Recent Next.js Release**

As of the publication of this article, Next.js has recently released its new major version: <strong>10.0.0</strong> (Based on <a href="https://semver.org/">semantic versioning</a> conventions). One of the newest and most exciting feature they have in this version is the <strong>Built-in Image Component and Automatic Image Optimization</strong>.

![new-feature](images/nextjs-image/new-feature.webp)

This new feature allows for developers using Next.js to quickly import a native component that will automatically optimize your images and hence, improve the performance of your web application.

## **Is Image Optimization Really Necessary?**

Images take up a very large portion of a webpage. If we look at the 90th percentile of heaviest webpages, images can take up to roughly 75% of the bundle size. Unoptimized images are often the cause of a heavier
bundle size.<sup><a href="https://almanac.httparchive.org/en/2019/page-weight#what-types-of-assets-does-the-http-archive-track-and-how-much-do-they-matter">source</a></sup>

This means that a website that does not have optimized images will have a slower performance than its counterpart who has optimized its images. This can be detrimental to your website simply due to the fact that it tends to give a bad user experience.

## **How Does The Built-In Image Component From Next.js Solve This?**

The Next.js team worked with Google engineers in order to develop this component that will automatically optimize your images. The component does so by performing mainly two things:

<ol>
  <li>Automatic WebP Conversion</li>
  <li>Lazy Loading By Default</li>
</ol>

WebP is a next generation image format currently developed by Google that employs lossy and lossless compression in order to achieve a smaller byte size for images. The Next.js <code> &lt;Image /&gt;</code> component will automatically convert images to this WebP format, optimizing its byte size.

The Next.js <code> &lt;Image /&gt;</code> component also lazy loads images by default. This means that this <code> &lt;Image /&gt;</code> component will not render the image unless the viewport is within a certain pixel distance away from it.

## **How Do I Use It?**

<em>The following section shows how to use the <code> &lt;Image /&gt;</code> component with a static image file from the `public/` folder</em>

Let's create a new Next.js application and test out this <code> &lt;Image /&gt;</code> component ourselves.
In your terminal, run <code>npx create-next-app</code> or <code>yarn create next-app</code>. I called my application <em>example-app</em>, but you can call it whatever you prefer.

![cna](images/nextjs-image/cna.webp)

This creates a new project folder with a base Next.js application. Run your application by changing directory into this new project folder and by running <code>npm run dev</code> or <code>yarn dev</code>. Visit your app by going to <a href="http://localhost:3000">http://localhost:3000</a>. You should see this:

![base-app](images/nextjs-image/base-app.webp)

Add any image in the `public/` folder. For my example, I have a `dog.jpg` file in my `public/` folder. You can add any image you like.

Now, in the `/pages/index.js` file, replace everything by the following code snippet:

```typescript
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Image src='/dog.jpg' alt='my image' height='628' width='1100' />
    </>
  );
}
```

The Next.js <code> &lt;Image /&gt;</code> requires the `height` and `width` attributes. In my case, my image is `1100x628` so I used these values. If you'd rather not hard code a `height` and `width` value, you can use the `layout="fill"` prop. This makes the image responsive and take up the size of the parent HTML element.

However, keep in mind, using the `height` and `width` attribute does not mean the image will not be responsive. It will keep the same aspect ratio according to the provided `height` and `width` prop values. <strong>Make sure to prefix your `src` prop with a `/` or it will not interpret your image from the `public/` folder!</strong>

Now take a look at your application and there you have it! Your image is now in a WebP format and it lazy loads.

## **What About Images From External Sources?**

Now let's see how this Next.js <code> &lt;Image /&gt;</code> component behaves when I pass in an external image source that comes from <a href="https://picsum.photos/">https://picsum.photos/</a>. I will use the following `src` value: `https://picsum.photos/200/300`.

My `/pages/index.js` file now looks like the following:

```typescript
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Image
        src='https://picsum.photos/200/300'
        alt='my image'
        height='300'
        width='200'
      />
    </>
  );
}
```

Now, let's have a look at our application at <a href="http://localhost:3000">http://localhost:3000</a>.

![external-src-err](images/nextjs-image/external-src-err.webp)

<strong>Uh-oh! We ran into an error, but what exactly happened?</strong>

We get the following error message:

<code>
Error: Invalid src prop (https://picsum.photos/200/300) on `next/image`, hostname "picsum.photos" is not configured under images in your `next.config.js`
</code>

To use the <code> &lt;Image /&gt;</code> component with an external image source, Vercel requires us to configure the allowed domains explicitly in order to ensure that external URLs are not abused. Let's now configure our domain for our images.

In our project's root directory (outside of `pages/` and next to the `package.json`), create a file named `next.config.js`. Populate this file with the following:

```js
module.exports = {
  images: {
    domains: ['picsum.photos'],
  },
};
```

I knew the hostname needed was exactly `picsum.photos` due to the simple fact that the error messaged mentioned it! Also, since the domains attribute is an array, you can pass in multiple domains, thereby giving us the ability to use multiple external resources for images.

Now, my application looks like the following:

![app](images/nextjs-image/app.webp)

It worked! It fetched the image properly.

## **Performance Details**

Let's have a look at the specific performance features Vercel promised us. I will open my developer tab and go into the <em>Network</em> tab. Let's look for the network request for the external image source:

![app-analysis](images/nextjs-image/app-analysis.webp)

Amazing! Our image was indeed converted to the WebP format and the image is only roughly 13kB! Furthermore, lazy loading is also present, although it will be not demonstrated for the sake of keeping this article concise.

## **About Me**

My name is QJ and I am a software engineer from Montreal, Canada. I work mainly as a fullstack web developer, but I am also passionate about other subjects. If you found this article useful, you can support me by following me on <a href="https://github.com/qjimmy">Github <strong>(@qjimmy)</strong></a> and <a href="https://twitter.com/qjnguyen">Twitter <strong>(@qjnguyen)</strong></a>. Please also consider sharing this article with anyone who might need it!
