import React, { useState, useEffect } from 'react';
import { Form } from "../styles/form";
import api from "../services/api";

const EditForm = props => {
	const [ item, setForm ] = useState(props.currentEdit)
	const [ msg, setMsg ] = useState({})

	useEffect( () => { setForm(props.currentEdit) },
		[ props ]
	)

	const handleInputChange = event => {
		const { name, value } = event.target
		setForm({ ...item, [name]: value })
	}

	const saveItem = (_id, item) => {
		api.post('/user-update/'+_id, { item })
		.then(response => {
			if(response.data.success) {
				setMsg({ success: response.data.success, error: "" })
				var items = {
					_id: item._id,
					name: item.name,
					username: item.username,
					email: item.email,
					role: item.role,
					status: item.status
				}
				props.editForm(item._id, items)
			} else {
				setMsg({ error: "Registration error", success: "" })
			}
		})
		.catch(err => {
			setMsg({ error: "Registration error", success: "" })
		})
	}

	return (
		<Form
		  onSubmit={event => {
			event.preventDefault()
			saveItem(item._id, item)
		  }}
		>
			{msg.success && <p>{msg.success}</p>}
          	{msg.error && <p>{msg.error}</p>}
			
			<label>Name</label><br />
			<input type="text" name="name" value={item.name} onChange={handleInputChange} required /><br />

			<label>Username</label><br />
			<input type="text" name="username" value={item.username} onChange={handleInputChange} required /><br />

			<label>E-mail</label><br />
			<input type="email" name="email" value={item.email} onChange={handleInputChange} required /><br />

			<label>Password</label><br />
			<input type="text" name="password" value={item.password} onChange={handleInputChange} required /><br />
			
			<label>Role</label><br />
			<select name="role" value={item.role} onChange={handleInputChange} required>
				<option value="">Role</option>
				<option value="admin">Admin</option>
				<option value="user">User</option>
			</select><br />

			<label>Status</label><br />
			<select name="status" value={item.status} onChange={handleInputChange} required>
				<option value="">Status</option>
				<option value="active">Active</option>
				<option value="inactive">Inactive</option>
			</select><br /><br />

			<button type="reset"><i className="fa fa-close"></i> Cancel</button> 
			<button type="submit"><i className="fa fa-hdd-o"></i> Save</button>
		</Form>
	)
}

export default EditForm