import { ReactElement } from "react";
import Image from "next/image";

export default function Layout({ children }): ReactElement {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="container mx-auto flex-1">{children}</main>
      <footer className="mt-12 py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <p>© {new Date().getFullYear()} Marcus Smith</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
