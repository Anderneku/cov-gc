import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>NiggaChat</title>
      </head>
      <body className="w-screen h-screen flex flex-col justify-center items-center">
        <div className="bg-secondary w-full fixed top-0 left-0 text-secondary-foreground">
          <h1 className="font-bold text-5xl text-center">NiggaChat</h1>
        </div>
        {children}
      </body>
    </html>
  );
}
