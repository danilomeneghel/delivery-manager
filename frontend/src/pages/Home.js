import React, { Component, Fragment  } from 'react';
import withStyles from "@material-ui/styles/withStyles";
import { getToken } from "../services/auth";
import styles from "../styles/global";

import TopBar from "../template/TopBar";

class Home extends Component {
	
	render() {
		
		const { classes } = this.props;
		const currentPath = this.props.location.pathname;

		console.log(getToken());
		
		return (
			<Fragment>
				<TopBar currentPath={currentPath} />
				<div className={classes.marginHome}>
					<h2>Bem-vindo!</h2>
					<span>Sistema de Delivery</span>
				</div>
			</Fragment>
		)
	}
}

export default withStyles(styles)(Home);