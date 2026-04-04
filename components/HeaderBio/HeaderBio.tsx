import Image from "next/image";
import Link from "next/link";
import { ReactElement, useMemo } from "react";
import { FULL_NAME } from "../../utils/constants";
import { useRouter } from "next/router";

interface IProps {
  presentation: "min" | "full";
}

export function HeaderBio({
  presentation: presentation = "full",
}: IProps): ReactElement {
  const rightContent = useMemo(() => {
    switch (presentation) {
      case "min":
        return (
          <div>
            <span>
              <strong>{FULL_NAME}</strong>
            </span>
            <InternalLinks />
          </div>
        );
      case "full":
        return (
          <div>
            <span>
              <strong>{FULL_NAME}</strong> spends his time at WeWorks. He is a
              software engineer focused on iOS and React development. This is
              used as a repository for information learned and utilized.
            </span>
            <InternalLinks />
          </div>
        );
    }
  }, [presentation]);

  return (
    <div className="mb-8 flex min-w-[50px] gap-3">
      <div className="h-[50px] -[50px] flex-none">
        <Image
          src={"/images/profile-pic-marcus.jpg"}
          alt={FULL_NAME}
          width={50}
          height={50}
          className="rounded-full"
        />
      </div>
      <div>{rightContent}</div>
    </div>
  );
}

function InternalLinks(): ReactElement {
  const router = useRouter();
  return (
    <div className="flex gap-2 mb-2">
      {router.pathname !== "/" && (
        <Link
          href={`/`}
          className="no-underline hover:no-underline focus:no-underline"
        >
          <span>Posts</span>
        </Link>
      )}
      {router.pathname !== "/cheatsheet" && (
        <Link
          href={`/cheatsheet`}
          className="no-underline hover:no-underline focus:no-underline"
        >
          <span>Cheatsheets</span>
        </Link>
      )}
      {router.pathname !== "/about" && (
        <Link
          href={`/about`}
          className="no-underline hover:no-underline focus:no-underline"
        >
          <span>About Marcus</span>
        </Link>
      )}
    </div>
  );
}
