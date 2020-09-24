import React, { useState } from 'react';
import { TextField, MenuItem, IconButton } from "@material-ui/core";
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import { Form } from "../styles/form";
import NumberFormat from 'react-number-format';
import api from "../services/api";

const AddForm = props => {
	const [ item, setForm ] = useState([])
	const [ msg, setMsg ] = useState({})
	const users = useState([{ "_id": "0", "name": "Select User" }].concat(props.users))
	const [ userSelected, setUserSelected ] = useState({ id: null, value: users[0][0].name })
	
	const handleInputChange = event => {
		const { name, value } = event.target
		setForm({ ...item, [name]: value })
	}
	
	const saveItem = item => {
		item.user = userSelected.id
		
		api.post('/user-contact-create', { item })
		.then(response => {
			if(response.data.success) {
				setMsg({ success: response.data.success, error: "" })
				var result = response.data.result
				var items = {
					_id: result._id,
					user: userSelected.value,
					address: result.address,
					city: result.city,
					phone: result.phone
				}
				props.addForm(items)
				setForm([])
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
				saveItem(item)
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

export default AddForm