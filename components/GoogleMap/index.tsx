import { Wrapper, Status } from "@googlemaps/react-wrapper";
import React from "react";
import { ReactElement } from "react";
import { createCustomEqual } from "fast-equals";
import { createRoot } from "react-dom/client";


// const render = (status: Status) => {
//     return <h1>{status}</h1>;
//   };
  
//   <Wrapper apiKey={"YOUR_API_KEY"} render={render}>
//     <YourComponent/>
//   </Wrapper>
//   }

export function GoogleMap(): ReactElement {
    const render = (status: Status) => {
        return <h1>{status}</h1>;
    };

    const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
        lat: 0,
        lng: 0,
      });

    return (
      <div style={{ display: "flex", height: "100%" }}>
        <Wrapper apiKey={process.env.PUBLIC_NEXT_GOOGLE_MAPS_API} render={render} libraries={["visualization"]}>
            <Map
                center={center}
                onClick={() => {console.log("onCLick")}}
                onIdle={() => {console.log("is idle")}}
                zoom={11}
                style={{ flexGrow: "1", height: "100%" }}
                >
                {/* {clicks.map((latLng, i) => (
                    <Marker key={i} position={latLng} />
                ))} */}
        </Map>
        </Wrapper>
        </div>
    )
}

interface MapProps extends google.maps.MapOptions {
    style: { [key: string]: string };
    onClick?: (e: google.maps.MapMouseEvent) => void;
    onIdle?: (map: google.maps.Map) => void;
    children?: React.ReactNode;
  }
  
  const Map: React.FC<MapProps> = ({
    onClick,
    onIdle,
    children,
    style,
    ...options
  }) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const [map, setMap] = React.useState<google.maps.Map>();
  
    React.useEffect(() => {
      if (ref.current && !map) {
        setMap(new window.google.maps.Map(ref.current, {}));
      }
    }, [ref, map]);
  
    // because React does not do deep comparisons, a custom hook is used
    // see discussion in https://github.com/googlemaps/js-samples/issues/946
    useDeepCompareEffectForMaps(() => {
      if (map) {
        map.setOptions(options);
      }
    }, [map, options]);
  
    React.useEffect(() => {
      if (map) {
        ["click", "idle"].forEach((eventName) =>
          google.maps.event.clearListeners(map, eventName)
        );
  
        if (onClick) {
          map.addListener("click", onClick);
        }
  
        if (onIdle) {
          map.addListener("idle", () => onIdle(map));
        }
      }
    }, [map, onClick, onIdle]);
  
    return (
      <>
        <div ref={ref} style={style} />
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            // set the map prop on the child component
            // @ts-ignore
            return React.cloneElement(child, { map });
          }
        })}
      </>
    );
  };


const Marker: React.FC<google.maps.MarkerOptions> = (options) => {
    const [marker, setMarker] = React.useState<google.maps.Marker>();
  
    React.useEffect(() => {
      if (!marker) {
        setMarker(new google.maps.Marker());
      }
  
      // remove marker from map on unmount
      return () => {
        if (marker) {
          marker.setMap(null);
        }
      };
    }, [marker]);
  
    React.useEffect(() => {
      if (marker) {
        marker.setOptions(options);
      }
    }, [marker, options]);
  
    return null;
  };
  
//   const deepCompareEqualsForMaps = createCustomEqual(
//     (deepEqual) => (a: any, b: any) => {
//       if (
//         isLatLngLiteral(a) ||
//         a instanceof google.maps.LatLng ||
//         isLatLngLiteral(b) ||
//         b instanceof google.maps.LatLng
//       ) {
//         return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
//       }
  
//       // TODO extend to other types
  
//       // use fast-equals for other objects
//       return deepEqual(a, b);
//     }
//   );
  
  function useDeepCompareMemoize(value: any) {
    const ref = React.useRef();
  
    // if (!deepCompareEqualsForMaps(value, ref.current)) {
    //   ref.current = value;
    // }
  
    return ref.current;
  }
  
  function useDeepCompareEffectForMaps(
    callback: React.EffectCallback,
    dependencies: any[]
  ) {
    React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
  }
  
  // window.addEventListener("DOMContentLoaded", () => {
  //   const root = createRoot(document.getElementById("root")!);
  //   root.render(<GoogleMap />);
  // });