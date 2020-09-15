import React, { useState, useEffect, Fragment } from 'react';

const ViewForm = props => {
	const [ item, setForm ] = useState(props.currentView)
	useEffect( () => { setForm(props.currentView) },
		[ props ]
	)

	return (
		<Fragment>
			<label>User:&nbsp;</label>
			{item.user}<br />

			<label>Product:&nbsp;</label>
			{item.product}<br />

			<label>Quantity:&nbsp;</label>
			{item.quantity}<br />

			<label>Date Delivery:&nbsp;</label>
			{item.dateDelivery}<br />
		</Fragment>
	)
}

export default ViewForm