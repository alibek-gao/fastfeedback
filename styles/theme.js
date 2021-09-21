import { extendTheme } from "@chakra-ui/react"

const overrides = {
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