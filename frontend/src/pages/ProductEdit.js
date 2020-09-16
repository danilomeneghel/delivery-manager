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
			
			<label>Name: </label><br />
			<input type="text" name="name" value={item.name} onChange={handleInputChange} required /><br />

			<label>Price: </label><br />
			<input type="text" name="price" value={item.price} onChange={handleInputChange} required /><br />

			<label>Description: </label><br />
			<input type="description" name="description" value={item.description} onChange={handleInputChange} required /><br /><br />

			<button type="reset"><i className="fa fa-close"></i> Cancel</button> 
			<button type="submit"><i className="fa fa-hdd-o"></i> Save</button>
		</Form>
	)
}

export default EditForm