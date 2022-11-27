import { ReactElement } from "react";
import { HeaderBio } from "../HeaderBio/HeaderBio";

interface IProps {
    children: ReactElement
}

export function HomeLayout({children}: IProps): ReactElement {
    return (
        <div className='p-4'>
            <HeaderBio presentation='full'/>
            {children}
        </div>
    )
}
