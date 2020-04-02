import React, { FC } from 'react'
import logoIcon from 'assets/logo.png'
import { makeStyles } from '@material-ui/core/styles'

interface OwnProps {
  size?: number | null
}

type Props = OwnProps

const useStyles = makeStyles((theme) => ({
  logo: {
    marginBottom: theme.spacing(4),
  },
}))

const Logo: FC<Props> = (props) => {
  const classes = useStyles()

  return (
    <div className={classes.logo}>
      <img src={logoIcon} width={props.size || 150} />
    </div>
  )
}

export default Logo
