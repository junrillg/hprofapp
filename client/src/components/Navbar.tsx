import React, { useState, Fragment, FunctionComponent } from 'react'
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
import { deepPurple } from '@material-ui/core/colors'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    appBar: {
      backgroundColor: deepPurple[500],
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
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    },
  })
)

interface OwnProps {}

type Props = OwnProps

const Navbar: FunctionComponent<Props> = (props) => {
  const classes = useStyles()

  const [open, setOpen] = useState(false)

  const handleToggleDrawer = () => setOpen(!open)

  return (
    <Fragment>
      <div className={classes.root}>
        <AppBar classes={{ root: classes.appBar }} position="static">
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
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </div>
      <Drawer anchor="left" open={open} onClose={handleToggleDrawer}>
        <Paper className={classes.root}>
          <MenuList classes={{ root: classes.menuList }}>
            <MenuItem selected classes={{ root: classes.menuItem }}>
              <ListItemIcon>
                <Avatar className={classes.avatar}>OP</Avatar>
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
