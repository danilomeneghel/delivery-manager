import React, { useState, useEffect, Fragment } from 'react';

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
			
			<br /><br />
		</Fragment>
	)
}

export default ViewForm