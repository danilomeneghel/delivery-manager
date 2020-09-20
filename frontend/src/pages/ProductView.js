import React, { useState, useEffect, Fragment } from 'react';

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
			
			<br /><br />
		</Fragment>
	)
}

export default ViewForm