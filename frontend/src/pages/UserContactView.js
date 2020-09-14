import React, { useState, useEffect, Fragment } from 'react';

const ViewForm = props => {
	const [ item, setForm ] = useState(props.currentView)
	useEffect( () => { setForm(props.currentView) },
		[ props ]
	)

	return (
		<Fragment>
			<label>User:&nbsp;</label>
			{item.user.name}<br />

			<label>Address:&nbsp;</label>
			{item.address}<br />

			<label>City:&nbsp;</label>
			{item.city}<br />

			<label>Phone:&nbsp;</label>
			{item.phone}<br />
		</Fragment>
	)
}

export default ViewForm