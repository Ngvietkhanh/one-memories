export const metadata = {
  title: "One Memories",
  description: "A collaborative wedding-film atelier — Bay Area, California",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
