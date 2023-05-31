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
				<legend>User:</legend>
				{item.user}
			</fieldset>

			<fieldset>
				<legend>Address:</legend>
				{item.address}
			</fieldset>

			<fieldset>
				<legend>City:</legend>
				{item.city}
			</fieldset>

			<fieldset>
				<legend>Phone:</legend>
				{item.phone}
			</fieldset>

			<br />
			<IconButton onClick={props.handleClose}><CancelIcon /> Close</IconButton>
		</Fragment>
	)
}

export default ViewForm