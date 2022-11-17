import { ReactElement } from "react";
import { HeaderBio } from "../../../../components/HeaderBio/HeaderBio";
import Image from 'next/image';
import router from "next/router";

enum ACCOLADE {
    BEST_OVERALL = "Best Overall",
    BEST_LOCATION = "Best Location",
    BEST_LATE_NIGHT = "Best for Late Nights",
    BEST_FOR_MEETINGS = "Best for Meetings",
    BEST_FOR_REMOTE = "Best for Remote Work",
    BEST_VIEW = "Best View",
    MOST_BEAUTIFUL = "Most Beautiful Environment",
    BEST_FOOD_OPTIONS = "Best food options"
}
interface ILocationData {
    name: string
    address: string
    weworkURL: URL
    accolades: ACCOLADE[]
    primaryImage: string
    allImages: string[]
    location: {
        lat: number
        lng: number
    }
    positives?: string[]
    negatives?: string[]
}

export const data: ILocationData[] = [
    {
        name: "7 Rue De Madrid",
        address: "7 rue de Madrid Paris, Ile-de-France 75008",
        weworkURL: new URL("https://www.wework.com/buildings/7-rue-de-madrid--paris"),
        accolades: [
            ACCOLADE.MOST_BEAUTIFUL
        ],
        primaryImage: "IMG_6212.jpeg",
        allImages: ["IMG_6212.jpeg", "IMG_0471.png"],
        location: {
            lat: 48.878440,
            lng: 2.321100,
        }
    },
    {
        name: "33 Rue la Fayette",
        address: "33 Rue La Fayette Paris, le-de-France 75009",
        weworkURL: new URL("https://www.wework.com/buildings/33-rue-la-fayette--paris"),
        accolades: [
            ACCOLADE.BEST_LATE_NIGHT
        ],
        primaryImage: "IMG_0462.png",
        allImages: ["IMG_0462.png", "IMG_0463.png"],
        location: {
            lat: 48.874340,
            lng: 2.337680,
        }
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
        allImages: ["IMG_1007.png", "IMG_1006.png", "IMG_1005.png"],
        location: {
            lat: 48.871990,
            lng: 2.335660,
        }
    },
    {
        name: "106 Boulevard Haussmann",
        address: "106 Boulevard Haussmann Paris 75008",
        weworkURL: new URL("https://www.wework.com/buildings/106-boulevard-haussmann--paris"),
        accolades: [
            ACCOLADE.BEST_FOR_REMOTE
        ],
        primaryImage: null,
        allImages: [],
        location: {
            lat: 48.874660,
            lng: 2.321490,
        }
    },
    {
        name: "8 Rue des Pirogues de Bercy",
        address: "8 rue des Pirogues de Bercy Paris 75012",
        weworkURL: new URL("https://www.wework.com/buildings/8-rue-des-pirogues-de-bercy--paris"),
        accolades: [ACCOLADE.BEST_FOOD_OPTIONS],
        primaryImage: "IMG_1106.png",
        allImages: ["IMG_1106.png", "IMG_1103.png", "IMG_1101.png"],
        location: {
            lat: 48.831810,
            lng: 2.385900,
        }
    },
    {
        name: "198 Avenue De France",
        address: "198 Avenue De France Paris, Ile-de-France 75013",
        weworkURL: new URL("https://www.wework.com/buildings/198-avenue-de-france--paris"),
        accolades: [],
        primaryImage: null,
        allImages: [],
        location: {
            lat: 48.835860,
            lng: 2.372020,
        }
    },
    {
        name: "Coeur Marais",
        address: "64-66 Rue Des Archives Paris, Ile-de-France 75003",
        weworkURL: new URL("https://www.wework.com/buildings/coeur-marais--paris"),
        accolades: [],
        primaryImage: null,
        allImages: [],
        location: {
            lat: 0.1,
            lng: 0.1,
        },
        negatives: [
            "The doors lock at 6pm"
        ]
    },
    {
        name: "172 Boulevard De La Villette",
        address: "172 Boulevard de la Villette Paris, 19E-Arrondissement, Île-de-France 75019",
        weworkURL: new URL("https://www.wework.com/buildings/172-boulevard-de-la-villette--paris"),
        accolades: [],
        primaryImage: null,
        allImages: [],
        location: {
            lat: 0.1,
            lng: 0.1,
        }
    },
    {
        name: "4 Rue Jules Lefebvre",
        address: "4 Rue Jules Lefebvre Paris, Ile-de-France 75009",
        weworkURL: new URL("https://www.wework.com/buildings/4-rue-jules-lefebvre--paris"),
        accolades: [],
        primaryImage: "IMG_0571.png",
        allImages: ["IMG_0571.png"],
        location: {
            lat: 0.1,
            lng: 0.1,
        }
    },
    {
        name: "40 Rue du Colisée",
        address: "40 rue du Colisée Paris, Ile-de-France 75008",
        weworkURL: new URL("https://www.wework.com/buildings/40-rue-du-colisee--paris"),
        accolades: [],
        primaryImage: "IMG_0499.png",
        allImages: ["IMG_0499.png", "IMG_1093.png"],
        location: {
            lat: 0.1,
            lng: 0.1,
        }
    },
    {
        name: "92 Av. des Champs-Élysées",
        address: "92 avenue des Champs-Élysées Paris, Ile-de-France 75008",
        weworkURL: new URL("https://www.wework.com/buildings/92-av-des-champs-elysees--paris"),
        accolades: [
            ACCOLADE.BEST_OVERALL,
            ACCOLADE.BEST_VIEW
        ],
        primaryImage: "IMG_0838.png",
        allImages: ["IMG_0838.png", "IMG_0825.png", "IMG_0520.png", "IMG_0829.png"],
        location: {
            lat: 0.1,
            lng: 0.1,
        },
        positives: [
            "L'Italien is an amazing pizza restaurant. If you happen to be vegan they also have a solid option."
        ]
    }
]

export default function BestWeWork(): ReactElement {
    return (
        <div className='prose mx-auto'>
        <HeaderBio presenation='min'/>
        <div className='flex flex-col gap-1'>
          <span className="font-bold text-lg">Best WeWork in Paris</span>
          <hr/>
          <span>I spent October and November 2023 living in and more importantly exploring Paris&apos;s WeWork locations. Here's my guide to the best WeWork locations. I recommend you visit them all, they provide a forcing function to experience new corners of the city.</span>
          <BestAccolade accolade={ACCOLADE.BEST_OVERALL}/>
          <BestAccolade accolade={ACCOLADE.BEST_LOCATION}/>
          <BestAccolade accolade={ACCOLADE.BEST_LATE_NIGHT}/>
          <BestAccolade accolade={ACCOLADE.BEST_FOR_MEETINGS}/>
          <BestAccolade accolade={ACCOLADE.BEST_FOR_REMOTE}/>
          <BestAccolade accolade={ACCOLADE.BEST_VIEW}/>
          <BestAccolade accolade={ACCOLADE.MOST_BEAUTIFUL}/>
          <BestAccolade accolade={ACCOLADE.BEST_FOOD_OPTIONS}/>
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
        <button 
            className="flex flex-row m-2 rounded-l shadow-lg rounded-xl overflow-hidden"
            onClick={() => router.push(`/reports/wework/paris/${locationDetails.address}`)}
            >
            <div className="w-40 h-40 relative">
                {locationDetails.primaryImage && <Image
                    src={`/images/${locationDetails.primaryImage}`}
                    alt={locationDetails.name}
                    fill
                    
                    />}
            </div>
            <div className="mx-2 grow flex flex-col">
                <span className="text-xl font-bold">{`${accolade.toString()}`}</span>
                <span>{locationDetails.name}</span>
            </div>
        </button>
    )
}
