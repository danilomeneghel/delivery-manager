import React, { useState } from 'react';
import { Form } from "../styles/form";
import api from "../services/api";

const AddForm = props => {
	const [ item, setForm ] = useState([])
	const [ msg, setMsg ] = useState({})
	
	const handleInputChange = event => {
		const { name, value } = event.target
		setForm({ ...item, [name]: value })
	}
	
	const sendItem = item => {
		api.post('/user-create', { item })
		.then(response => {
			var id = { _id: response.data.result._id }
			item = { ...id, ...item }
			delete item.password
			if(response.data.success) {
				setMsg({ success: response.data.success, error: "" })
				props.addForm(item)
				setForm([])
			} else {
				setMsg({ error: "Registration error", success: "" })
			}
		})
		.catch(err => {
			setMsg({ error: "Registration error or User already registered", success: "" })
		})
	}

	return (
		<Form
			onSubmit={event => {
				event.preventDefault()
				sendItem(item)
			}}
		>
			{msg.success && <p>{msg.success}</p>}
          	{msg.error && <p>{msg.error}</p>}
			
			<label>Name: </label><br />
			<input type="text" name="name" value={item.name} onChange={handleInputChange} required /><br />

			<label>Username: </label><br />
			<input type="text" name="username" value={item.username} onChange={handleInputChange} required /><br />

			<label>E-mail: </label><br />
			<input type="email" name="email" value={item.email} onChange={handleInputChange} required /><br />

			<label>Password</label><br />
			<input type="text" name="password" value={item.password} onChange={handleInputChange} required /><br />
			
			<label>Role</label><br />
			<select name="role" onChange={handleInputChange} required>
				<option value="">Role</option>
				<option value="admin">Admin</option>
				<option value="user">User</option>
			</select><br />

			<label>Status</label><br />
			<select name="status" onChange={handleInputChange} required>
				<option value="">Status</option>
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