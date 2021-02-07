---
slug: supabase-react-part-1
category: react
title: Let's use Supabase, the open-source Firebase alternative!
caption: Back-end as a service has a new kid on the block!
date: "Sunday February 47th, 2021"
tags: ["React", "Supabase", "Serverless"]
image: "images/supabase-react-part-1/massimiliano-corradini-acswBJsecx8-unsplash.jpg"
---

#### **Reduce complexity by using Supabase!**

![Abstract image](images/supabase-react-part-1/massimiliano-corradini-acswBJsecx8-unsplash.jpg)

Recently I have been using Firebase almost exclusively as my database and authentication provider. There optimistic updates are great and it makes authentication a breeze! As much as I love this service, there comes a time when we need to explore alternatives. There are some key points we should be looking for when choosing a backend provider.

- Good documentatation: This is key since you will build all your abstractions on top of their systems
- Authentication: While using Auth0 would be an option, I prefer on freelance project to keep 1 provider for easier maintenance
- Typescripts Types: Most would not bother with this but having great types makes building a product on top of a provider faster!
- Easy Database Management: I like flexible databases that can scale without spending too much time in menus or configuring read-write replicas.

Now that we have laid out some key things to look for let's explore some firebase alternatives.

## AWS Amplify

AWS is great! They are a pioneer of cloud services and they have a service for everything. Their backend replacement service is Amplify. This service acts as an agregator of other services. They have put a lot of work into making it a great product over the years. However after giving it a lot of tries I am often left confused by all the available options.

They are working hard on all the services but I still have difficulty in getting started quickly when using Amplify. I often prefer to go back to using the traditional AWS SDK for most of the services they offer.

## New Contender: Supabase!

Lately I have been spending some time on Twitter following Supabase and it's founders. I have taken an interest when realized they were building the complete platform in an open-source fashion! Open-source is important! It gives drives innovation forward constantly. In essence, Supabase built a orchestration SDK and console around different open-source services. In this first post we'll dive in a little bit and see how we can use it as a back-end replacement service.

<br/>

### **What We Will be Using**

For the content of this series we will be using [this repo](https://github.com/lavilabs/supabase-auth-template). This repo contains an example of using Supabase with React. You can follow along by registering for the [Supabase beta here](https://supabase.io/). In this first first post we will explore Supabase authentication and it's documentation.

### Getting the supabase client.

Getting the Supabase client hookedup in React is super easy! I have decided to do it with the use of a React context after it is initialized. Inside `supabase-modules.ts` we initialize the clientm like explained [here in the documentation](https://supabase.io/docs/client/initializing). You can find your `supabase-url` and `public-anon-key` in the Supabase dashboard.

```ts
import { createClient } from "@supabase/supabase-js";

// replace your keys accordingly
export const supabase = createClient("supabase-url", "public-anon-key");
```

The next thing I did is to create a context that makes the Supabase Client and authentication available to React components. Let's explore a little bit how this was done:

```ts
import { SupabaseClient } from "@supabase/supabase-js";
import React from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../supabase-modules";

type SupabaseContextType = {
  sb: SupabaseClient;
  user: User | null;
};

export const SupabaseContext = React.createContext<SupabaseContextType>({
  sb: supabase,
  user: null,
});
```

The first thing we do is to create a strongly typed React Context. This context will serve as the base to make our Supabase client and authenticated user to components later on. This is a great way to built some abstraction around Supabase but you could totally use the client directly in your components if you desired. Let's see now how we can create a Context Provider to make this available to our components:

```ts
export const SupabaseContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    const user = supabase.auth.user();
    if (user) {
      setUser(user);
    }
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setUser(session?.user!);
      }
      if (event === "SIGNED_OUT") {
        setUser(null);
      }
    });
  }, []);

  return (
    <SupabaseContext.Provider value={{ user, sb: supabase }}>
      {children}
    </SupabaseContext.Provider>
  );
};
```

We will then wrap our `App` component in `index.tsx` in this consumer like this:

```ts
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { SupabaseContextProvider } from "./context/supabaseContext";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <SupabaseContextProvider>
      <App />
    </SupabaseContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
```

Ouf! This was a lot of code but we now have a really nice context that will be the base of our interactions with Supabase. This approach uses a mix of the Supabase SDK with regular React features. It will also let us create

### Custom hooks

Let's now create a `useUser` custom hook that will our users access to the authenticated
