import Head from "next/head";
import Link from "next/link";

export default function ResumePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Marcus Smith",
    jobTitle: "Software Engineering Manager",
    url: "https://www.marcusmth.com/about/resume/engineering-manager",
    sameAs: [
      "https://github.com/marcusmth",
      "https://twitter.com/marcusmth",
      "https://www.linkedin.com/in/marcushsmith/",
    ],
    image: "https://www.marcusmth.com/images/profile-pic-marcus.jpg",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Los Angeles",
      addressRegion: "CA",
    },
    alumniOf: {
      "@type": "Organization",
      name: "UC Berkeley",
    },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Head>
        <title>
          Marcus Smith - Software Engineering Manager Resume | www.marcusmth.com
        </title>
        <meta
          name="description"
          content="Professional resume of Marcus Smith, Software Engineering Manager with 9+ years of engineering experience and 3.5 years of engineering management experience."
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div className="mb-6">
        <Link
          href="/about"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          ← Back to About
        </Link>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Marcus Smith
          </h1>
          <h2 className="text-xl text-gray-700 mb-4">
            Software Engineering Manager
          </h2>
          <p className="text-gray-600">Los Angeles, CA</p>
        </header>

        <section className="mb-8">
          <p className="text-gray-700 leading-relaxed">
            Engineering Manager with 9+ years of engineering experience and 3.5
            years of engineering management experience scaling full-stack teams.
            I bring a strong technical foundation in ExpressJs and NextJs
            combined with a proven track record of leading teams through
            ambiguity, mentoring engineers, and shipping products quickly. I
            thrive when I&apos;m aligning engineering with product strategy and
            creating a culture of ownership, feedback, and high output.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-gray-300 pb-2">
            Professional Experience
          </h3>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-lg font-semibold text-gray-800">
                  Software Engineering Manager, Meta
                </h4>
                <span className="text-gray-600">September 2025 - Present</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-lg font-semibold text-gray-800">
                  Co-founder & CTO, Tapestry
                </h4>
                <span className="text-gray-600">2021 - 2025</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-lg font-semibold text-gray-800">
                  Software Engineer (iOS + Full Stack), TryFi
                </h4>
                <span className="text-gray-600">2019 - 2021</span>
              </div>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>
                  Built services to communicate with lost dog collars in poor
                  network conditions. This was vital in locating 20,000+ lost
                  pets using GPS, Wifi and Bluetooth.
                </li>
                <li>
                  Led development of Instagram for Dogs social features, growing
                  to 5,000+ active dogs with 4.6-star App Store rating.
                </li>
                <li>
                  Partnered with Designers and Product Managers to A/B test
                  features and iterate on product-market fit.
                </li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-lg font-semibold text-gray-800">
                  Associate Software Engineer, Goldman Sachs
                </h4>
                <span className="text-gray-600">2018 - 2019</span>
              </div>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>
                  Developed a matching platform connecting asset managers with
                  fund managers, facilitating billions of dollars in
                  investments.
                </li>
                <li>
                  Collaborated with senior engineers on architectural decisions
                  for mission-critical securities data.
                </li>
                <li>
                  Mentored junior engineers, providing technical guidance and
                  code reviews to contribute to their growth.
                </li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-lg font-semibold text-gray-800">
                  Software Engineer (iOS + Android), Snap
                </h4>
                <span className="text-gray-600">2016 - 2018</span>
              </div>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Contributed to iOS development for Discover redesign.</li>
                <li>
                  Built and launched Group Stories for Android, enabling
                  collaborative content creation and achieving 100M+ MAU in the
                  first 3 months.
                </li>
                <li>
                  Improved network bandwidth with checksums to communicate
                  existing data between client and server.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-gray-300 pb-2">
            Education
          </h3>
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-semibold text-gray-800">UC Berkeley</h4>
            <span className="text-gray-600">2012 - 2016</span>
          </div>
          <p className="text-gray-700">B.S. Computer Science</p>
        </section>

        <section>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-gray-300 pb-2">
            Skills
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                Languages & Frameworks
              </h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Express.js</li>
                <li>Next.js</li>
                <li>TypeScript</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                Infrastructure & Tools
              </h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Vercel</li>
                <li>Redis</li>
                <li>Linear</li>
                <li>GitHub</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                Specializations
              </h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Full-Stack Architecture</li>
                <li>Graph Databases (Neo4j + Cypher)</li>
                <li>Blockchain Development</li>
                <li>Mobile Development (iOS/Android)</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
