export default function RootLayout({ children }) {
  return (
    <html>
      <body style={{ background: "#000", color: "#fff" }}>
        {children}
      </body>
    </html>
  );
}
