import { ReactElement } from "react";
import { Tag } from "../Tag/Tag";
import router from "next/router";

interface IProps {
  tags: string[] | undefined;
  interactive?: boolean;
  limit?: number;
  className?: string;
}

export function TagList({
  tags,
  interactive = true,
  limit,
  className = "flex flex-row gap-2",
}: IProps): ReactElement {
  const visibleTags = limit ? (tags || []).slice(0, limit) : tags || [];

  return (
    <div className={className}>
      {visibleTags.map((t: string) => {
        if (!interactive) {
          return <Tag key={t} name={t} />;
        }

        return (
          <button key={t} onClick={() => router.push(`/tag/${t.toLowerCase()}`)}>
            <Tag name={t} />
          </button>
        );
      })}
    </div>
  );
}
