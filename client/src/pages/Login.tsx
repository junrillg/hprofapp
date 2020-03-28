import React, { Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import AccountCircle from '@material-ui/icons/AccountCircle'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
  })
)

export default function Login() {
  const history = useHistory()

  const classes = useStyles()

  return (
    <Fragment>
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item>
          <AccountCircle />
        </Grid>
        <Grid item>
          <TextField id="input-with-icon-grid" label="With a grid" />
        </Grid>
      </Grid>
    </Fragment>
  )
}
