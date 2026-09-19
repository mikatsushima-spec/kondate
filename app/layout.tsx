import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
 title:"きょうのごはん | 給食と夕食", description:"きょうの給食、なにかな？ 家族で使う、給食と夕食の献立アプリ。",
 manifest:"/manifest.webmanifest", appleWebApp:{capable:true,title:"きょうのごはん",statusBarStyle:"default"},
 icons:{icon:"/favicon.svg",shortcut:"/favicon.svg",apple:"/icon-192.png"}
};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="ja"><body>{children}</body></html>;}
