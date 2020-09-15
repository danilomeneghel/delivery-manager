import React, { useState } from 'react';
import { Form } from "../styles/form";
import api from "../services/api";

const AddForm = props => {
	const [ item, setForm ] = useState([])
	const [ msg, setMsg ] = useState({})
	const users = useState(props.users)
	const products = useState(props.products)
	
	const handleInputChange = event => {
		const { name, value } = event.target
		setForm({ ...item, [name]: value })
	}
	
	const saveItem = item => {
		api.post('/user-contact-create', { item })
		.then(response => {
			var id = { _id: response.data.result._id }
			item = { ...id, ...item }
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

	const optionsUsers = users[0].map((opt) => 
		<option key={opt._id} value={opt._id}>{opt.name}</option>
	)
	
	const optionsProducts = products[0].map((opt) => 
		<option key={opt._id} value={opt._id}>{opt.name}</option>
	)

	return (
		<Form
			onSubmit={event => {
				event.preventDefault()
				saveItem(item)
			}}
		>
			{msg.success && <p>{msg.success}</p>}
          	{msg.error && <p>{msg.error}</p>}
			
			<label>User</label><br />
			<select name="user" onChange={handleInputChange} required>
				{optionsUsers}			
			</select><br />

			<label>Product</label><br />
			<select name="product" onChange={handleInputChange} required>
				{optionsProducts}			
			</select><br />

			<label>Quantity: </label><br />
			<input type="text" name="quantity" value={item.quantity} onChange={handleInputChange} required /><br />

			<label>Delivery Date: </label><br />
			<input type="datetime-local" name="deliveryDate" value={item.deliveryDate} onChange={handleInputChange} required /><br />

			<button><i className="fa fa-close"></i> Cancel</button> 
			<button><i className="fa fa-hdd-o"></i> Save</button>
			<br /><br />
		</Form>
	)
}

export default AddForm