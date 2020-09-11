import React, { useState, useEffect, Fragment } from 'react';

const ViewForm = props => {
	const [ item, set ] = useState(props.currentEdit)
	useEffect( () => { set(props.currentEdit) },
		[ props ]
	)

	return (
		<Fragment>
			<label>Nome:&nbsp;</label>
			{item.name}<br />

			<label>Usuario:&nbsp;</label>
			{item.username}<br />

			<label>E-mail:&nbsp;</label>
			{item.email}<br />

			<label>Role:&nbsp;</label>
			{item.role}<br />
			
			<label>Status:&nbsp;</label>
			{item.status}<br />
		</Fragment>
	)
}

export default ViewForm