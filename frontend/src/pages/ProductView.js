import React, { useState, useEffect, Fragment } from 'react';

const ViewForm = props => {
	const [ item, setForm ] = useState(props.currentView)
	useEffect( () => { setForm(props.currentView) },
		[ props ]
	)

	return (
		<Fragment>
			<label>Name:&nbsp;</label>
			{item.name}<br />

			<label>Price:&nbsp;</label>
			{item.price}<br />

			<label>Description:&nbsp;</label>
			{item.description}<br />
		</Fragment>
	)
}

export default ViewForm