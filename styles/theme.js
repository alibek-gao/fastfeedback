import { extendTheme } from "@chakra-ui/react"

const overrides = {
  colors: {
    teal: {
      50: "#E6FFFA",
      100: "#B2F5EA",
      200: "#81E6D9",
      300: "#4FD1C5",
      400: "#38B2AC",
      500: "#319795",
      600: "#2C7A7B",
      700: "#285E61",
      800: "#234E52",
      900: "#1D4044",
    },
  },
  styles: {
    global: {
      "html": {
        minWidth: "360px",
        scrollBehavior: "smooth",
      },
      "#__next": {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      },
    },
  },
  fonts: {
    body: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`
  },
  fontWeights: {
    normal: 400,
    medium: 600,
    bold: 700
  }
};
const theme = extendTheme(overrides)

export default theme;