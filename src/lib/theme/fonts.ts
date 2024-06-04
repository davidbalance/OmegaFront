import { HeadingStyle, MantineFontSizesValues, MantineLineHeightValues, MantineThemeOther, rem } from "@mantine/core";


export const h1: HeadingStyle = { fontSize: rem(30), lineHeight: '125%' }
export const h2: HeadingStyle = { fontSize: rem(25), lineHeight: '125%' }
export const h3: HeadingStyle = { fontSize: rem(20), lineHeight: '125%' }
export const h4: HeadingStyle = { fontSize: rem(16), lineHeight: '125%' }
export const h5: HeadingStyle = { fontSize: rem(14), lineHeight: '125%' }
export const h6: HeadingStyle = { fontSize: rem(13), lineHeight: '125%' }

export const fontSizes: MantineFontSizesValues = {
    xs: rem(10),
    sm: rem(12),
    md: rem(14),
    lg: rem(16),
    xl: rem(18)
}

export const lineHeights: MantineLineHeightValues = {
    xs: rem(12),
    sm: rem(14),
    md: rem(16),
    lg: rem(18),
    xl: rem(20)
}