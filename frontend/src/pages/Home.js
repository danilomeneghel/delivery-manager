import React, { Component, Fragment  } from 'react';
import withStyles from "@material-ui/styles/withStyles";
import { getUserLogged } from "../services/auth";
import styles from "../styles/global";

import TopBar from "../template/TopBar";

class Home extends Component {
	
	render() {
		
		const { classes } = this.props;
		const currentPath = this.props.location.pathname;
		
		return (
			<Fragment>
				<TopBar currentPath={currentPath} />
				<div className={classes.marginHome}>
					<h2>Welcome, {getUserLogged().name}!</h2>
					<span>Delivery Manager</span>
				</div>
			</Fragment>
		)
	}
}

export default withStyles(styles)(Home);