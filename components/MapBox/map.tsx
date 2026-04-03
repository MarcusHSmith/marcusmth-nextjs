import Head from "next/head";
import { useEffect, useState } from "react";
import { initializeMap } from "./initializeMap";
import styles from "./styles/Home.module.css";

let mapboxgl;

export interface ILocation {
  lat: number;
  lng: number;
}

export default function Map({ location }: { location: ILocation }) {
  const [pageIsMounted, setPageIsMounted] = useState(false);
  const [map, setMap] = useState<any>(undefined);

  if (window.location.pathname.startsWith("/reports/wework/")) {
    mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
  }

  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

  useEffect(() => {
    setPageIsMounted(true);
    let map = new mapboxgl.Map({
      container: "my-map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [location.lng, location.lat],
      zoom: 12,
      pitch: 0,
    });

    initializeMap(mapboxgl, map);
    setMap(map);
  }, [location]);

  useEffect(() => {
    if (pageIsMounted && map) {
      map.on("load", function () {
        new mapboxgl.Marker({})
          .setLngLat([location.lng, location.lat])
          .addTo(map);
      });
    }
  }, [pageIsMounted, setMap, map, location]);

  return (
    <div className="">
      <Head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>

      <div className={styles.main}>
        <div id="my-map" style={{ height: 256, width: 256 }} />
      </div>
    </div>
  );
}
