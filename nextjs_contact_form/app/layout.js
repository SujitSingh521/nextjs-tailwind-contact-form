import "./globals.css";

export const metadata = {
  title: "Advanced Contact App",
  description: "Next.js 15+ contact form with Tailwind, NodeMailer, file upload, and modals",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className="bg-gray-100">
        {children}
      </body>
    </html>
  );
}
