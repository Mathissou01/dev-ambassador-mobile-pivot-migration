// eslint-disable-next-line @typescript-eslint/no-var-requires
const chroma = require('chroma-js');

class ColorConfig {
  /* Externally loaded colors with fallback values, used to generate site palette */
  // Brand Colors
  primaryColor = null;
  primaryColorDark = null;
  primaryColorLight = null;
  secondaryColor = null;
  secondaryColorDark = null;
  secondaryColorLight = null;

  constructor(primaryColorSelected, secondaryColorSelected) {
    /* Default values */
    const defaultPrimaryColor = '#0086cc';
    const defaultSecondaryColor = '#ffc229';

    this.primaryColor = primaryColorSelected;
    this.secondaryColor = secondaryColorSelected;
    this.primaryColorDark = chroma(primaryColor).darken().hex();
    this.primaryColorExtradark = chroma(primaryColor).darken(2).hex();
    this.primaryColorLight = chroma(primaryColor).alpha(0.3).hex();
    this.primaryColorExtraLight = chroma(primaryColor).alpha(0.1).hex();
    // -----------------------------------------------------------------
    this.secondaryColorDark = chroma(secondaryColor).darken().hex();
    this.secondaryColorExtradark = chroma(secondaryColor).darken(2).hex();
    this.secondaryColorLight = chroma(secondaryColor).alpha(0.3).hex();
    this.secondaryColorExtraLight = chroma(secondaryColor).alpha(0.1).hex();
  }

  getColors = () => {
    return {
      primaryColor: this.primaryColor,
      primaryColorDark: this.primaryColorDark,
      primaryColorLight: this.primaryColorLight,
      secondaryColor: this.secondaryColor,
      secondaryColorDark: this.secondaryColorDark,
      secondaryColorLight: this.secondaryColorLight,
    };
  };

  static Builder = class {
    primaryColor = null;
    primaryColorDark = null;
    primaryColorLight = null;
    secondaryColor = null;
    secondaryColorDark = null;
    secondaryColorLight = null;

    setPrimaryColor(color) {
      this.primaryColor = color;
      return this;
    }

    setSecondaryColor(color) {
      this.secondaryColor = color;
      return this;
    }

    build() {
      return new ColorConfig(this.primaryColor, this.secondaryColor);
    }
  };
}

let colorsConfig = null;
const generateColors = (primaryColorInput, secondaryColorInput) => {
  if (!colorsConfig) {
    colorsConfig = new ColorConfig.Builder()
      .setPrimaryColor(primaryColorInput)
      .setSecondaryColor(secondaryColorInput)
      .build();
  }
  return colorsConfig;
};
module.exports = {
  generateColors,
  colors: colorsConfig?.getColors(),
};
