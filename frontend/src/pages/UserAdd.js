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
				props.addForm(item)
				setForm(initialFormState)
			}}
		>
			<label>Name: </label><br />
			<input type="text" name="name" value={item.name} onChange={handleInputChange}/><br />

			<label>Username: </label><br />
			<input type="text" name="username" value={item.username} onChange={handleInputChange}/><br />

			<label>E-mail: </label><br />
			<input type="text" name="email" value={item.email} onChange={handleInputChange}/><br />

			<label>Password</label><br />
			<input type="text" name="password" value={item.password} onChange={handleInputChange} /><br />
			
			<label>Role</label><br />
			<select name="role" onChange={handleInputChange}>
				<option value="" disabled="disabled">Role</option>
				<option value="admin">Admin</option>
				<option value="user">User</option>
			</select><br />

			<label>Status</label><br />
			<select name="status" onChange={handleInputChange}>
				<option value="" disabled="disabled">Status</option>
				<option value="active">Active</option>
				<option value="inactive">Inactive</option>
			</select><br /><br />

			<button><i className="fa fa-close"></i> Cancel</button> 
			<button><i className="fa fa-hdd-o"></i> Save</button>
			<br /><br />
		</Form>
	)
}

export default AddForm