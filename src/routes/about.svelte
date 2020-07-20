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
  .fa-linkedin {
    background: #007bb5;
    color: white;
    margin-right: 10px;
  }

  .socials {
    display: flex;
    justify-content: center;
  }
</style>

<svelte:head>
  <title>About Frontend Devops</title>
</svelte:head>
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
<h2>I am a DevOps and Web developer with a weird mix of passions!</h2>

<p>
  My goal is to help people get started with the simplest and most
  cost-effective setups for their projects! Most tutorials and posts here will
  go straight to the point and are meant to give quick simple solutions to
  common problems developers are facing everyday!
</p>
<br />

<address class="socials">
  <a
    href="https://www.linkedin.com/in/guillaume-bibeau-laviolette/"
    class="fa fa-linkedin" />
  <a href="https://github.com/gbibeaul" class="fa fa-github" />
</address>
