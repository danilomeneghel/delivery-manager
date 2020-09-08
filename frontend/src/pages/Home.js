import React, { Component, Fragment  } from 'react';
import withStyles from "@material-ui/styles/withStyles";
import styles from "../styles/global";

import TopBar from "../template/TopBar";

class Home extends Component {
	
	render() {
		
		const { classes } = this.props;
		const currentPath = this.props.location.pathname;

		return (
			<Fragment>
				<TopBar currentPath={currentPath} />
				<div className={classes.root}>
					<div className={classes.marginCenter}>
						<h2>Bem-vindo</h2>
						<span>Sistema de Delivery</span>
					</div>
				</div>
			</Fragment>
		)
	}
}

export default withStyles(styles)(Home);