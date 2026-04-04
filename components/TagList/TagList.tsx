import { ReactElement } from "react";
import { Tag } from "../Tag/Tag";
import router from "next/router";

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
          <button key={t} onClick={() => router.push(`/tag/${t.toLowerCase()}`)}>
            <Tag name={t} />
          </button>
        );
      })}
    </div>
  );
}
