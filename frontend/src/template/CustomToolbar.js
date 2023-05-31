import React, { Component, Fragment  } from 'react';
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";

const defaultToolbarStyles = {
  iconButton: {},
}

class CustomToolbar extends Component {
  
  render() {
    
    const { classes } = this.props;
  
    return (
      <Fragment>
        <Tooltip title={"Add Item"}>
          <IconButton className={classes.iconButton} onClick={this.props.addItem}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Fragment>
    );
  }

}

export default withStyles(defaultToolbarStyles, { name: "CustomToolbar" })(CustomToolbar);