import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/nprogress/styles.css';
import '@mantine/tiptap/styles.css';
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import './globals.css';
import { omegaTheme } from "@/lib/theme/omega-theme";

const rubik = Rubik({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Omega",
  description: "Omega repository system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={rubik.className}>
        {/* <MantineProvider theme={{ white: "#F9F6EE" }}> */}
        <MantineProvider theme={omegaTheme}>
          <Notifications />
          {children}
        </MantineProvider>
      </body>
    </html >
  );
}
