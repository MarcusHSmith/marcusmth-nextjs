import { ReactElement } from "react";
import { Tag } from "../Tag/Tag";

interface IProps {
    tags: string[]
}

export function TagList({tags}: IProps): ReactElement {
    return (
        <div className="flex flex-row gap-2">
            {tags.map((t: string) => {
            return (
                <Tag key={t} name={t}/>
            )
            })}
        </div>
    )
}