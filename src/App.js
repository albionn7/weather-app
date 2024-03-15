import Navbar from "./components/navbar.jsx";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  LabelList,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { getHourlyForecast, getCurrentWeather } from "./api.js";
import * as dayjs from "dayjs";

function App() {
  const [activeLocation, setActiveLocation] = useState();
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);

  const [weather, setWeather] = useState();

  useEffect(() => {
    if (activeLocation) {
      getHourlyForecast(activeLocation).then((data) => {
        const tempData = data.list.slice(0, 11).map((yoo) => {
          const ss = dayjs(new Date(yoo.dt * 1000));
          return {
            time: ss.format("H A"),
            temperature: Math.round(yoo.main.temp),
          };
        });
        const dailyData = data.list.filter((yoo) => {
          const ss = dayjs(new Date(yoo.dt * 1000));
          return ss.get("hour") == 13;
        });
        setDailyForecast(dailyData);
        setHourlyForecast(tempData);
      });
      getCurrentWeather(activeLocation).then(setWeather);
    }
  }, [activeLocation]);
  return (
    <div className="md:size-3/4 md:p-0 p-7 mx-auto text-gray-700">
      <h1 className="flex justify-start text-4xl font-bold pb-5 border-b border-gray-400 ">
        Weather App
      </h1>
      <Navbar onLocationChange={setActiveLocation} />

      {activeLocation && weather && (
        <>
          <div class="flex md:flex-row flex-col md:pt-4 md:pb-4 border-b text-gray-700 border-gray-400">
            <div class="md:w-1/3  md:p-10 border-r border-gray-400 ">
              <div className="flex justify-start flex-col pb-2">
                <p>{dayjs().format("dddd, MMM D")}</p>
                <p className="font-bold">6PM</p>
              </div>
              <div className="flex md:flex-row flex-col justify-cemter text-center items-center">
                <div className="flex md:flex-row flex-col justify-start">
                  <img
                    className="flex justify-start w-fit h-full"
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon.replace(
                      "n",
                      "d"
                    )}@4x.png`}
                  ></img>

                  {console.log(weather.weather[0].icon)}
                </div>
                <div className="flex justify-start flex-col ">
                  <h1 className="flex justify-start  font-bold  text-7xl">
                    {Math.round(weather.main.temp)}℃
                  </h1>
                  <p className="flex justify-start mt-2 text-sm">
                    {weather.weather[0].description}
                  </p>
                </div>
              </div>
              <div className="flex justify-center items-center gap-7 mt-10 mb-10">
                <div className="text-gray-600">
                  <p>
                    Real Feel |
                    <span className="font-bold pl-2">
                      {Math.round(weather.main.feels_like)}℃
                    </span>
                  </p>
                  <p>
                    Humidity |
                    <span className="font-bold pl-2">
                      {weather.main.humidity}
                    </span>
                  </p>
                </div>
                <div className="text-gray-600">
                  <p>
                    Wind |
                    <span className="font-bold pl-2">
                      {" "}
                      {weather.wind.speed}
                    </span>
                  </p>
                  <p>
                    UV | <span className="font-bold pl-2">0.1</span>
                  </p>
                </div>
              </div>
            </div>
            <div class="md:w-2/3 md:p-10 md:overflow-hidden mb-5 md:mb-0 overflow-auto ">
              <TemperatureBarChart
                className=""
                temperatureData={hourlyForecast}
              />
            </div>
          </div>
          <h1 className="mt-10 mb-10 font-bold text-gray-700 text-2xl">
            7-Day Forecast
          </h1>
          <div className="flex md:flex-row flex-col justify-center text-center md:gap-7 mt-10 p-10  ">
            {dailyForecast.map((day) => (
              <div key={day.dt} className="flex flex-col p-4 justify-between">
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png`}
                  className="pb-5"
                  alt="Weather Icon"
                />
                <p className="pb-5 font-medium text-xl">
                  {dayjs.unix(day.dt).format("dddd")}
                </p>
                <p className="text-xl">
                  {Math.round(day.main.temp)}
                  <span className="font-medium">°C</span>
                </p>
              </div>
            ))}
          </div>
        </>
      )}
      <header className="App-header"></header>
    </div>
  );
}

const TemperatureBarChart = ({ temperatureData }) => {
  const CustomBar = (props) => {
    const { x, y, width, height, fill } = props;

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill="#fff0a4"
          stroke={fill}
          strokeWidth="4"
          rx={15}
          ry={15}
        />
      </g>
    );
  };

  return (
    <ResponsiveContainer width={900} height="100%">
      <BarChart
        data={temperatureData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis
          dataKey="time"
          axisLine={false}
          fontWeight={600}
          tickMargin={10}
        />
        <Tooltip />
        <Bar
          dataKey="temperature"
          fill="#eb6e4b"
          legendType="circle"
          shape={<CustomBar />}
          barSize={30}
        >
          <LabelList dataKey="temperature" position="top" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default App;
