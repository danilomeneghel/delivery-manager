import React, { useState, useEffect } from 'react';
import { Form } from "../styles/form";
import api from "../services/api";

const EditForm = props => {
	const [ item, setForm ] = useState(props.currentEdit)
	const [ msg, setMsg ] = useState({})
	const users = useState(props.users)
	const products = useState(props.products)
	const [userSelected, setUserSelected] = useState(item.userSelected)
	const [productSelected, setProductSelected] = useState(item.productSelected)

	useEffect( () => { setForm(props.currentEdit) },
		[ props ]
	)

	const handleInputChange = event => {
		const { name, value } = event.target
		setForm({ ...item, [name]: value })
	}

	const saveItem = (_id, item) => {
		item.user = userSelected
		item.product = productSelected
		api.post('/user-contact-update/'+_id, { item })
		.then(response => {
			if(response.data.success) {
				setMsg({ success: response.data.success, error: "" });
				props.editForm(item._id, item)
			} else {
				setMsg({ error: "Registration error", success: "" });
			}
		})
		.catch(err => {
			setMsg({ error: "Registration error", success: "" });
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
			saveItem(item._id, item)
		  }}
		>
			date: {(item.deliveryDate || '').toString().replace(".000Z", "")}
			
			{msg.success && <p>{msg.success}</p>}
          	{msg.error && <p>{msg.error}</p>}
			
			<label>User</label><br />
			<select name="user" value={userSelected} onChange={e => setUserSelected(e.target.value)} required>
				{optionsUsers}
			</select><br />
			
			<label>Product</label><br />
			<select name="product" value={productSelected} onChange={e => setProductSelected(e.target.value)} required>
				{optionsProducts}
			</select><br />

			<label>Quantity: </label><br />
			<input type="text" name="quantity" value={item.quantity} onChange={handleInputChange} required /><br />

			<label>Delivery Date: </label><br />
			<input type="datetime-local" name="deliveryDate" value={(item.deliveryDate || '').toString().replace(".000Z", "")} onChange={handleInputChange} required /><br />

			<button><i className="fa fa-close"></i> Cancel</button> 
			<button><i className="fa fa-hdd-o"></i> Save</button>
		</Form>
	)
}

export default EditForm