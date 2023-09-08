import { useEffect } from "react";
import { useState } from "react";

const Tempapp = () => {
  const [city, setCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [search, setSearch] = useState("kolkata");

  let imgPath = "";

  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=0e95ba5138f3e61d6dfd102645b2be51`;
      const response = await fetch(url);
      const resJson = await response.json();
      // console.log(resJson);
      setCity(resJson.main);
      setWeather(resJson.weather?.[0]?.main);
    };
    fetchApi();
  }, [search]);
  console.log(weather);
  if (weather === "Clouds") {
    imgPath = "/clouds.webp";
  } else if (weather === "Haze") {
    imgPath = "/haze.webp";
  } else if (weather === "Rain") {
    imgPath = "/rain.jpg";
  } else {
    imgPath = "/sunny.jpg";
  }

  return (
    <>
      <div className="max-w-sm mx-auto mt-14 rounded-2xl overflow-hidden shadow-lg m-4 border border-grey-500">
        <div className="relative mb-4 flex w-4/5 flex-wrap items-stretch mx-auto mt-4">
          <input
            type="search"
            className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-xl border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-400 dark:placeholder:text-neutral-400 dark:focus:border-primary"
            placeholder={search}
            aria-label="Search"
            aria-describedby="button-addon1"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>

        {!city ? (
          <p className="text-center text-xl font-semibold text-red-400 pt-8 pb-8">
            No data found
          </p>
        ) : (
          <div>
            <div className="mx-9">
              <img src={imgPath} className="rounded-xl" />
              <div className="text-center mt-4 font-medium">{weather}</div>
            </div>
            <div className="flex flex-col items-center pb-6">
              <div className="m-1 font-bold text-3xl">{search}</div>
              <div className="m-1 font-semibold text-xl">
                Temp {city.temp}°C
              </div>
              <div className="m-1 text-gray-400">
                Min {city.temp_min}°C | Max {city.temp_max}°C
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Tempapp;
