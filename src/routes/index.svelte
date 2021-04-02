<script context="module">
  export async function preload() {
    const response = await this.fetch("blog.json")
    const postsData = await response.json()
    const posts = postsData.sort((a,b) => new Date(b.date) - new Date(a.date))
    
    return  { posts }
  }
</script>

<script>
  import { IntersectionObserver, BlogCard, Hero } from '../components'

  export let posts;

  let currentlyShownPosts = posts.slice(0, 2);

  let element;
  let intersecting;
  let lastLoadedIndex = 2;

  $: if (intersecting) {
    lastLoadedIndex = lastLoadedIndex + 2;
    currentlyShownPosts = posts.slice(0, lastLoadedIndex);
  }
</script>

<svelte:head>
  <title>Frontend Devops</title>
  <meta
    name="description"
    content="Tutorials on the latest trend in DevOps for Web Development" />
  <meta
    name="keywords"
    content="HTML, Vercel, JavaScript, GraphQL, Typescript, DevOps, CI/CD" />
  <meta name="author" content="Guillaume Bibeau-Laviolette" />
</svelte:head>

<Hero />

<main class="articlesContent">

  {#each currentlyShownPosts as post}
    <BlogCard {...post} />
  {/each}

</main>
<IntersectionObserver {element} bind:intersecting>
  <div bind:this={element}>
    {#if intersecting && currentlyShownPosts.length !== posts.length}
      Loading...
    {/if}
  </div>
</IntersectionObserver>


<style>

p {
    margin: 1em auto;
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