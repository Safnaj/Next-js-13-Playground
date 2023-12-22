import Navbar from "./components/Navbar";
import AuthContext from "./context/AuthContext";
import "react-datepicker/dist/react-datepicker.css";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <main className='bg-gray-100 min-h-screen w-screen text-black'>
          <AuthContext>
            <main className='max-w-screen-2xl m-auto bg-white'>
              <Navbar />
              {children}
            </main>
          </AuthContext>
        </main>
      </body>
    </html>
  );
}
