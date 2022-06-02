import React, { useState } from "react";
import classes from "./Map.module.scss";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
const Map = (props) => {
  const [selected, setSelected] = useState({});
  const onMouseOver = (item) => {
    setSelected(item);
  };
  const mapStyles = {
    height: "100vh",
    width: "100%",
  };

  const defaultCenter = {
    lat: 40.183031,
    lng: 44.517692,
  };
  return (
    <div className={classes.MapWrapper}>
      <LoadScript googleMapsApiKey="AIzaSyBlU_X0xsOr_WDmxwV-IZfyDvgov_XFjW8">
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={15}
          center={defaultCenter}
        >
          {props.locations.map((item, index) => {
            return <Marker key={index} position={item} />;
          })}
          {props.locations.map((item, index) => {
            return (
              <Marker
                key={index}
                position={item}
                onMouseOver={() => onMouseOver(item)}
              />
            );
          })}
          {selected.desc && (
            <InfoWindow
              position={selected}
              clickable={true}
              onCloseClick={() => setSelected({})}
            >
              <p>{selected.desc}</p>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};
export default Map;
