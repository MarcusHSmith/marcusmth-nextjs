import router from "next/router";
import { ReactElement, useMemo } from "react";
import {
  ACCOLADE,
  CITY,
  ILocationData,
} from "../../pages/reports/wework/interfaces";
import { HeaderBio } from "../HeaderBio/HeaderBio";
import Image from "next/image";

export default function BestWeWork({
  city,
  locationData,
}: {
  city: CITY;
  locationData: ILocationData[];
}): ReactElement {
  const remainingLocations = useMemo(() => {
    return locationData
      .filter((l) => l.accolades.length === 0)
      .sort((a, b) => {
        return b.allImages.length - a.allImages.length;
      });
  }, [locationData]);

  const citySummary = useMemo(() => {
    switch (city) {
      case CITY.BERLIN:
        return (
        <div>
        <p>During the summer of 2022 I lived in Berlin for two months. I utilized WeWork All Access pass to visit many of the available offices. During this time I found my favorites and discovered some flaws in other.</p>
        <p>As an American working on EST time I worked from 3pm through 11pm or midnight. This allowed me to catch the last hours of baristas, work while the beer taps were opened (usually from 5-6), and then watch the sunset with the remaining expats.</p>
        <p>One major flaw with many of the Berlin locations is that they're not technically 24 hour offices. If you leave after an undisclosed time your keycard won't allow reentry. This was a major issue when goes out for dinner around 7pm.</p>
        </div>)
      case CITY.PARIS:
        return <p>I spent October and November 2022 living in and more importantly
        exploring Paris&apos;s WeWork locations. Here&apos;s my guide to the
        best WeWork locations. I recommend you visit them all, they provide a
        forcing function to experience new corners of the city.</p>
    }
  }, [city]);
  return (
    <div className="prose mx-auto">
      <HeaderBio presentation="min" />
      <div className="flex flex-col gap-1">
        <span className="font-bold text-lg">Best WeWork in {city}</span>
        <hr />
        {citySummary}
        <BestAccolade
          accolade={ACCOLADE.BEST_OVERALL}
          locationData={locationData}
          city={city}
        />
        <BestAccolade
          accolade={ACCOLADE.BEST_LOCATION}
          locationData={locationData}
          city={city}
        />
        <BestAccolade
          accolade={ACCOLADE.BEST_LATE_NIGHT}
          locationData={locationData}
          city={city}
        />
        <BestAccolade
          accolade={ACCOLADE.BEST_FOR_MEETINGS}
          locationData={locationData}
          city={city}
        />
        <BestAccolade
          accolade={ACCOLADE.BEST_FOR_REMOTE}
          locationData={locationData}
          city={city}
        />
        <BestAccolade
          accolade={ACCOLADE.BEST_VIEW}
          locationData={locationData}
          city={city}
        />
        <BestAccolade
          accolade={ACCOLADE.MOST_BEAUTIFUL}
          locationData={locationData}
          city={city}
        />
        <BestAccolade
          accolade={ACCOLADE.BEST_FOOD_OPTIONS}
          locationData={locationData}
          city={city}
        />
        {remainingLocations.length > 0 && (
          <span className="font-bold">The Rest</span>
        )}
        {remainingLocations.map((l) => {
          return <Location key={l.name} locationDetails={l} city={city}/>;
        })}
      </div>
    </div>
  );
}

function BestAccolade({
  accolade,
  locationData,
  city,
}: {
  accolade: ACCOLADE;
  locationData: ILocationData[];
  city: CITY
}): ReactElement {
  const locationDetails = locationData.find((d: ILocationData) => {
    const position = d.accolades.findIndex((a) => a === accolade);
    return position !== -1;
  });
  if (!locationDetails) {
    return null;
  }
  return <Location locationDetails={locationDetails} accolade={accolade} city={city}/>;
}

function Location({
  locationDetails,
  accolade,
  city
}: {
  locationDetails: ILocationData;
  accolade?: ACCOLADE;
  city: CITY
}): ReactElement {
  console.log(`/reports/wework/${city.toLocaleLowerCase()}/${locationDetails.address}`)
  return (
    <button
      className="flex flex-row m-2 rounded-l shadow-lg rounded-xl overflow-hidden"
      onClick={() =>
        router.push(`/reports/wework/${city.toLocaleLowerCase()}/${locationDetails.address}`)
      }
    >
      <div className="w-40 h-40 relative flex-none">
        {locationDetails.primaryImage ? (
          <Image
            src={`/images/${locationDetails.primaryImage}`}
            alt={locationDetails.name}
            fill
          />
        ) : (
          <Image
            src={`/images/WeWork-logo.png`}
            alt="WeWork logo"
            fill
          />
        )}
      </div>
      <div className="mx-2 grow flex flex-col">
        {accolade && (
          <span className="text-xl font-bold">{`${accolade.toString()}`}</span>
        )}
        <span>{locationDetails.name}</span>
        {locationDetails.positives && locationDetails.positives.length > 0 && (
          <div className="px-2">
            <span className="italic text-xs">
              <q>{locationDetails.positives[0]}</q>
            </span>
          </div>
        )}
      </div>
    </button>
  );
}
