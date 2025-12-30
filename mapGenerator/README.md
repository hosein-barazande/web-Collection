# Sitemap Generator

This project is a simple and efficient tool for generating **sitemaps** of web pages.  
By entering the URL of a page, the tool crawls all images on that page and produces an XML file following the standard sitemap format.

## Features

- Crawl web pages with support for images.
- Generate standard XML sitemap files.
- Simple and modern user interface built with **React and Next.js**.
- Ability to copy the sitemap content to the clipboard.
- Modern UX with attractive, full-width styling.

## Usage

1. Clone the repository:
   ```bash
[   git clone <repository-url>
](https://github.com/hosein-barazande/web-Collection/edit/main/mapGenerator)

2.Install dependencies:
pnpm install
or using npm:
npm install

3.Run the development server:
pnpm dev

4.Open your browser and go to http://localhost:3000, enter the page URL, and generate the sitemap.

Project Structure

SitemapGenerator.tsx → Main UI component.

SitemapGenerator.module.css → CSS module for component styling.

app/crawl/route.ts → API route handling the crawling process.

License

This project is free for personal and educational use.

For more information and web services, visit our website: https://digitizerco.net
