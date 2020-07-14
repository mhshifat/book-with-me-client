// @ts-ignore
import tt from "@tomtom-international/web-sdk-maps";
import Axios from "axios";
import React, { createContext, useContext } from "react";

const MapContext: any = createContext(null);

export const MapProvider: React.FC<{ apiKey: string }> = ({
  children,
  apiKey,
}) => {
  const initMap = () => {
    const map = tt.map({
      key: apiKey,
      style: "tomtom://vector/1/basic-main",
      container: "map",
      zoom: 15,
    });
    map.addControl(new tt.NavigationControl());
    return map;
  };

  const getGeoLocation = (location: string) => {
    return Axios.get(
      `https://api.tomtom.com/search/2/geocode/${location}.JSON?key=${apiKey}`
    )
      .then((res) => res.data)
      .then((data) => {
        if (data && data.results && data.results.length > 0) {
          return data.results[0].position;
        }

        return Promise.reject("Location not found!");
      });
  };

  const addMarker = (map: any, position: any) => {
    new tt.Marker({}).setLngLat([position.lon, position.lat]).addTo(map);
  };

  return (
    <MapContext.Provider value={{ initMap, getGeoLocation, addMarker }}>
      {children}
    </MapContext.Provider>
  );
};

export const withMap = (Component: any) => (props: any) => {
  return (
    <MapContext.Consumer>
      {(authApi: any) => <Component {...props} {...authApi} />}
    </MapContext.Consumer>
  );
};

export const useMap = () => {
  return useContext(MapContext);
};
