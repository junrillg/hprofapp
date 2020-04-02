import React, { FC, ReactNode } from 'react'
import { Link as AnchorLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

interface OwnProps {
  to: string
  children: ReactNode
}

type Props = OwnProps

const useStyles = makeStyles((theme) => ({
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}))

const Link: FC<Props> = (props) => {
  const classes = useStyles()

  return (
    <AnchorLink to={props.to} className={classes.link}>
      {props.children}
    </AnchorLink>
  )
}

export default Link
