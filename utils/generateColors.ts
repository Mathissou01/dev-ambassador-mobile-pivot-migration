import chroma from "chroma-js";

export const generateColors = (
    primaryColor: string | number | chroma.Color,
    secondaryColor: string | number | chroma.Color
) => {
    return {
        primaryExtraLight: chroma(primaryColor).brighten(2).hex(),
        primaryLight: chroma(primaryColor).brighten(1).hex(),
        primarySemiLight: chroma(primaryColor).brighten(0.5).hex(),
        primary: primaryColor,
        primarySemiDark: chroma(primaryColor).darken(0.5).hex(),
        primaryDark: chroma(primaryColor).darken(1).hex(),
        primaryExtraDark: chroma(primaryColor).darken(2).hex(),
        secondaryExtraLight: chroma(secondaryColor).brighten(2).hex(),
        secondaryLight: chroma(secondaryColor).brighten(1).hex(),
        secondarySemiLight: chroma(secondaryColor).brighten(0.5).hex(),
        secondary: secondaryColor,
        secondarySemiDark: chroma(secondaryColor).darken(0.5).hex(),
        secondaryDark: chroma(secondaryColor).darken(1).hex(),
        secondaryExtraDark: chroma(secondaryColor).darken(2).hex(),
    };
};
