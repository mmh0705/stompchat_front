import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {Navigation} from "./components/navigation";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="bg-slate-300"
      >
        <div className="flex flex-row justify-center bg-slate-900 text-white p-4 text-center fixed h-[60px] w-full">
          <Navigation/>
        </div>
        {
          //padding top을 헤더의 높이인 14를 줌으로써 
        }
        <div className="bg-blue-300 pt-[60px]">
          {children}
        </div>

        <div className="flex justify-center items-center bg-slate-900 text-white h-[60px] text-center">
          바이용
        </div>
      </body>
    </html>
  );
}
