<script>
  export let title;
  export let caption;
  export let date;
  export let tags;
  export let image;
  export let slug;

  console.log(slug);
</script>

<style>
  @import url("https://fonts.googleapis.com/css?family=Heebo:400,700|Open+Sans:400,700");

  :root {
    --color: #3c3163;
    --transition-time: 0.5s;
  }

  * {
    box-sizing: border-box;
  }

  a {
    color: inherit;
  }

  .card {
    font-family: "Heebo";
    --bg-filter-opacity: 0.5;
    background-image: linear-gradient(
        rgba(0, 0, 0, var(--bg-filter-opacity)),
        rgba(0, 0, 0, var(--bg-filter-opacity))
      ),
      var(--bg-img);
    height: 20em;
    width: 15em;
    font-size: 1.5em;
    color: white;
    border-radius: 1em;
    padding: 1em;
    display: flex;
    align-items: flex-end;
    background-size: cover;
    background-position: center;
    transition: all, var(--transition-time);
    position: relative;
    overflow: hidden;
    border: 10px solid #ccc;
    text-decoration: none;
  }

  .card:hover {
    transform: rotate(0);
  }

  .card h1 {
    margin: 0;
    font-size: 1.5em;
    line-height: 1.2em;
  }

  .card p {
    font-size: 0.75em;
    font-family: "Open Sans";
    margin-top: 0.5em;
    line-height: 2em;
  }

  .card .tags {
    display: flex;
  }

  .card .tags .tag {
    font-size: 0.75em;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 0.3rem;
    padding: 0 0.5em;
    margin-right: 0.5em;
    line-height: 1.5em;
    transition: all, var(--transition-time);
  }

  .card:hover .tags .tag {
    background: var(--color);
    color: white;
  }

  .card .date {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 0.75em;
    padding: 1em;
    line-height: 1em;
    opacity: 0.8;
  }

  .card:before,
  .card:after {
    content: "";
    transform: scale(0);
    transform-origin: top left;
    border-radius: 50%;
    position: absolute;
    left: -50%;
    top: -50%;
    z-index: -5;
    transition: all, var(--transition-time);
    transition-timing-function: ease-in-out;
  }

  .card:before {
    background: #ddd;
    width: 250%;
    height: 250%;
  }

  .card:after {
    background: white;
    width: 200%;
    height: 200%;
  }

  .card:hover {
    color: var(--color);
  }

  .card:hover:before,
  .card:hover:after {
    transform: scale(1);
  }

  .card-grid-space {
    margin-bottom: 1rem;
  }
</style>

<div class="card-grid-space">
  <a
    class="card"
    rel="prefetch"
    style="background-image: url({image});"
    href="blog/{slug}">
    <div>
      <h1>{title}</h1>
      <p>{caption}</p>
      <div class="date">{date}</div>
      <div class="tags">
        {#each tags as tag}
          <div class="tag">{tag}</div>
        {/each}
      </div>
    </div>
  </a>
</div>
