import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import React, { FC } from 'react'

interface OwnProps {}

type Props = OwnProps

const Copyright: FC<Props> = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Minty Code
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default Copyright
