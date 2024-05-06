import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/nprogress/styles.css';
import '@mantine/tiptap/styles.css';
import { ColorSchemeScript, MantineColorsTuple, MantineProvider, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import './globals.css';

const rubik = Rubik({ subsets: ["latin"] });

const omegaColors: MantineColorsTuple = [
  "#fff6e1",
  "#ffeccc",
  "#ffd79b",
  "#ffc164",
  "#ffae38",
  "#ffa31b",
  "#ff9d09",
  "#e38800",
  "#ca7800",
  "#b06700"
]

const omegaTheme = createTheme({
  colors: {
    omegaColors
  },
  white: '#F9F6EE',
  primaryColor: 'omegaColors',
});

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
