import React, { FC, FormEvent, useState } from 'react'
import { Redirect } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { deepPurple } from '@material-ui/core/colors'
import { login } from 'features/session/sessionActions'
import { useDispatch, useSelector } from 'react-redux'
import { getSession } from 'features/session/selectors'
import { CircularProgress } from '@material-ui/core'

import Copyright from 'components/Copyright'
import Logo from 'components/Logo'
import Link from 'components/Link'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    marginBottom: theme.spacing(4),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formBackground: {
    backgroundColor: deepPurple[500],
  },
}))

interface OwnProps {}

type Props = OwnProps

const Login: FC<Props> = () => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const session = useSelector(getSession)

  const [formState, setFormState] = useState({
    data: {
      email: '',
      password: '',
    },
  })

  const handleFormState = (e: FormEvent<EventTarget>) => {
    const target = e.target as HTMLInputElement
    setFormState({
      ...formState,
      data: {
        ...formState.data,
        [target.name]: target.value,
      },
    })
  }

  const handleLogin = (e: FormEvent<EventTarget>) => {
    e.preventDefault()
    dispatch(login(formState.data))
  }

  if (session.loggedIn) return <Redirect to="/" />
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Logo />
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleFormState}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleFormState}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={session.loading ? () => {} : handleLogin}
          >
            {session.loading ? <CircularProgress color="inherit" /> : 'Login'}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="">Forgot password?</Link>
            </Grid>
            <Grid item>
              <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}

export default Login
