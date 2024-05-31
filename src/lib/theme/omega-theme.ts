'use client'

import { Button, Input, PasswordInput, ScrollArea, TextInput, createTheme } from "@mantine/core";
import { orange, red, green, neutral, grayBlue, purple, blue, white, black } from "./color";
import { radiusValues } from "./radius";

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

    },
    radius: radiusValues,
    components: {
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
