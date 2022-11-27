import { ReactElement } from "react";
import { ACCOLADE, CITY, ILocationData } from "../interfaces";
import BestWeWork from "../../../../components/BestWeWorkLayout/BestWeWorkLayout";

export const data: ILocationData[] = [
    {
        name: "Warschauer Platz 11-13",
        address: "Warschauer Platz 11-13 Berlin, BE 10245",
        weworkURL: new URL("https://www.wework.com/buildings/warschauer-platz-11-13--berlin"),
        accolades: [
            ACCOLADE.BEST_FOR_REMOTE,
        ],
        primaryImage: "",
        allImages: [],
        location: {
            lat: 52.50386428833008,
            lng: 13.448801040649414,
        },
        positives: [
            "A massive 3 story space with hanging vines connecting them.",
            "There are pool tables.",
            "A barista makes coffees near the front and it's usually not too crowded."
        ]
    },
    {
        name: "Friedrichstraße 76",
        address: "Friedrichstraße 76 Berlin, BE 10117",
        weworkURL: new URL("https://www.wework.com/buildings/friedrichstrasse-76--berlin"),
        accolades: [
            ACCOLADE.BEST_LATE_NIGHT,
        ],
        primaryImage: "IMG_7360.png",
        allImages: ["IMG_7360.png"],
        location: {
            lat: 52.51211929321289,
            lng: 13.389616012573242,
        },
        positives: [
            "This office is in the heart of Berlin. The street infront of it was recently made into a pedestrian only street.", 
            "The building has massive glass funnels coming from the roof all the way down. This brings natural light into every room.",
            "A large amount of night owls worked here so you're never alone even at midnight. Late night entry was never an issue and I spent many nights here. The area is sparse for food options unfortunately."
        ]
    },
    {
        name: "Neue Schonhauser Straße",
        address: "Neue Schönhauser Straße 3-5 Berlin, BE 10178",
        weworkURL: new URL("https://www.wework.com/buildings/neue-schonhauser-strasse-3-5--berlin"),
        accolades: [
            ACCOLADE.BEST_FOOD_OPTIONS,
        ],
        primaryImage: "",
        allImages: [],
        location: {
            lat: 52.52461624145508,
            lng: 13.404254913330078,
        },
        positives: [
            "Smack in the middle of Mitte shopping district sits one of my favorite WeWorks. I'm not alone in this thought as Peloton, Reddit, Amazon and many more companies have offices inside here."
        ]
    },
    {
        name: "Kurfurstendamm 11",
        address: "Kurfürstendamm 11 Berlin, BE 10719",
        weworkURL: new URL("https://www.wework.com/buildings/kurfurstendamm-11--berlin"),
        accolades: [
            ACCOLADE.BEST_VIEW,
        ],
        primaryImage: "IMG_7648.png",
        allImages: ["IMG_7648.png", "IMG_7650.png"],
        location: {
            lat: 52.504640,
            lng: 13.333610,
        },
        positives: [
            "It's worth a mention for the amazing view of Kaiser Wilhelm Memorial Church right outside the window and on the balcony. If this location had 24 hour access it could have completed for a top spot."
        ],
        negatives: [
            "Without late night access, this was a one and done for me."
        ]
    },
    {
        name: "Dircksenstraße 3",
        address: "Dircksenstraße 3 Berlin, BE 10179",
        weworkURL: new URL("https://www.wework.com/buildings/dircksenstrasse-3--berlin"),
        accolades: [
            ACCOLADE.BEST_OVERALL,
        ],
        primaryImage: "IMG_7781.png",
        allImages: ["IMG_7781.png"],
        location: {
            lat: 52.516600,
            lng: 13.416970,
        },
        positives: [
            "Right next to Alexanderplatz sits Dirckensenstraße.",
             "There was plenty of restaurants nearby especially with ALEXA mall.",
             "Many of us had gym membership to SuperFit inside the mall.",
             "The baristas here was so nice and working from the first floor made it feel more connected to the city.",
             "At night it can be challenging to enter, but you can easily go around to the Student Hotel Berlin and walk into the common space back to WeWork."
        ],
        negatives: [
            "Public transportation can be challenging late at night so this location had the most options."
        ]
    },
    {
        name: "Atrium Tower",
        address: "Eichhornstraße 3 Berlin, BE 10785",
        weworkURL: new URL("https://www.wework.com/buildings/atrium-tower--berlin"),
        accolades: [],
        primaryImage: "IMG_7450.png",
        allImages: ["IMG_7450.png", "IMG_7447.png", "IMG_7449.png"],
        location: {
            lat: 52.5061538,
            lng: 13.3727365,
        },
        positives: []
    }
]

export default function Index(): ReactElement {
    return <BestWeWork city={CITY.BERLIN} locationData={data}/>
}
