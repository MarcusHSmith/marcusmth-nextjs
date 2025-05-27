import { ReactElement } from "react";
import Image from "next/image";

export default function Layout({ children }): ReactElement {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="container mx-auto flex-1">{children}</main>
      <footer className="mt-12 py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <Image
              src="/images/cc-by.png"
              alt="Creative Commons Attribution License"
              width={88}
              height={31}
              className="inline-block"
            />
            <p>
              © {new Date().getFullYear()} by Marcus Smith. Except where
              otherwise noted, content on this site is licensed under a{" "}
              <a
                href="https://creativecommons.org/licenses/by/4.0/"
                target="_blank"
                rel="license noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                Creative Commons Attribution 4.0 International License
              </a>
              .
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
