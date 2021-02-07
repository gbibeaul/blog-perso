<script context="module">
  export function preload({ params, query }) {
    return this.fetch(`blog.json`)
      .then(r => r.json())
      .then(posts => {
        return { posts };
      });
  }
</script>

<script>
  import Head from "../components/head.svelte";
  import BlogCard from "../components/BlogCard.svelte";
  import IntersectionObserver from "../components/InterserctionObserver.svelte";

  export let posts;

  let currentlyShownPosts = posts.slice(0, 2);

  let element;
  let intersecting;
  let lastLoadedIndex = 2;
  let searchInput = "";

  $: if (intersecting) {
    lastLoadedIndex = lastLoadedIndex + 2;
    currentlyShownPosts = posts.slice(0, lastLoadedIndex);
  }

  $: console.log(searchInput)
  
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
  figure {
    margin: 0 0 2em 0;
  }
  p {
    margin: 1em auto;
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

<Head />

<h1>Recent articles</h1>

<figure>
  <figcaption>The most recent trends in Web Devops practices!</figcaption>
</figure>

<input type="text" bind:value={searchInput} />
{searchInput}
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
