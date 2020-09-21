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
				<legend>Username:</legend>
				{item.username}
			</fieldset>

			<fieldset>
				<legend>E-mail:</legend>
				{item.email}
			</fieldset>

			<fieldset>
				<legend>Role:</legend>
				{item.role}
			</fieldset>

			<fieldset>
				<legend>Status:</legend>
				{item.status}
			</fieldset>

			<br />
			<IconButton onClick={props.handleClose}><CancelIcon /> Close</IconButton>
		</Fragment>
	)
}

export default ViewForm