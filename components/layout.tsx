import { ReactElement } from "react";
import Image from "next/image";

export default function Layout({ children }): ReactElement {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="container mx-auto flex-1">{children}</main>
    </div>
  );
}
