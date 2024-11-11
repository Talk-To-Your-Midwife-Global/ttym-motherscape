import { inter } from "./fonts";
import "./globals.css";

export const metadata = {
  title: "TTYM Global | Talk To Your Midwife",
  description: "Talk To Your Midwife",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <UserProvider> */}
          <body
            className={`${inter.className}`}
            >
            {children}
          </body>
        {/* </UserProvider> */}
    </html>
  );
}
