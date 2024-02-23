import Link from "next/link";
import Image from "next/image";
import { ReactElement, useMemo } from "react";
import { FULL_NAME } from "../../utils/constants";
import { useRouter } from "next/router";

interface IProps {
  presentation: "min" | "full";
}

export function HeaderBio({
  presentation: presentation = "full",
}: IProps): ReactElement {
  const router = useRouter();
  const homeLink = useMemo(() => {
    const homeText = <strong>{FULL_NAME}</strong>;
    if (router.pathname === "/") {
      return homeText;
    }
    return <Link href={`/`}>{homeText}</Link>;
  }, [router]);
  const rightContent = useMemo(() => {
    switch (presentation) {
      case "min":
        return (
          <div>
            <span>{homeLink}</span>
            <InternalLinks />
          </div>
        );
      case "full":
        return (
          <div>
            <span>
              {homeLink} lives and works in New York City. He is a software
              engineer focused on iOS and React development. This is used as a
              repository for information learned and utilized.
            </span>
            <InternalLinks />
            <ExternalLinks />
          </div>
        );
    }
  }, [presentation, homeLink]);

  return (
    <div className="flex gap-2 min-w-[50px] m-4">
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
      {router.pathname !== "/blog" && (
        <Link href={`/blog`}>
          <span>Posts</span>
        </Link>
      )}
      {router.pathname !== "/cheatsheet" && (
        <Link href={`/cheatsheet`}>
          <span>Cheatsheets</span>
        </Link>
      )}
    </div>
  );
}

function ExternalLinks(): ReactElement {
  return (
    <div className="flex flex-wrap gap-2">
      <CustomLink
        url={`https://www.youtube.com/channel/UCzLPnJlM_5IEe2djVMB2jLA`}
        text={`Youtube`}
      />
      <CustomLink
        url={`https://www.instagram.com/marcusmth`}
        text={`Instagram`}
      />
      <CustomLink url={`https://twitter.com/marcusmth`} text={`Twitter`} />
      <CustomLink
        url={`https://stackoverflow.com/users/2228688/marcus`}
        text={`Stack Overflow`}
      />
      <CustomLink
        url={`https://www.linkedin.com/in/marcushsmith/`}
        text={`LinkedIn`}
      />
      <CustomLink
        url={`https://www.strava.com/athletes/9512`}
        text={`Strava`}
      />
      <CustomLink
        url={`https://goo.gl/maps/QSQCaP3AMVgakqHo7`}
        text={`Local Guide`}
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
