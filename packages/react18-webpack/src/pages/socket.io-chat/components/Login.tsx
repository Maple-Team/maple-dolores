import { Button, Container, Grid, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import React, { useCallback } from 'react'
import * as Yup from 'yup'

const initialValues = {
  username: '',
  room: '',
}

const validationSchema = Yup.object().shape({
  username: Yup.string().required(),
  room: Yup.string().required(),
})
interface Props {
  setRoom?: (room: string) => void
  setUsername?: (name: string) => void
  setIsLoggedIn?: (logged: boolean) => void
}
function Login({ setRoom, setUsername, setIsLoggedIn }: Props) {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: () => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      onLogin()
    },
  })

  const onLogin = useCallback(() => {
    setUsername?.(formik.values.username)
    setRoom?.(formik.values.room)
    setIsLoggedIn?.(true)
  }, [formik.values.room, formik.values.username, setIsLoggedIn, setRoom, setUsername])

  return (
    <Container>
      <Grid
        container
        gap={5}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="97vh"
      >
        <Grid
          item
          sx={{ width: '60%' }}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            color="primary"
          >
            Hello!
          </Typography>
          <Typography color="secondary">Login with your username</Typography>
        </Grid>
        <Grid
          item
          sx={{ width: '60%' }}
        >
          <TextField
            id="outlined-basic"
            name="username"
            label="Username"
            variant="outlined"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            error={!!formik.errors.username}
            helperText={formik.touched.username && formik.errors.username && 'Username cannot be empty'}
          />
        </Grid>
        <Grid
          item
          sx={{ width: '60%' }}
        >
          <TextField
            id="outlined-basic"
            name="room"
            label="Room"
            variant="outlined"
            value={formik.values.room}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            error={!!formik.errors.room}
            helperText={formik.touched.room && formik.errors.room && 'Room cannot be empty'}
          />
        </Grid>
        <Grid
          item
          sx={{ width: '60%' }}
        >
          <Button
            fullWidth
            variant="contained"
            type="submit"
            onClick={formik.handleSubmit}
          >
            Login
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Login
