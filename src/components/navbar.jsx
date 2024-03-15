import React, { useState, useEffect } from "react";
import { getLocation } from "../api";
import { useLocalStorage } from "react-use";

const Navbar = ({ onLocationChange }) => {
  const [value, setValue, remove] = useLocalStorage("savedLocation", [
    { name: "Struga, MK", lat: 41.1770278, lon: 20.6790586 },
  ]);

  const locations = value.slice(Math.max(value.length - 5, 0));
  const [activeLocation, setActiveLocation] = useState(locations[0]);

  useEffect(() => {
    onLocationChange(activeLocation);
  }, [activeLocation]);

  return (
    <div className="flex md:flex-row flex-col md:justify-center justify-start md:align-middle text-gray-700 pt-5">
      <div className="flex justify-start md:w-1/3 w-1/2 md:m-auto my-3">
        <h1 className=" text-2xl font-bold">{activeLocation?.name}</h1>
      </div>
      <div className="flex md:justify-center justify-start md:p-2  md:w-1/3 w-full ">
        <form
          className="flex justify-start md:w-full border border-gray-400 rounded-xl"
          onSubmit={(e) => {
            e.preventDefault();
            getLocation(new FormData(e.target).get("query")).then((locArr) => {
              e.target.reset();
              const loc = locArr[0];

              setValue((curr) => {
                const existingLocation = curr.find(
                  (location) =>
                    location.lat === loc.lat && location.lon === loc.lon
                );
                if (!existingLocation) {
                  curr.push({
                    name: `${loc.name}, ${loc.country}`,
                    lat: loc.lat,
                    lon: loc.lon,
                  });
                }
                return curr;
              });
              setActiveLocation({
                name: `${loc.name}, ${loc.country}`,
                lat: loc.lat,
                lon: loc.lon,
              });
            });
          }}
        >
          <input
            className="flex justify-center w-full py-1 text-start md:pl-2 m-1 focus:outline-none"
            name="query"
            type="text"
            placeholder="Search for a location"
          />
        </form>
      </div>
      <div className="flex flex-grow  md:pl-4 py-5 gap-5 mb-5 md:m-auto md:verflow-hidden  overflow-auto md:w-3/4">
        {locations.map((loc, i) => {
          return (
            <a
              key={loc.name + i}
              onClick={() => setActiveLocation(loc)}
              className={`${
                activeLocation?.name === loc.name ? "text-customOrange" : ""
              } cursor-pointer hover:text-customOrange font-medium`}
            >
              {loc.name}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
