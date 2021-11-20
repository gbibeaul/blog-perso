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

<svelte:head>
  <title>About Frontend Devops</title>
</svelte:head>
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
<h2>My name is Guillaume, I am a Web developer with a passion for experimenting and finding solutions!</h2>

<p>
  My goal with this blog is to help people get started with the simplest and most cost-effective setups for their projects! 
  Most tutorials and posts here will go straight to the point
  and are meant to give quick simple solutions to common problems developers are facing everyday!
</p>
<br />

<section class="socials-container">
  <div class="person-container">
    <h2><b>Connect with me!</b></h2>
    <address class="socials">
      <a href="https://github.com/gbibeaul" class="fa fa-github" />
      <a
      href="https://twitter.com/contrariancoder"
      class="fa fa-twitter" />
    </address>
  </div>
</section>