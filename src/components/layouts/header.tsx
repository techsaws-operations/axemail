"use client";

import Image from "next/image";

export function Header() {
  return (
    <>
      <header
        className="w-full h-[90px] bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-border/60 shadow-md"
      >
        <div className="md:max-w-3xl layout-standard h-full flex items-center gap-3">
            <Image
              src="/logo.svg"
              alt="Axemail"
              height={60}
              width={60}
              className="opacity-95"
              priority
            />
            <span className="md:text-xl text-base font-medium tracking-tight text-foreground">
              Axemail
            </span>
          </div>
      </header>
    </>
  );
}
