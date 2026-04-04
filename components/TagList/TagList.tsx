import { ReactElement } from "react";
import Link from "next/link";
import { Tag } from "../Tag/Tag";

interface IProps {
  tags: string[] | undefined;
  interactive?: boolean;
}

export function TagList({
  tags,
  interactive = true,
}: IProps): ReactElement {
  return (
    <div className="flex flex-wrap gap-2">
      {(tags || []).map((t: string) => {
        if (!interactive) {
          return <Tag key={t} name={t} />;
        }

        return (
          <Link key={t} href={`/tag/${t.toLowerCase()}`}>
            <Tag name={t} />
          </Link>
        );
      })}
    </div>
  );
}
