---
slug: supabase-react-part-1
category: react
title: Let's use Supabase, the open-source Firebase alternative!
caption: Back-end as a service has a new kid on the block!
date: "February 27, 2021"
tags: ["React", "Supabase", "Serverless"]
image: "images/supabase-react-part-1/massimiliano-corradini-acswBJsecx8-unsplash.jpg"
---

#### **Reduce complexity by using Supabase!**

![Abstract image](images/supabase-react-part-1/massimiliano-corradini-acswBJsecx8-unsplash.jpg)

Recently I have been using Firebase almost exclusively as my database and
authentication provider. Their optimistic updates are great and it makes
authentication a breeze! As much as I love this service, there comes a time when
we need to explore alternatives. There are some key points we should be looking
for when choosing a backend provider.

- Good documentation: This is key since you will build all your abstractions on
  top of their systems
- Authentication: While using Auth0 would be an option, I prefer on a freelance
  project to keep 1 provider for easier maintenance
- Typescripts Types: Most would not bother with this but having great types
  makes building a product on top of a provider faster!
- Easy Database Management: I like flexible databases that can scale without
  spending too much time in menus or configuring read-write replicas.

Now that we have laid out some key things to look for let's explore some
firebase alternatives.

## AWS Amplify

AWS is great! They are a pioneer of cloud services and they have a service for
everything. Their backend replacement service is Amplify. This service acts as
an aggregator of other services. They have put a lot of work into making it a
great product over the years. However, after giving it a lot of tries I am often
left confused by all the available options.

They are working hard on all the services but I still have difficulty in getting
started quickly when using Amplify. I often prefer to go back to using the
traditional AWS SDK for most of the services they offer.

## New Contender: Supabase!

Lately, I have been spending some time on Twitter following Supabase and its
founders. I have taken an interest when realized they were building the complete
platform in an open-source fashion! Open-source is important! It gives drives
innovation forward constantly. In essence, Supabase built an orchestration SDK
and console around different open-source services. In this first post we'll dive
in a little bit and see how we can use it as a back-end replacement service.

<br/>

### **What We Will be Using**

For the content of this series, we will be using
[this repo](https://github.com/lavilabs/supabase-auth-template). This repo
contains an example of using Supabase with React. You can follow along by
registering for the [Supabase beta here](https://supabase.io/). In this first
post, we will explore Supabase authentication and its documentation.

### Getting the Supabase client.

Getting the Supabase client hooked up in React is super easy! I have decided to
do it with the use of a React context after it is initialized. Inside
`supabase-modules.ts` we initialize the client like explained
[here in the documentation](https://supabase.io/docs/client/initializing). You
can find your `supabase-url` and `public-anon-key` in the Supabase dashboard.

```ts
import { createClient } from "@supabase/supabase-js";

// replace your keys accordingly
export const supabase = createClient("supabase-url", "public-anon-key");
```

The next thing I did is to create a context that makes the Supabase Client and
authentication available to React components. Let's explore a little bit how
this was done:

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

The first thing we do is to create a strongly typed React Context. This context
will serve as the base to make our Supabase client and authenticated user to
components later on. This is a great way to build some abstraction around
Supabase but you could use the client directly in your components if you
desired. Let's see now how we can create a Context Provider to make this
available to our components:

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
  document.getElementById("root"),
);
```

Ouf! This was a lot of code but we now have a really nice context that will be
the base of our interactions with Supabase. This approach uses a mix of the
Supabase SDK with regular React features. It will also let us create

### Custom hooks

Obviously, a having a context means that we can now create nice custom hooks to
avoid repeating code! Let's create two new functions in our context files. The
first one will be a hook to use Supabase directly inside a react component
without having to set up the client.

```ts
export const useSupabase = () => {
  const context = React.useContext(SupabaseContext);

  if (context === undefined) {
    throw new Error(
      "useSupabase must be used within a SupabaseContext.Provider",
    );
  }

  return context.sb;
};
```

This hook will take care of consuming the SupabaseContext and will return
directly the client. This pattern might have been familiar to you if you have
used Apollo client. You can use it to easily get access to the Supabase client
in your components like this:

```ts
const supabase = useSupabase();
```

While this provides for a great developer experience, we could probably use a
similar hook for authentication! Let's add a new hook under the one we exported
above:

```ts
export const useUser = () => {
  const context = React.useContext(SupabaseContext);

  if (context === undefined) {
    throw new Error(
      "useSupabase must be used within a SupabaseContext.Provider",
    );
  }

  return context.user;
};
```

This is mostly the same concept as useSupabase but will give you directly inside
a react component access to your user. Although we could be doing this directly
with the Supabase client this gives us a nice centralized abstraction! Let's see
a super example of this coming together in a mini signup page!

```ts
import React from "react";
import { useSupabase, useUser } from "./context/supabaseContext";

const Signup = () => {
  const supabase = useSupabase();
  const user = useUser();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await supabase.auth.signUp({ email, password });
    await supabase.auth.signIn({ email, password });
  };

  if (user) {
    return (
      <div>
        <h1>Hello {user.email}</h1>
        <button onClick={() => supabase.auth.signOut()}>signout</button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleRegister}
      >
        <h1>Register</h1>
        email
        <input
          required
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        password
        <input
          required
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Signup;
```

### Wrapping up!

This post is meant to be the first exploration into the world of Supabase! This
blog is all about simplifying operations. On this topic, I think it's fair to
say that Supabase passes this test with flying colours! I will gradually expand
on this topic in a series of posts where we will talk about operations on
Supabase!

[@contrariancoder](https://twitter.com/contrariancoder) on Twitter for any
questions!
