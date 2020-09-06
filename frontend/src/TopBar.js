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
import styles from "./styles/global";

class TopBar extends Component {

  state = {
    value: 0,
    menuDrawer: false,
    anchorEl: false
  };
  
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleMenu = event => {
    this.setState({ anchorEl: true });
  };

  handleClose = event => {
    this.setState({ anchorEl: false });
  };

  mobileMenuOpen = event => {
    this.setState({ menuDrawer: true });
  };

  mobileMenuClose = event => {
    this.setState({ menuDrawer: false });
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  };
  
  menuLinks = [
    {
      label: "Home",
      pathname: "/",
      value: 0
    },
    {
      label: "Orders",
      pathname: "/orders",
      value: 1
    },
    {
      label: "Products",
      pathname: "/products",
      value: 2
    },
    {
      label: "Users",
      pathname: "/users",
      value: 3
    },
    {
      label: "UsersContacts",
      pathname: "/users-contacts",
      value: 4
    }
  ];
  
  tabCurrent = () => {
    var current = 0;
    this.menuLinks.forEach((item, index) => {
      if (item.pathname === this.props.currentPath) 
        current = item.value;
    });
    return current;
  };

  render() {
    
    const { classes } = this.props;

    return (
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Grid container spacing={12} alignItems="baseline">
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
                      anchor="right"
                      open={this.state.menuDrawer}
                      onClose={this.mobileMenuClose}
                      onOpen={this.mobileMenuOpen}
                    >
                      <AppBar title="Menu" />
                      <List>
                        {this.menuLinks.map((item, index) => (
                          <ListItem
                            component={item.external ? MaterialLink : Link}
                            href={item.external ? item.pathname : null}
                            to={
                              item.external ? null : {
                                pathname: item.pathname,
                                search: this.props.location.search
                              }
                            }
                            button
                            key={item.label}
                          >
                            <ListItemText primary={item.label} />
                          </ListItem>
                        ))}
                      </List>
                    </SwipeableDrawer>
                    <Tabs
                      value={this.tabCurrent()}
                      indicatorColor="primary"
                      textColor="primary"
                      onChange={this.handleChange}
                    >
                      {this.menuLinks.map((item, index) => (
                        <Tab
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
                      ))}
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
                open={this.state.anchorEl}
                onClose={this.handleClose}
                className={classes.menuTopAccount}
                >
                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                    <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                </Menu>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withRouter(withStyles(styles)(TopBar));