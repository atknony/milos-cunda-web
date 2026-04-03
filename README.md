# Milos Cunda

A modern, fast, and multilingual (Turkish, English, Greek) web project developed for the Milos Cunda boutique hotel. Built with Astro v5 and Tailwind CSS utilizing a static site generation (SSG) architecture. It offers a minimalist and accessible interface aligned with the "quiet luxury" concept.

## Installation and Execution

Follow the steps below to run the project in your local environment. Node.js must be installed on your system.

1. Clone the project to your local machine:
    git clone https://github.com/atknony/milos-cunda-web

2. Navigate to the project directory:
    cd milos-cunda-web

3. Install the required dependencies:
    npm install

4. Start the development server:
    npm run dev

Once the terminal process is complete, you can view the project by navigating to `http://localhost:4321` in your browser.

## Our Approach to SEO and GEO Architecture

Our application features a technical infrastructure designed to perform optimally in search engines and regional searches:

* **Multilingual Indexing (Hreflang):** The three language options are explicitly communicated to search engines via `hreflang` tags, ensuring users are accurately directed to the corresponding localized pages.
* **Semantic Data (JSON-LD):** Pages are structured not only as HTML documents but also as data objects (Hotel, Restaurant, Landmark) based on Schema.org standards, enabling search engines to generate "Rich Results".
* **Local SEO (GEO):** Location and entity data specific to Cunda Island and the Ayvalık region are embedded within the markup, enhancing the establishment's domain authority for regional tourism and hospitality queries.
* **High Performance (SSG):** Since all pages are pre-rendered during the build phase, server response times are minimized to milliseconds, ensuring top scores in Google Core Web Vitals metrics.