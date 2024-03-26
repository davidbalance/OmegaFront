import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/nprogress/styles.css';
import { ColorSchemeScript, MantineColorsTuple, MantineProvider, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import './globals.css';

const rubik = Rubik({ subsets: ["latin"] });

const omegaColors: MantineColorsTuple = [
  '#fff0e4',
  '#ffe0cf',
  '#fac0a1',
  '#f69e6e',
  '#f28043',
  '#f06d27',
  '#f06418',
  '#d6530c',
  '#bf4906',
  '#a73c00'
];

const omegaTheme = createTheme({
  colors: {
    omegaColors
  },
  white: '#F9F6EE',
  primaryColor: 'omegaColors',
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
