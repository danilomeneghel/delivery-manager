import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { Link, withRouter } from "react-router-dom";
import { Grid, Typography, Toolbar, AppBar, Tabs, Tab, IconButton } from "@material-ui/core";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { Menu, MenuItem } from "@material-ui/core";
import { Link as MaterialLink } from "@material-ui/core";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import { getUserLogged } from "../services/auth";
import styles from "../styles/global";

class TopBar extends Component {

  constructor (props) {
		super(props);

    this.open = false;
    this.anchorEl = null;
	}
	
  state = {
    value: 0,
    menuDrawer: false,
    open: false,
    anchorEl: null
  }
  
  handleChange = (event, value) => {
    this.setState({ value });
  }

  handleMenu = (event) => {
    this.setState({ open: true, anchorEl: true });
  }

  handleClose = (event) => {
    this.setState({ open: false, anchorEl: false });
  }
 
  mobileMenuOpen = event => {
    this.setState({ menuDrawer: true });
  }

  mobileMenuClose = event => {
    this.setState({ menuDrawer: false });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }
  
  menuLinks = [
    {
      label: "Home",
      pathname: "/",
      access: [ "admin", "user" ],
      value: 0
    },
    {
      label: "Orders",
      pathname: "/orders",
      access: [ "admin", "user" ],
      value: 1
    },
    {
      label: "Products",
      pathname: "/products",
      access: [ "admin" ],
      value: 2
    },
    {
      label: "Users",
      pathname: "/users",
      access: [ "admin" ],
      value: 3
    },
    {
      label: "Contacts",
      pathname: "/users-contacts",
      access: [ "admin", "user" ],
      value: 4
    }
  ]
  
  tabCurrent = () => {
    var current = 0;
    this.menuLinks.forEach((item, index) => {
      if (item.pathname === this.props.location.pathname) 
        current = item.value;
    });
    return current;
  }

  render() {
    
    const { classes } = this.props;
    
    return (
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Grid container alignItems="baseline">
            <Grid item className={classes.flex}>
              <div className={classes.inline}>
                <Typography variant="h6" color="inherit" noWrap>
                  <Link to="/" className={classes.link}>
                    <span className={classes.tagline}>Delivery</span>
                  </Link>
                </Typography>
              </div>
              {!this.props.noTabs && (
                <React.Fragment>
                  <div className={classes.iconContainer}>
                    <IconButton
                      onClick={this.mobileMenuOpen}
                      className={classes.iconButton}
                      color="inherit"
                      aria-label="Menu"
                    >
                      <MenuIcon />
                    </IconButton>
                  </div>
                  <div className={classes.tabContainer}>
                    <SwipeableDrawer
                      anchor="left"
                      open={this.state.menuDrawer}
                      onClose={this.mobileMenuClose}
                      onOpen={this.mobileMenuOpen}
                    >
                      <AppBar title="Menu" />
                      <List>
                        {this.menuLinks.map((item, index) => {
                          /* eslint eqeqeq: 0 */
                          if (item.access[0] == getUserLogged().role || item.access[1] == getUserLogged().role)
                            return <ListItem
                              button
                              key={index}
                              component={item.external ? MaterialLink : Link}
                              href={item.external ? item.pathname : null}
                              to={
                                item.external ? null : {
                                  pathname: item.pathname,
                                  search: this.props.location.search
                                }
                              }
                            >
                              <ListItemText primary={item.label} />
                            </ListItem>
                          return null
                        })}
                      </List>
                    </SwipeableDrawer>
                    <Tabs
                      value={this.tabCurrent()}
                      indicatorColor="primary"
                      textColor="primary"
                      onChange={this.handleChange}
                    >
                      {this.menuLinks.map((item, index) => {
                        /* eslint eqeqeq: 0 */
                        if (item.access[0] == getUserLogged().role || item.access[1] == getUserLogged().role)
                          return <Tab
                            key={index}
                            component={item.external ? MaterialLink : Link}
                            href={item.external ? item.pathname : null}
                            to={item.external ? null : {
                                pathname: item.pathname,
                                search: this.props.location.search
                              }
                            }
                            classes={{ root: classes.tabItem }}
                            label={item.label}
                          />
                        return null
                      })}
                    </Tabs>
                  </div>
                </React.Fragment>
              )}
            </Grid>
            <Grid item xs />
            <Grid item>
                <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
                className={classes.iconAccountMargin}
                >
                    <AccountCircle className={classes.iconAccount} />
                </IconButton>
                <Menu
                id="menu-appbar"
                anchorEl={this.anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={this.state.open}
                onClose={this.handleClose}
                className={classes.menuTopAccount}
                >
                    <MenuItem>Profile</MenuItem>
                    <MenuItem><Link to="/logout">Logout</Link></MenuItem>
                </Menu>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withRouter(withStyles(styles)(TopBar));