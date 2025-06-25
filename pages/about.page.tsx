import { HeaderBio } from "../components/HeaderBio/HeaderBio";
import Head from "next/head";
import Link from "next/link";
import { ReactElement } from "react";

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Marcus Smith",
    url: "https://www.marcusmth.com",
    sameAs: ["https://github.com/marcusmth", "https://twitter.com/marcusmth"],
    jobTitle: "Software Engineer",
    image: "https://www.marcusmth.com/images/profile-pic-marcus.jpg",
  };

  function ExternalLinks(): ReactElement {
    return (
      <div className="flex flex-wrap gap-2">
        <CustomLink
          url={`https://www.youtube.com/channel/UCzLPnJlM_5IEe2djVMB2jLA`}
          text={`Youtube`}
        />
        <CustomLink url={`https://twitter.com/marcusmth`} text={`Twitter`} />
        <CustomLink
          url={`https://www.strava.com/athletes/9512`}
          text={`Strava`}
        />
      </div>
    );
  }

  function CustomLink({
    url,
    text,
  }: {
    url: string;
    text: string;
  }): ReactElement {
    return (
      <Link className="h-8 min-w-12 flex-item" href={url}>
        <p>{text}</p>
      </Link>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Head>
        <title>About Marcus Smith | www.marcusmth.com</title>
        <meta
          name="description"
          content="Learn more about Marcus Smith, a software engineer and content creator focused on technology and development."
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <HeaderBio presentation="min" />

      <div className="prose max-w-none">
        <h1 className="text-4xl font-bold">Hi, I&apos;m Marcus 👋</h1>

        <ExternalLinks />

        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="md:w-2/3">
            <p className="mb-4">
              I&apos;m a software engineer passionate about building products
              that make a difference. With a focus on web technologies and
              development best practices, I enjoy creating content that helps
              others learn and grow in their tech journey.
            </p>
            <p className="mb-4">
              Through www.marcusmth.com, I share my experiences, insights, and
              learnings about software development, tech entrepreneurship, and
              the ever-evolving world of technology.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">What I Do</h2>
            <p>
              I specialize in full-stack web development, with particular
              expertise in:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Building scalable web applications</li>
              <li>Next.js and React development</li>
              <li>Technical content creation</li>
              <li>Software architecture and best practices</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">My Mission</h2>
            <p>
              My goal is to share knowledge and experiences that help developers
              build better software and advance in their careers. Through my
              blog posts, tutorials, and projects, I aim to contribute to the
              tech community and help others learn from my experiences.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <p>
              I&apos;m always interested in connecting with fellow developers
              and tech enthusiasts. Whether you want to discuss a potential
              collaboration, have questions about my content, or just want to
              say hi, feel free to reach out through any of my social channels.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
