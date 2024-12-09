import "./globals.css";

export const metadata = {
  title: "Kalidash CRUD Project",
  description: "Sample Project generated by Kalidash",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="container-fluid mt-4">{children}</div>
      </body>
    </html>
  );
}
