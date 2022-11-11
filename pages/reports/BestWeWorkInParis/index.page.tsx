import { ReactElement } from "react";
import { HeaderBio } from "../../../components/HeaderBio/HeaderBio";
import Image from 'next/image';

enum ACCOLADE {
    BEST_LOCATION = "Best Location",
    BEST_LATE_NIGHT = "Best for Late Nights",
    BEST_FOR_MEETINGS = "Best for Meetings",
    BEST_FOR_REMOTE = "Best for Remote Work",
    BEST_VIEW = "Best View",
    MOST_BEAUTIFUL = "Most Beautiful Enviornment"
}
interface ILocationData {
    name: string
    address: string
    weworkURL: URL
    accolades: ACCOLADE[]
    primaryImage: string
    allImages: string[]
}

const data: ILocationData[] = [
    {
        name: "7 Rue De Madrid",
        address: "7 rue de Madrid Paris, Ile-de-France 75008",
        weworkURL: new URL("https://www.wework.com/buildings/7-rue-de-madrid--paris"),
        accolades: [
            ACCOLADE.MOST_BEAUTIFUL
        ],
        primaryImage: "IMG_6212.jpeg",
        allImages: ["IMG_6212.jpeg", "IMG_0471.png"]
    },
    {
        name: "33 Rue la Fayette",
        address: "33 Rue La Fayette Paris, le-de-France 75009",
        weworkURL: new URL("https://www.wework.com/buildings/33-rue-la-fayette--paris"),
        accolades: [
            ACCOLADE.BEST_LATE_NIGHT
        ],
        primaryImage: "IMG_0462.png",
        allImages: ["IMG_0462.png", "IMG_0463.png"]
    },
    {
        name: "5 Rue des Italiens",
        address: "5 Rue des Italiens Paris, Île-de-France 75009",
        weworkURL: new URL("https://www.wework.com/buildings/5-rue-des-italiens--paris"),
        accolades: [
            ACCOLADE.BEST_FOR_MEETINGS,
            ACCOLADE.BEST_LOCATION
        ],
        primaryImage: "IMG_1007.png",
        allImages: ["IMG_1007.png", "IMG_1006.png", "IMG_1005.png"]
    }
]

export default function BestWeWork(): ReactElement {
    return (
        <div className='prose mx-auto'>
        <HeaderBio presenation='min'/>
        <div className='flex flex-col gap-1'>
          <span className="font-bold text-lg">Best WeWork in Paris</span>
          <hr/>
          <BestAccolade accolade={ACCOLADE.BEST_LOCATION}/>
          <BestAccolade accolade={ACCOLADE.BEST_LATE_NIGHT}/>
          <BestAccolade accolade={ACCOLADE.MOST_BEAUTIFUL}/>
        </div>
      </div>
    )
}

function BestAccolade({accolade}:{accolade: ACCOLADE}): ReactElement {
    const locationDetails = data.find((d: ILocationData) => {
        const position = d.accolades.findIndex((a) => a === accolade)
        return position !== -1
    })
    return (
        <div className="flex flex-row m-2 rounded-l shadow-lg rounded-xl overflow-hidden">
            <div className="w-40 h-40 bg-green-500 relative">
                <Image
                    className="bg-purple-500"
                    src={`/images/${locationDetails.primaryImage}`}
                    alt={locationDetails.name}
                    fill
                    />
            </div>
            <div className="mx-2 grow flex flex-col">
                <span className="text-xl font-bold text-purple-500">{`${accolade.toString()}`}</span>
                <span>{locationDetails.name}</span>
            </div>
        </div>
    )
}
