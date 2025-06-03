import Head from "next/head";
import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { initializeMap } from "./initializeMap";
import styles from "./styles/Home.module.css";

export interface ILocation {
  lat: number;
  lng: number;
}

export default function Map({ location }: { location: ILocation }) {
  const [pageIsMounted, setPageIsMounted] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  // Intersection Observer to only load map when it's visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (mapContainerRef.current) {
      observer.observe(mapContainerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Load MapBox only when visible
  useEffect(() => {
    if (!isVisible) return;

    const loadMapBox = async () => {
      try {
        const mapboxgl = await import("mapbox-gl/dist/mapbox-gl.js");

        mapboxgl.default.accessToken =
          "pk.eyJ1Ijoid2FubmFkYyIsImEiOiJjazBja2M1ZzYwM2lnM2dvM3o1bmF1dmV6In0.50nuNnApjrJYkMfR2AUpXA";

        const map = new mapboxgl.default.Map({
          container: "my-map",
          style: "mapbox://styles/mapbox/streets-v11",
          center: [location.lng, location.lat],
          zoom: 12,
          pitch: 0,
        });

        initializeMap(mapboxgl.default, map);

        map.on("load", function () {
          new mapboxgl.default.Marker({})
            .setLngLat([location.lng, location.lat])
            .addTo(map);
        });

        mapRef.current = map;
        setMapLoaded(true);
        setPageIsMounted(true);
      } catch (error) {
        console.error("Failed to load MapBox:", error);
      }
    };

    loadMapBox();
  }, [isVisible, location]);

  return (
    <div className="" ref={mapContainerRef}>
      <Head>
        {isVisible && (
          <link
            href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css"
            rel="stylesheet"
          />
        )}
      </Head>

      <div className={styles.main}>
        <div
          id="my-map"
          style={{
            height: 256,
            width: 256,
            backgroundColor: "#f3f4f6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!mapLoaded && isVisible && (
            <div className="text-gray-500 text-sm">Loading map...</div>
          )}
        </div>
      </div>
    </div>
  );
}
