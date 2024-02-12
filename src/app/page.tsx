"use client"
import axios from "axios";
import Image from "next/image";
import { useState } from "react";

export default function Home() {

  const [testValue,setTestValue] = useState<string>("")

  const handleFastApiData = async () => {

    try{

      const response = await axios.get('/api/hello')

      setTestValue(response.data.message)

      return response.data

    }catch(error)
    {
      console.log(error)
    }

  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex gap-4">
          HERE IS THE FAST API
          
          <button onClick={handleFastApiData}>
            TEST API
          </button>

          {testValue && <p>
              {testValue}
            </p>}
      </div>
    </main>
  );
}
