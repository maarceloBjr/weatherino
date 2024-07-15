"use client";

import { Input } from "@/components/ui/input";
import { convertDate } from "@/utils/convertDate";
import { useState } from "react";
import Rain from "./components/RainAnimation";
import Snowflake from "./components/Snowflake";
import Snow from "./components/SnowAnimation";

export default function Home() {
  const [data, setData] = useState<any>({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [climateCondition, setClimateCondition] = useState("");
  const [time, setTime] = useState(7);

  const url = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_WEAHTER_API}&q=${location}&days=7&aqi=yes&alerts=yes`;
  let bgColor = "";
  let textColor = "";

  const handleSearch = async (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error();
        }
        const data = await res.json();
        setData(data);
        setClimateCondition(data.current.condition.text);
        setError("");
        setTime(data.location.localtime.split(" ")[1].split(":")[0]);
      } catch (err) {
        setError("City not found!");
        setData({});
      }
    }
  };

  if (time <= 5 || time >= 19) {
    bgColor = "bg-gradient-to-t from-blue-950 to-black text-white";
    textColor = "text-white";
  } else {
    bgColor = "bg-gradient-to-tl from-blue-400 to-yellow-50 text-black";
    textColor = "text-black";
  }

  return (
    <main className={`relative min-h-screen`}>
      {climateCondition.includes("rain") && <Rain />}
      <Snow />
      <div
        className={`flex min-h-screen flex-col items-start ${bgColor} ${textColor} space-y-8 z-10`}
      >
        <div
          className={`flex flex-col items-center justify-center w-full space-y-4 pt-24 ${textColor} z-10`}
        >
          <h1 className="text-5xl mb-10 z-10">Weatherino</h1>
          <Input
            placeholder="Enter city name"
            className="max-w-2xl bg-transparent z-10"
            onKeyDown={handleSearch}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        {error && <p>{error}</p>}
        {data.location && (
          <>
            <div className="self-center flex flex-col z-10">
              <div className="w-full flex flex-col items-center justify-center p-4">
                <p className="text-2xl">{data.location.name}</p>
                <p>
                  {data.location.region} - {data.location.country}
                </p>
              </div>
              <div className="w-full flex flex-col items-center justify-center p-4">
                <p>{data.current.condition.text}</p>
                <p className="text-7xl my-4">{data.current.temp_c}°C</p>
                <p className="text-4xl">
                  {data.location.localtime.split(" ")[1]}
                </p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 w-full px-24 z-10">
              {data.forecast.forecastday.map(
                (day: any, index: number) =>
                  index > 0 && (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-center p-4 bg-white/40 rounded-lg text-black"
                    >
                      <p className="text-2xl">
                        {new Date(day.date).toLocaleDateString("en-US", {
                          timeZone: "GMT",
                          weekday: "short",
                        })}
                      </p>
                      <p>{convertDate(day.date)}</p>
                      <img src={day.day.condition.icon} />
                      <p className="text-2xl mt-4">{day.day.avgtemp_c}°C</p>
                    </div>
                  )
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
