import React, { useState } from 'react';
import { TextField, IconButton } from "@material-ui/core";
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import { Form } from "../styles/form";
import NumberFormat from 'react-number-format';
import api from "../services/api";

const AddForm = props => {
	const [ item, setForm ] = useState([])
	const [ msg, setMsg ] = useState({})
	
	const handleInputChange = event => {
		const { name, value } = event.target
		setForm({ ...item, [name]: value })
	}
	
	const saveItem = item => {
		item.price = item.price.replace('$', '')

		api.post('/product-create', { item })
		.then(response => {
			var id = { _id: response.data.result._id }
			item = { ...id, ...item }
			delete item.password
			if(response.data.success) {
				setMsg({ success: response.data.success, error: "" })
				var result = response.data.result
				var items = {
					_id: result._id,
					name: result.name,
					price: result.price,
					description: result.description
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
			
			<TextField name="name" value={item.name} label="Name" variant="outlined" fullWidth onChange={handleInputChange} required /><br /><br />
			
			<NumberFormat name="price" value={item.price} label="Price" variant="outlined" fullWidth onChange={handleInputChange} customInput={TextField} thousandSeparator={false} prefix={'$'} required /><br /><br />
			
			<TextField name="description" value={item.description} label="Description" variant="outlined" fullWidth multiline rows={4} onChange={handleInputChange} required /><br /><br />
			
			<IconButton onClick={props.handleClose}><CancelIcon /> Cancel</IconButton>
			<IconButton type="submit"><SaveIcon /> Save</IconButton>
		</Form>
	)
}

export default AddForm