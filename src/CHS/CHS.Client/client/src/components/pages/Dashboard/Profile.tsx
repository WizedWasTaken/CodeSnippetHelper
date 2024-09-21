"use client";

import { useSession } from "@/lib/utils/session";
import Image from "next/image";

export default function Profile() {
  const session = useSession();
  return (
    <section className="flex justify-start flex-col md:flex-row gap-5 items-center w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input">
      <div className="flex-shrink-0">
        <Image
          src="/profile-pic.png"
          alt="Profile Picture"
          width={250}
          height={250}
          className="rounded-full border-2 border-slate-400"
        />
      </div>
      <div className="text-center md:text-left">
        <h1 className="text-4xl font-bold">
          Velkommen, {session.session?.user.Name.split(" ")[0]}
        </h1>
        <p className="text-xl text-gray-200">Du har XX opslag.</p>
      </div>
    </section>
  );
}
