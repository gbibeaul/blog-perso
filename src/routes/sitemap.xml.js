const fs = require("fs");

// set base url
const BASE_URL = "https://www.frontend-devops.com";

// get all blog posts
const routes = fs
  .readdirSync("./content")
  .map((route) => route.slice(0, route.indexOf(".")));

//  render the sitemap xml
const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    <url>
        <loc>${BASE_URL}</loc>
    </url>
    <url>
        <loc>${BASE_URL}/about</loc>
    </url>
    <url>
        <loc>${BASE_URL}/blog</loc>
    </url>
    ${routes.map(
      (route) => `
    <url>
        <loc>${BASE_URL}/blog/${route}</loc>
    </url>    
    `
    )}
    </urlset>
`;

export function get(req, res) {
  res.setHeader("Cache-Control", `max-age=0, s-max-age=${600}`); // 10 minutes
  res.setHeader("Content-Type", "application/rss+xml");

  res.end(xml);
}
