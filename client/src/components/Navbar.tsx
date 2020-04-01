import React, { useState, Fragment, FunctionComponent } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import DashboardIcon from '@material-ui/icons/Dashboard'
import MenuIcon from '@material-ui/icons/Menu'
import GroupIcon from '@material-ui/icons/Group'
import { Avatar } from '@material-ui/core'

import { logOut } from 'features/session/sessionActions'
import { getSession } from 'features/session/selectors'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    menuItem: {
      padding: theme.spacing(3),
    },
    menuList: {
      minWidth: `20rem`,
      padding: 0,
    },
    avatar: {
      backgroundColor: theme.palette.primary.main,
    },
  })
)

interface OwnProps {}

type Props = OwnProps

const Navbar: FunctionComponent<Props> = (props) => {
  const classes = useStyles()

  const session = useSelector(getSession)
  const [open, setOpen] = useState(false)

  const dispatch = useDispatch()

  const handleToggleDrawer = () => setOpen(!open)

  const handleLogout = () => dispatch(logOut())

  const geFullName = () => {
    const { firstName, lastName } = session.data
    return `${firstName} ${lastName}`
  }

  return (
    <Fragment>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={handleToggleDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              HProf
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </div>
      <Drawer anchor="left" open={open} onClose={handleToggleDrawer}>
        <Paper className={classes.root}>
          <MenuList classes={{ root: classes.menuList }}>
            <MenuItem selected classes={{ root: classes.menuItem }}>
              <ListItemIcon>
                <Avatar className={classes.avatar}>{geFullName()}</Avatar>
              </ListItemIcon>
              <Typography variant="h6">User</Typography>
            </MenuItem>
            <MenuItem classes={{ root: classes.menuItem }}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <Typography variant="h6">Dashboard</Typography>
            </MenuItem>
            <MenuItem classes={{ root: classes.menuItem }}>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <Typography variant="h6">Household</Typography>
            </MenuItem>
          </MenuList>
        </Paper>
      </Drawer>
    </Fragment>
  )
}

export default Navbar
