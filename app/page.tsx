"use client";

import { Input } from "@/components/ui/input";
import { convertDate } from "@/utils/convertDate";
import { useState } from "react";

export default function Home() {
  const [data, setData] = useState<any>({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  // const [temperature, setTemperature] = useState<Date>();

  const url = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_WEAHTER_API}&q=${location}&days=7&aqi=yes&alerts=yes`;

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
        // setTemperature();
        setError("");
      } catch (err) {
        setError("City not found!");
        setData({});
      }
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-start p-24 bg-gradient-to-r from-blue-400 to-blue-100 space-y-8">
      <div className="flex flex-col items-center justify-center w-full space-y-4 text-black">
        <h1 className="text-5xl mb-10">Weatherino</h1>
        <Input
          placeholder="Enter city name"
          className="max-w-2xl bg-transparent"
          onKeyDown={handleSearch}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      {error && <p>{error}</p>}
      {data.location && (
        <>
        <div className="self-center flex flex-col">
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
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 w-full">
            {data.forecast.forecastday.map(
              (day: any, index: number) =>
                index > 0 && (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center p-4 bg-white/40 rounded-lg"
                  >
                    <p className="text-2xl">
                      {new Date(
                        day.date
                      ).toLocaleDateString("en-US", {
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
    </main>
  );
}
