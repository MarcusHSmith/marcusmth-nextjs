import { ReactElement } from "react";
import { PageShell } from "../PageShell/PageShell";

interface IProps {
  children: ReactElement;
}

export function HomeLayout({ children }: IProps): ReactElement {
  return <PageShell>{children}</PageShell>;
}
