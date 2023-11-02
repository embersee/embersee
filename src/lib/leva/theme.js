const theme = {
  colors: {
    elevation1: "#000", // bg color of the root panel (main title bar)
    elevation2: "#090909", // bg color of the rows (main panel color)
    elevation3: "#242424", // bg color of the inputs
    accent1: "#b9ff70",
    accent2: "#d0428e",
    accent3: "#d0428e",
    highlight1: "$accent1",
    highlight2: "$accent1",
    highlight3: "#000",
    vivid1: "#ffcc00",
    folderWidgetColor: "$highlight3",
    folderTextColor: "$highlight3",
    toolTipBackground: "$highlight3",
    toolTipText: "$elevation2",
  },
  radii: {
    xs: "2px",
    sm: "4px",
    lg: "8px",
  },
  space: {
    xs: "4px",
    sm: "8px",
    md: "14px",
    rowGap: "16px",
    colGap: "16px",
  },
  fonts: {
    mono: `Geist Mono, ui-monospace, SFMono-Regular, Menlo, 'Roboto Mono', monospace`,
    sans: `system-ui, sans-serif`,
  },
  fontSizes: {
    root: "12px",
    toolTip: "$root",
  },
  sizes: {
    rootWidth: "328px",
    controlWidth: "178px",
    numberInputMinWidth: "40px",
    scrubberWidth: "12px",
    scrubberHeight: "20px",
    rowHeight: "20px",
    folderTitleHeight: "20px",
    checkboxSize: "20px",
    joystickWidth: "100px",
    joystickHeight: "100px",
    colorPickerWidth: "$controlWidth",
    colorPickerHeight: "100px",
    imagePreviewWidth: "$controlWidth",
    imagePreviewHeight: "100px",
    monitorHeight: "60px",
    titleBarHeight: "32px",
  },
  shadows: {
    level1: "unset",
    level2: "unset",
  },
  borderWidths: {
    root: "0px",
    input: "0px",
    focus: "0px",
    hover: "0px",
    active: "0px",
    folder: "0px",
  },
  fontWeights: {
    label: "normal",
    folder: "normal",
    button: "normal",
  },
};

export default theme;
