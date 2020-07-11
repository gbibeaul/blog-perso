<script>
  import {
    HackerNews,
    Reddit,
    LinkedIn,
    Pinterest,
    Telegram,
    Tumblr,
    Vk,
    WhatsApp,
    Xing,
    Facebook,
    Twitter
  } from "svelte-share-buttons-component";

  export let url;
  export let title;
</script>

<style>
  .social-share {
    margin-bottom: 15px;
  }
</style>

<section class="social-share">
  <Reddit class="share-button" {title} {url} />
  <LinkedIn class="share-button" {url} />
  <Facebook class="share-button" {url} />
  <Twitter class="share-button" text={title} {url} />
</section>
