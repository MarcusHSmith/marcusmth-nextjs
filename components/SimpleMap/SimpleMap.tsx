import React from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export interface ILocation {
  lat: number,
  lng: number
}

export default function SimpleMap({location}: {location: ILocation}){
  const defaultProps = {
    center: {
      ...location
    },
    zoom: 11
  };

  console.log(process)
  console.log(process.env)
  console.log(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API)
  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        
      >
        <AnyReactComponent
          {...location}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
}