"use client";
import { usePathname } from 'next/navigation';
import { Box, Typography } from "@mui/material";
import Navbar from './components/navbar/navbar';
// import User from './User/page';


export default function Home({ children }: { children: React.ReactNode }) {

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        {/* <Navbar /> */}
        {/* <main style={{ flexGrow: 1, marginTop: "80px" }}>{children}</main> Nội dung các trang */}
    </div>
  );
}
