import { Component } from "react";
import ReactMapGL from "react-map-gl";

class MapV2 extends Component {
  state = {
    viewport: {
      width: "100vw",
      height: "100vh",
      latitude: 41.5868,
      longitude: -93.625,
      zoom: 13,
    },
  };

  render() {
    return (
      <ReactMapGL
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxApiAccessToken="pk.eyJ1Ijoid2FubmFkYyIsImEiOiJjazBja2M1ZzYwM2lnM2dvM3o1bmF1dmV6In0.50nuNnApjrJYkMfR2AUpXA"
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setState({ viewport })}
      />
    );
  }
}

export default MapV2;
