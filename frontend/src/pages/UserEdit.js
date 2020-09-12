import React, { useState, useEffect } from 'react';
import { Form } from "../styles/form";

const EditForm = props => {
	const [ item, setForm ] = useState(props.currentEdit)

	useEffect( () => { setForm(props.currentEdit) },
		[ props ]
	)

	const handleInputChange = event => {
		const { name, value } = event.target
		setForm({ ...item, [name]: value })
	}

	return (
		<Form
		  onSubmit={event => {
			event.preventDefault()
			props.editForm(item._id, item)
		  }}
		>
			<label>Nome</label>
			<input type="text" name="name" value={item.name} onChange={handleInputChange} /><br />

			<label>Usuario</label>
			<input type="text" name="username" value={item.username} onChange={handleInputChange} /><br />

			<label>E-mail</label>
			<input type="text" name="email" value={item.email} onChange={handleInputChange} /><br />

			<label>Role</label>
			<input type="text" name="role" value={item.role} onChange={handleInputChange} /><br />
			
			<label>Status</label>
			<input type="text" name="status" value={item.status} onChange={handleInputChange} /><br /><br />

			<button type="reset"><i className="fa fa-close"></i> Cancel</button> 
			<button type="submit"><i className="fa fa-hdd-o"></i> Save</button>
		</Form>
	)
}

export default EditForm