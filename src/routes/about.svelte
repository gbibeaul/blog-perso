<script>
  import Head from "../components/Head.svelte";
</script>

<style>
  /* Style all font awesome icons */
  .fa {
    padding: 20px;
    font-size: 30px;
    width: 50px;
    text-align: center;
    text-decoration: none;
  }

  /* Add a hover effect if you want */
  .fa:hover {
    opacity: 0.7;
  }

  /* Set a specific color for each brand */

  /* Facebook */
  .fa-github {
    background: black;
    color: white;
    margin-right: 10px;
  }

  /* Twitter */
  .fa-twitter {
    background: rgb(29, 161, 242);
    color: white;
    margin-right: 10px;
  }

  .socials {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 12px;
  }

  .socials-container {
    display: flex;
  }
</style>

<Head />

<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
<h2>
  We are the people behind
  <a target="_blank" href="https://lavilabs.io/">Lavi Labs Inc.</a>
  , a Web Agency dedicated to helping people with all their DevOps and Web
  Development needs.
</h2>

<p>
  Our goal with this blog is to help people get started with the simplest and
  most cost-effective setups for their projects! Most tutorials and posts here
  will go straight to the point and are meant to give quick simple solutions to
  common problems developers are facing everyday!
</p>
<br />

<section class="socials-container">
  <div class="person-container">
    <h2>
      <b>Guillaume</b>
    </h2>
    <address class="socials">
      <a href="https://github.com/gbibeaul" class="fa fa-github" />
      <a href="https://twitter.com/BibeauGuillaume" class="fa fa-twitter" />
    </address>
  </div>

  <div class="person-container">
    <h2>
      <b>QJ</b>
    </h2>
    <address class="socials">
      <a href="https://github.com/qjimmy" class="fa fa-github" />
      <a href="https://twitter.com/qjnguyen" class="fa fa-twitter" />
    </address>
  </div>
</section>
