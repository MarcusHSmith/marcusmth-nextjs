import { ReactElement } from "react";
import { ACCOLADE, CITY, ILocationData } from "./../../../../lib/interfaces";
import BestWeWork from "../../../../components/BestWeWorkLayout/BestWeWorkLayout";

export const data: ILocationData[] = [
  {
    name: "7 Rue De Madrid",
    address: "7 rue de Madrid Paris, Ile-de-France 75008",
    weworkURL: new URL(
      "https://www.wework.com/buildings/7-rue-de-madrid--paris"
    ),
    accolades: [ACCOLADE.MOST_BEAUTIFUL],
    primaryImage: "IMG_6212.jpeg",
    allImages: ["IMG_6212.jpeg", "IMG_0471.png"],
    location: {
      lat: 48.87844,
      lng: 2.3211,
    },
    positives: [
      "Beautiful coworking space on the top floor, but gets crowded fast.",
      "Private roofotp with incredible 360 views, and multiple outdoor terraces.",
    ],
  },
  {
    name: "33 Rue la Fayette",
    address: "33 Rue La Fayette Paris, le-de-France 75009",
    weworkURL: new URL(
      "https://www.wework.com/buildings/33-rue-la-fayette--paris"
    ),
    accolades: [ACCOLADE.BEST_LATE_NIGHT],
    primaryImage: "IMG_0462.png",
    allImages: ["IMG_0462.png", "IMG_0463.png"],
    location: {
      lat: 48.87434,
      lng: 2.33768,
    },
    positives: ["The original WeWork in Paris, and still one of the best."],
  },
  {
    name: "5 Rue des Italiens",
    address: "5 Rue des Italiens Paris, Île-de-France 75009",
    weworkURL: new URL(
      "https://www.wework.com/buildings/5-rue-des-italiens--paris"
    ),
    accolades: [ACCOLADE.BEST_FOR_MEETINGS, ACCOLADE.BEST_LOCATION],
    primaryImage: "IMG_0338.png",
    allImages: ["IMG_0338.png", "IMG_0978.png"],
    location: {
      lat: 48.87199,
      lng: 2.33566,
    },
    positives: ["Hyang-Ly has excellent Korea BBQ nearby"],
  },
  {
    name: "106 Boulevard Haussmann",
    address: "106 Boulevard Haussmann Paris 75008",
    weworkURL: new URL(
      "https://www.wework.com/buildings/106-boulevard-haussmann--paris"
    ),
    accolades: [ACCOLADE.BEST_FOR_REMOTE],
    primaryImage: "IMG_1007.png",
    allImages: ["IMG_1007.png", "IMG_1006.png", "IMG_1005.png"],
    location: {
      lat: 48.87466,
      lng: 2.32149,
    },
    positives: [
      "More than enough phone booths and meeting rooms especially late at night.",
    ],
  },
  {
    name: "8 Rue des Pirogues de Bercy",
    address: "8 rue des Pirogues de Bercy Paris 75012",
    weworkURL: new URL(
      "https://www.wework.com/buildings/8-rue-des-pirogues-de-bercy--paris"
    ),
    accolades: [ACCOLADE.BEST_FOOD_OPTIONS],
    primaryImage: "IMG_1106.png",
    allImages: ["IMG_1106.png", "IMG_1103.png", "IMG_1101.png"],
    location: {
      lat: 48.83181,
      lng: 2.3859,
    },
    positives: [
      "Bercy Village is a 2min walk from the office, and has great options for food and shopping.",
    ],
  },
  {
    name: "198 Avenue De France",
    address: "198 Avenue De France Paris, Ile-de-France 75013",
    weworkURL: new URL(
      "https://www.wework.com/buildings/198-avenue-de-france--paris"
    ),
    accolades: [],
    primaryImage: null,
    allImages: [],
    location: {
      lat: 48.83586,
      lng: 2.37202,
    },
  },
  {
    name: "Coeur Marais",
    address: "64-66 Rue Des Archives Paris, Ile-de-France 75003",
    weworkURL: new URL("https://www.wework.com/buildings/coeur-marais--paris"),
    accolades: [],
    primaryImage: null,
    allImages: [],
    location: {
      lat: 48.86162,
      lng: 2.35876,
    },
    negatives: ["No re-entry after 6pm."],
  },
  {
    name: "172 Boulevard De La Villette",
    address:
      "172 Boulevard de la Villette Paris, 19E-Arrondissement, Île-de-France 75019",
    weworkURL: new URL(
      "https://www.wework.com/buildings/172-boulevard-de-la-villette--paris"
    ),
    accolades: [],
    primaryImage: null,
    allImages: [],
    location: {
      lat: 48.88097,
      lng: 2.37055,
    },
  },
  {
    name: "4 Rue Jules Lefebvre",
    address: "4 Rue Jules Lefebvre Paris, Ile-de-France 75009",
    weworkURL: new URL(
      "https://www.wework.com/buildings/4-rue-jules-lefebvre--paris"
    ),
    accolades: [],
    primaryImage: "IMG_0571.png",
    allImages: ["IMG_0571.png"],
    location: {
      lat: 48.88055,
      lng: 2.32765,
    },
  },
  {
    name: "40 Rue du Colisée",
    address: "40 rue du Colisée Paris, Ile-de-France 75008",
    weworkURL: new URL(
      "https://www.wework.com/buildings/40-rue-du-colisee--paris"
    ),
    accolades: [],
    primaryImage: "IMG_0499.png",
    allImages: ["IMG_0499.png", "IMG_1093.png"],
    location: {
      lat: 48.87163,
      lng: 2.31091,
    },
    positives: ["The roof deck has ample table space"],
    negatives: ["There aren't enough phone booths"],
  },
  {
    name: "92 Av. des Champs-Élysées",
    address: "92 avenue des Champs-Élysées Paris, Ile-de-France 75008",
    weworkURL: new URL(
      "https://www.wework.com/buildings/92-av-des-champs-elysees--paris"
    ),
    accolades: [ACCOLADE.BEST_OVERALL, ACCOLADE.BEST_VIEW],
    primaryImage: "IMG_0838.png",
    allImages: ["IMG_0838.png", "IMG_0825.png", "IMG_0520.png", "IMG_0829.png"],
    location: {
      lat: 48.8715296,
      lng: 2.3032185,
    },
    positives: [
      "L'Italien is an amazing pizza restaurant nearby. If you happen to be vegan they also have a solid option.",
      "Check out the terrace on the 4th floor for a great view of the Champs Elysee and Eiffel Tower.",
    ],
  },
];

export default function Index(): ReactElement {
  return <BestWeWork city={CITY.PARIS} locationData={data} />;
}
