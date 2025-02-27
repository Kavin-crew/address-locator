export const metadata = {
  title: "Address Locator",
  description: "Know your current location",
  keywords: "address, location, current location",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
