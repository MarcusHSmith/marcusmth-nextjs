# Marcus Smith's Personal Website

A modern, content-rich personal website built with Next.js, featuring software engineering insights, YouTube content creation guides, and comprehensive cheatsheets for developers.

🌐 **Live Site**: [https://www.marcusmth.com](https://www.marcusmth.com)

## About the Site

This is the personal website of Marcus Smith, a software engineer and content creator. The site serves as a comprehensive resource hub covering:

- **Software Engineering Blog**: Technical articles on iOS development, web technologies, and software engineering best practices
- **YouTube Content Creation**: Guides on monetization, equipment, and content creation strategies
- **Developer Cheatsheets**: Quick reference guides for various technologies and tools
- **WeWork Location Reviews**: Detailed guides for WeWork offices in Berlin and Paris
- **Drone Photography**: Aerial photography content from various locations

## Tech Stack

### Core Technologies

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React 18** - UI library

### Content Management

- **Markdown** - Content authoring with frontmatter
- **gray-matter** - Frontmatter parsing
- **markdown-it** - Markdown processing
- **mdx-bundler** - MDX support

### Additional Features

- **Mapbox GL** - Interactive maps for location content
- **Embla Carousel** - Touch-friendly carousel components
- **Vercel Analytics** - Performance and user analytics
- **RSS Feed** - Content syndication
- **Sitemap Generation** - SEO optimization

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Bundle Analyzer** - Performance optimization

## Project Structure

```
marcusmth-nextjs/
├── components/          # Reusable React components
│   ├── HomeLayout/     # Main layout component
│   ├── PostList/       # Blog post listing
│   ├── PostContent/    # Individual post rendering
│   ├── MapBox/         # Interactive map components
│   └── ...
├── content/            # Markdown content
│   ├── blog/          # Software engineering articles
│   ├── cheatsheet/    # Developer reference guides
│   └── drone/         # Aerial photography content
├── pages/             # Next.js pages and API routes
│   ├── api/           # API endpoints (sitemaps, RSS)
│   ├── blog/          # Blog listing and individual posts
│   ├── cheatsheet/    # Cheatsheet listing and individual guides
│   └── reports/       # WeWork location guides
├── lib/               # Utility functions and interfaces
├── public/            # Static assets
└── styles/            # Global styles and CSS modules
```

## Key Features

### Content Organization

- **Blog Posts**: Technical articles on iOS development, web technologies, and software engineering
- **Cheatsheets**: Quick reference guides for tools like Git, TypeScript, SwiftUI, and more
- **Location Guides**: Detailed WeWork office reviews for Berlin and Paris
- **Drone Content**: Aerial photography from various global locations

### SEO & Performance

- **Static Site Generation** - Fast loading with pre-rendered pages
- **Dynamic Sitemaps** - Automated sitemap generation for all content types
- **RSS Feeds** - Content syndication for subscribers
- **Structured Data** - JSON-LD markup for search engines
- **Meta Tags** - Comprehensive SEO optimization

### User Experience

- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Interactive Maps** - Mapbox integration for location-based content
- **Carousel Components** - Touch-friendly image galleries
- **Fast Navigation** - Optimized routing and page transitions

## Getting Started

### Prerequisites

- Node.js 18+
- Yarn or npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/marcusmth/marcusmth-nextjs.git
cd marcusmth-nextjs
```

2. Install dependencies:

```bash
yarn install
# or
npm install
```

3. Run the development server:

```bash
yarn dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint with auto-fix
- `yarn format` - Format code with Prettier
- `yarn fix` - Run both format and lint

## Content Management

### Adding Blog Posts

1. Create a new `.md` file in `content/blog/`
2. Add frontmatter with title, date, description, and tags
3. Write content in Markdown format
4. The post will automatically appear in the blog listing

### Adding Cheatsheets

1. Create a new `.md` file in `content/cheatsheet/`
2. Add frontmatter with title and description
3. Write reference content in Markdown format
4. The cheatsheet will appear in the cheatsheet listing

### Adding Drone Content

1. Create a new `.md` file in `content/drone/`
2. Add frontmatter with location details
3. Include image references and descriptions
4. Content will be available in the drone section

## Deployment

The site is deployed on **Vercel** with the following features:

- **Automatic Deployments** - Connected to GitHub repository
- **HTTPS Redirects** - Secure connections enforced
- **WWW Redirects** - Canonical URL handling
- **Performance Optimization** - Edge caching and CDN

## Contributing

This is a personal website, but suggestions and feedback are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is private and not licensed for public use.

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
