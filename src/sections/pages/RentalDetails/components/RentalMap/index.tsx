// @ts-ignore
import tt from "@tomtom-international/web-sdk-maps";
import React, { useEffect, useRef } from "react";
import { useMap } from "../../../../../providers/MapProvider/index";
import "./styles.scss";

interface Props {
  location: string;
}

const RentalMap: React.FC<Props> = ({ location }) => {
  const { initMap, getGeoLocation, addMarker }: any = useMap();
  const initMapRef = useRef(initMap);
  const getGeoLocationRef = useRef(getGeoLocation);
  let mapRef: any = useRef(null);
  let addMarkerRef: any = useRef(addMarker);

  useEffect(() => {
    location &&
      getGeoLocationRef.current(location).then((position: any) => {
        mapRef.current.setCenter(new tt.LngLat(position.lon, position.lat));
        addMarkerRef.current(mapRef.current, position);
      });
  }, [location]);

  useEffect(() => {
    mapRef.current = initMapRef.current();
  }, []);

  return <div id="map"></div>;
};

export default RentalMap;
