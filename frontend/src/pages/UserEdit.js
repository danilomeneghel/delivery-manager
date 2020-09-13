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
			<label>Name</label><br />
			<input type="text" name="name" value={item.name} onChange={handleInputChange} required /><br />

			<label>Username</label><br />
			<input type="text" name="username" value={item.username} onChange={handleInputChange} required /><br />

			<label>E-mail</label><br />
			<input type="email" name="email" value={item.email} onChange={handleInputChange} required /><br />

			<label>Password</label><br />
			<input type="text" name="password" value={item.password} onChange={handleInputChange} required /><br />
			
			<label>Role</label><br />
			<select name="role" value={item.role} onChange={handleInputChange}>
				<option value="0" disabled="disabled">Role</option>
				<option value="admin">Admin</option>
				<option value="user">User</option>
			</select><br />

			<label>Status</label><br />
			<select name="status" value={item.status} onChange={handleInputChange}>
				<option value="0" disabled="disabled">Status</option>
				<option value="active">Active</option>
				<option value="inactive">Inactive</option>
			</select><br /><br />

			<button type="reset"><i className="fa fa-close"></i> Cancel</button> 
			<button type="submit"><i className="fa fa-hdd-o"></i> Save</button>
		</Form>
	)
}

export default EditForm