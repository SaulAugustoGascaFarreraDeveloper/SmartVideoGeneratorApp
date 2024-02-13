import axios from "axios";
import Link from "next/link";
import { useState } from "react";

export default function Home() {

  

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href={'/chat'}>
        IR A CHAT
      </Link>
    </main>
  );
}
