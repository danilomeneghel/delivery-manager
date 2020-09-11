import React, { useState } from 'react';
import { Form } from "../styles/form";

const AddForm = props => {
	const initialFormState = []
	const [ item, setForm ] = useState(initialFormState)
		
	const handleInputChange = event => {
		const { name, value } = event.target
		setForm({ ...item, [name]: value })
	}
	
	return (
		<Form
			onSubmit={event => {
				event.preventDefault()
				if (!item.name || !item.username) return
				props.addForm(item)
				setForm(initialFormState)
			}}
		>
			<label>Name: </label>
			<input type="text" name="name" value={item.name} onChange={handleInputChange}/><br />

			<label>Username: </label>
			<input type="text" name="username" value={item.username} onChange={handleInputChange}/><br />

			<label>E-mail: </label>
			<input type="text" name="email" value={item.email} onChange={handleInputChange}/><br />

			<label>Role: </label>
			<input type="text" name="role" value={item.role} onChange={handleInputChange}/><br />

			<label>Status: </label>
			<input type="text" name="status" value={item.status} onChange={handleInputChange}/><br /><br />

			<button><i className="fa fa-close"></i> Cancel</button> 
			<button><i className="fa fa-hdd-o"></i> Save</button>
			<br /><br />
		</Form>
	)
}

export default AddForm