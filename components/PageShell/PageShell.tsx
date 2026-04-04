import { ReactElement, ReactNode } from "react";
import { HeaderBio } from "../HeaderBio/HeaderBio";

interface IProps {
  children: ReactNode;
}

export function PageShell({ children }: IProps): ReactElement {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-0">
      <HeaderBio presentation="min" />
      {children}
    </div>
  );
}
