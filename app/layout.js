import { montserrat } from "./fonts";
import "./globals.css";
import {UserProvider} from "@auth0/nextjs-auth0/client"



// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata = {
  title: "TTYM Global | Talk To Your Midwife",
  description: "Talk To Your Midwife",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <UserProvider>
          <body
            className={`${montserrat.className}`}
            >
            {children}
          </body>
        </UserProvider>
    </html>
  );
}
