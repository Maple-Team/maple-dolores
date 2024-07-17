import { createTheme, responsiveFontSizes } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#003c6d',
      contrastText: '#fff',
    },
    secondary: {
      main: '#B0B0B0',
    },
  },
  typography: {
    fontFamily: ['Roboto', 'sans-serif'].join(','),
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          paddingTop: 12,
          paddingBottom: 12,
        },
      },
    },
  },
})

const exportTheme = responsiveFontSizes(theme)

export default exportTheme
