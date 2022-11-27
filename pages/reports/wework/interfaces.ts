export enum ACCOLADE {
    BEST_OVERALL = "Best Overall",
    BEST_LOCATION = "Best Location",
    BEST_LATE_NIGHT = "Best for Late Nights",
    BEST_FOR_MEETINGS = "Best for Meetings",
    BEST_FOR_REMOTE = "Best for Remote Work",
    BEST_VIEW = "Best View",
    MOST_BEAUTIFUL = "Most Beautiful Space",
    BEST_FOOD_OPTIONS = "Best food options"
}

export enum CITY {
    PARIS = "Paris",
    BERLIN = "Berlin",
}

export interface ILocationData {
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