import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, IconButton } from "@material-ui/core";
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import { Form } from "../styles/form";
import api from "../services/api";

const EditForm = props => {
	const [ item, setForm ] = useState(props.currentEdit)
	const [ msg, setMsg ] = useState({})
	const roles = props.roles
	const statuses = props.statuses
	const [ roleSelected, setRoleSelected ] = useState(item.role)
	const [ statusSelected, setStatusSelected ] = useState(item.status)
	
	useEffect( () => { setForm(props.currentEdit) },
		[ props ]
	)

	const handleInputChange = event => {
		const { name, value } = event.target
		setForm({ ...item, [name]: value })
	}

	const saveItem = (_id, item) => {
		item.role = roleSelected
		item.status = statusSelected
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
			
			<TextField name="name" value={item.name} label="Name" variant="outlined" fullWidth onChange={handleInputChange} required /><br /><br />
			
			<TextField name="username" value={item.username} label="Username" variant="outlined" fullWidth onChange={handleInputChange} required /><br /><br />
			
			<TextField name="email" value={item.email} label="E-mail" variant="outlined" fullWidth onChange={handleInputChange} required /><br /><br />
			
			<TextField name="password" value={item.password} label="Password" variant="outlined" fullWidth onChange={handleInputChange} required /><br /><br />
			
			<TextField
				select
				name="role"
				label="Role"
				value={roleSelected}
				onChange={e => setRoleSelected(e.target.value)}
				variant="outlined"
				fullWidth
			>
				{roles.map((option) => (
					<MenuItem key={option} value={option}>
						{option}
					</MenuItem>
				))}
			</TextField><br /><br />
			
			<TextField
				select
				name="status"
				label="Status"
				value={statusSelected}
				onChange={e => setStatusSelected(e.target.value)}
				variant="outlined"
				fullWidth
			>
				{statuses.map((option) => (
					<MenuItem key={option} value={option}>
						{option}
					</MenuItem>
				))}
			</TextField><br /><br />
			
			<IconButton onClick={props.handleClose}><CancelIcon /> Cancel</IconButton>
			<IconButton type="submit"><SaveIcon /> Save</IconButton>
		</Form>
	)
}

export default EditForm