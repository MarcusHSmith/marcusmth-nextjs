import { ReactElement } from "react";

interface IProps {
  name: string;
}

export function Tag({ name }: IProps): ReactElement {
  return (
    <div className="bg-blue-500 w-min rounded-md">
      <span className="text-white text-xs px-2">{name}</span>
    </div>
  );
}
