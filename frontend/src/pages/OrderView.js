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
				<legend>Product:</legend>
				{item.product}
			</fieldset>

			<fieldset>
				<legend>Quantity:</legend>
				{item.quantity}
			</fieldset>

			<fieldset>
				<legend>Delivery Date:</legend>
				{item.deliveryDate}
			</fieldset>

			<fieldset>
				<legend>Note:</legend>
				{item.note}
			</fieldset>
			
			<br />
			<IconButton onClick={props.handleClose}><CancelIcon /> Close</IconButton>
		</Fragment>
	)
}

export default ViewForm