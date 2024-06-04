'use client'

import { Button, Input, PasswordInput, ScrollArea, Text, TextInput, createTheme } from "@mantine/core";
import { orange, red, green, neutral, grayBlue, purple, blue, white, black } from "./color";
import { radiusValues } from "./radius";
import { fontSizes, h1, h2, h3, h4, h5, h6, lineHeights } from "./fonts";

export const omegaTheme = createTheme({
    white: white,
    black: black,
    primaryColor: 'omegaColors',
    colors: {
        omegaColors: orange,
        orange: orange,
        red: red,
        green: green,
        neutral: neutral,
        grayBlue: grayBlue,
        purple: purple,
        blue: blue,
    },
    headings: {
        sizes: {
            h1: h1,
            h2: h2,
            h3: h3,
            h4: h4,
            h5: h5,
            h6: h6,
        }
    },
    lineHeights: lineHeights,
    fontSizes: fontSizes,
    radius: radiusValues,
    components: {
        Text: Text.extend({
            defaultProps: {
                size: 'sm'
            }
        }),
        Button: Button.extend({
            defaultProps: {
                radius: 'sm'
            }
        }),
        Input: Input.extend({
            defaultProps: {
                size: "xs"
            }
        }),
        PasswordInput: PasswordInput.extend({
            defaultProps: {
                size: "xs"
            }
        }),
        TextInput: TextInput.extend({
            defaultProps: {
                size: "xs"
            }
        }),
        ScrollArea: ScrollArea.extend({
            defaultProps: {
                scrollbarSize: 2
            }
        })
    },
    other: {

    }
});
