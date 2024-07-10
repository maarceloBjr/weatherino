"use client"

import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState("")
  const [error, setError] = useState("")

  const url = `http://api.weatherapi.com/v1/forecast.json?key=0a23f07fa87648cb9f6182601241007&q=Porto Alegre&days=7&aqi=yes&alerts=yes`

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-r from-blue-400 to-blue-100">
      <div className="flex flex-col items-center justify-center w-full h-full space-y-8 text-black">
        <h1>Weatherino</h1>
        <Input placeholder="Enter city name" className="max-w-2xl bg-transparent" />
      </div>
    </main>
  );
}
