<script context="module">
  export function preload({ params, query }) {
    return this.fetch(`blog.json`)
      .then(r => r.json())
      .then(posts => {
        const awsPosts = [];
        const vercelPosts = [];
        const ciCdPosts = [];
        const reactPosts = [];

        posts.forEach(post => {
          switch (post.category) {
            case "ci-cd":
              ciCdPosts.push(post);
              break;
            case "next-vercel":
              vercelPosts.push(post);
              break;
            case "aws":
              awsPosts.push(post);
              break;
            case "react":
              reactPosts.push(post);
            default:
              break;
          }
        });

        return { awsPosts, vercelPosts, ciCdPosts, reactPosts };
      });
  }
</script>

<script>
  import BlogCard from "../components/BlogCard.svelte";
  export let vercelPosts;
  export let awsPosts;
  export let ciCdPosts;
  export let reactPosts;
</script>

<style>
  h1,
  figure {
    text-align: center;
    margin: 0 auto;
  }

  h1 {
    font-size: 2.8em;
    text-transform: uppercase;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }

  .post-fig-container {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
  }

  figure {
    margin: 0 0 1em 0;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }

  .articlesContent {
    display: flex;
    flex-wrap: wrap;
  }

  @media only screen and (max-width: 600px) {
    .articlesContent {
      justify-content: center;
    }
  }

  @media only screen and (min-width: 600px) {
    .articlesContent {
      justify-content: space-between;
    }
  }
</style>

<svelte:head>
  <Head />
  <title>Frontend Devops</title>
  <meta
    name="description"
    content="Tutorials on the latest trend in DevOps for Web Development" />
  <meta
    name="keywords"
    content="HTML, Vercel, JavaScript, GraphQL, Typescript, DevOps, CI/CD" />
  <meta name="author" content="Guillaume Bibeau-Laviolette" />
</svelte:head>

<h1>Posts</h1>

<figure>
  <figcaption class="post-fig-container">
    <h2>Next.js / Vercel</h2>
    <h2>{`${vercelPosts.length} posts`}</h2>
  </figcaption>
</figure>

<main class="articlesContent">
  {#each vercelPosts as vercelPost}
    <BlogCard {...vercelPost} />
  {/each}
</main>

<figure>
  <figcaption class="post-fig-container">
    <h2>AWS</h2>
    <h2>{`${awsPosts.length} post`}</h2>
  </figcaption>
</figure>

<main class="articlesContent">
  {#each awsPosts as awsPost}
    <BlogCard {...awsPost} />
  {/each}
</main>

<figure>
  <figcaption class="post-fig-container">
    <h2>CI/CD</h2>
    <h2>{`${ciCdPosts.length} posts`}</h2>
  </figcaption>
</figure>

<main class="articlesContent">
  {#each ciCdPosts as ciCdPost}
    <BlogCard {...ciCdPost} />
  {/each}
</main>

<figure>
  <figcaption class="post-fig-container">
    <h2>React</h2>
    <h2>{`${reactPosts.length} posts`}</h2>
  </figcaption>
</figure>

<main class="articlesContent">
  {#each reactPosts as reactPost}
    <BlogCard {...reactPost} />
  {/each}
</main>
