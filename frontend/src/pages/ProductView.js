import React, { useState, useEffect, Fragment } from 'react';
import { IconButton } from "@material-ui/core";
import CancelIcon from '@material-ui/icons/Cancel';

const ViewForm = props => {
	const [ item, setForm ] = useState(props.currentView)
	useEffect( () => { setForm(props.currentView) },
		[ props ]
	)

	return (
		<Fragment>
			<fieldset>
				<legend>Name:</legend>
				{item.name}
			</fieldset>

			<fieldset>
				<legend>Price:</legend>
				{item.price}
			</fieldset>

			<fieldset>
				<legend>Description:</legend>
				{item.description}
			</fieldset>
			
			<br />
			<IconButton onClick={props.handleClose}><CancelIcon /> Close</IconButton>
		</Fragment>
	)
}

export default ViewForm