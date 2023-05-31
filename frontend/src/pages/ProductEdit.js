import React, { useState, useEffect } from 'react';
import { TextField, IconButton } from "@material-ui/core";
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import { Form } from "../styles/form";
import NumberFormat from 'react-number-format';
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
		item.price = item.price.replace('$', '')

		api.post('/product-update/'+_id, { item })
		.then(response => {
			if(response.data.success) {
				setMsg({ success: response.data.success, error: "" })
				var items = {
					_id: item._id,
					name: item.name,
					price: item.price,
					description: item.description
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
			
			<NumberFormat name="price" value={item.price} label="Price" variant="outlined" fullWidth onChange={handleInputChange} customInput={TextField} thousandSeparator={false} prefix={'$'} required /><br /><br />
			
			<TextField name="description" value={item.description} label="Description" variant="outlined" fullWidth multiline rows={4} onChange={handleInputChange} required /><br /><br />
			
			<IconButton onClick={props.handleClose}><CancelIcon /> Cancel</IconButton>
			<IconButton type="submit"><SaveIcon /> Save</IconButton>
		</Form>
	)
}

export default EditForm