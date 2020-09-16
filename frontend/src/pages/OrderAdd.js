import React, { useState } from 'react';
import { Form } from "../styles/form";
import api from "../services/api";

const AddForm = props => {
	const [ item, setForm ] = useState([])
	const [ msg, setMsg ] = useState({})
	const users = useState(props.users)
	const products = useState(props.products)
	const [ userSelected, setUserSelected ] = useState(0)
	const [ productSelected, setProductSelected ] = useState(0)

	const handleInputChange = event => {
		const { name, value } = event.target
		setForm({ ...item, [name]: value })
	}
	
	const saveItem = item => {
		item.user = userSelected
		item.product = productSelected
		api.post('/order-create', { item })
		.then(response => {
			if(response.data.success) {
				setMsg({ success: response.data.success, error: "" })
				var result = response.data.result
				var items = {
					_id: result._id,
					user: result.user,
					product: result.product,
					quantity: result.quantity,
					deliveryDate: result.deliveryDate,
					note: result.note
				}
				props.addForm(items)
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
			<select name="user" value={userSelected} onChange={e => setUserSelected(e.target.value)} required>
				<option key="0" value="0" disabled>Select User</option>
				{optionsUsers}
			</select><br />
			
			<label>Product</label><br />
			<select name="product" value={productSelected} onChange={e => setProductSelected(e.target.value)} required>
				<option key="0" value="0" disabled>Select Product</option>
				{optionsProducts}
			</select><br />

			<label>Quantity: </label><br />
			<input type="text" name="quantity" value={item.quantity} onChange={handleInputChange} required /><br />

			<label>Delivery Date: </label><br />
			<input type="datetime-local" name="deliveryDate" value={item.deliveryDate} onChange={handleInputChange} required /><br />

			<label>Note: </label><br />
			<textarea name="note" value={item.note} onChange={handleInputChange}></textarea><br /><br />

			<button><i className="fa fa-close"></i> Cancel</button> 
			<button><i className="fa fa-hdd-o"></i> Save</button>
			<br /><br />
		</Form>
	)
}

export default AddForm