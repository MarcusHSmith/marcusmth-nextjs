import { ReactElement } from "react";
import { Tag } from "../Tag/Tag";
import router from "next/router";

interface IProps {
  tags: string[];
}

export function TagList({ tags }: IProps): ReactElement {
  return (
    <div className="flex flex-row gap-2">
      {tags.map((t: string) => {
        return (
          <button key={t} onClick={() => router.push(`/tag/${t}`)}>
            <Tag key={t} name={t} />
          </button>
        );
      })}
    </div>
  );
}
