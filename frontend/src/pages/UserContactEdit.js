import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, IconButton } from "@material-ui/core";
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import { Form } from "../styles/form";
import NumberFormat from 'react-number-format';
import api from "../services/api";

const EditForm = props => {
	const [ item, setForm ] = useState(props.currentEdit)
	const [ msg, setMsg ] = useState({})
	const users = useState([{ "_id": "0", "name": "Select User" }].concat(props.users))
	const [ userSelected, setUserSelected ] = useState({ id: null, value: item.user })
	
	useEffect( () => { setForm(props.currentEdit) },
		[ props ]
	)

	const handleInputChange = event => {
		const { name, value } = event.target
		setForm({ ...item, [name]: value })
	}

	const saveItem = (_id, item) => {
		if(userSelected.id != null)
			item.user = userSelected.id
		else
			users[0].find(option => { 
				if(option.name === userSelected.value) 
					item.user = option._id 
				return null	
			})
		
		api.post('/user-contact-update/'+_id, { item })
		.then(response => {
			if(response.data.success) {
				setMsg({ success: response.data.success, error: "" })
				var items = {
					_id: item._id,
					user: userSelected.value,
					address: item.address,
					city: item.city,
					phone: item.phone
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
			
			<TextField
				select
				name="user"
				label="User"
				value={userSelected.value}
				onChange={e => setUserSelected({ id: e.currentTarget.id, value: e.target.value })}
				variant="outlined"
				fullWidth
				required
			>
				{users[0].map((option) => (
					<MenuItem key={option._id} id={option._id} value={option.name}>
						{option.name}
					</MenuItem>
				))}
			</TextField><br /><br />

			<TextField name="address" value={item.address} label="Address" variant="outlined" fullWidth onChange={handleInputChange} required /><br /><br />
			
			<TextField name="city" value={item.city} label="City" variant="outlined" fullWidth onChange={handleInputChange} required /><br /><br />
			
			<NumberFormat name="phone" value={item.phone} label="Phone" variant="outlined" fullWidth onChange={handleInputChange} customInput={TextField} format="(##)####-#####" mask="" required /><br /><br />

			<IconButton onClick={props.handleClose}><CancelIcon /> Cancel</IconButton>
			<IconButton type="submit"><SaveIcon /> Save</IconButton>
			<br /><br />
		</Form>
	)
}

export default EditForm