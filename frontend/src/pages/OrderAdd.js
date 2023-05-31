import 'date-fns';
import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { TextField, MenuItem, IconButton } from "@material-ui/core";
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import { Form } from "../styles/form";
import api from "../services/api";

const AddForm = props => {
	const [ item, setForm ] = useState([])
	const [ msg, setMsg ] = useState({})
	const users = useState([{ "_id": "0", "name": "Select User" }].concat(props.users))
	const products = useState([{ "_id": "0", "name": "Select Product" }].concat(props.products))
	const [ userSelected, setUserSelected ] = useState({ id: null, value: users[0][0].name })
	const [ productSelected, setProductSelected ] = useState({ id: null, value: products[0][0].name })
	const [ deliveryDateSelected, handleDateChange ] = useState(new Date())

	const handleInputChange = (event) => {
		const { name, value } = event.target
		setForm({ ...item, [name]: value })
	}
	
	const saveItem = item => {
		item.user = userSelected.id

		item.product = productSelected.id
		
		item.deliveryDate = deliveryDateSelected
		
		api.post('/order-create', { item })
		.then(response => {
			if(response.data.success) {
				setMsg({ success: response.data.success, error: "" })
				var result = response.data.result
				var items = {
					_id: result._id,
					user: userSelected.value,
					product: productSelected.value,
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
			
			<TextField
				select
				name="product"
				label="Product"
				value={productSelected.value}
				onChange={e => setProductSelected({ id: e.currentTarget.id, value: e.target.value })}
				variant="outlined"
				fullWidth
			>
				{products[0].map((option) => (
					<MenuItem key={option._id} id={option._id} value={option.name}>
						{option.name}
					</MenuItem>
				))}
			</TextField><br /><br />
			
			<TextField type="number" name="quantity" value={item.quantity} label="Quantity" variant="outlined" fullWidth onChange={handleInputChange} required /><br /><br />

			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<DateTimePicker
					name="deliveryDate"
					label="Delivery Date"
					inputVariant="outlined"
					value={deliveryDateSelected}
					format="yyyy-MM-dd HH:mm"
					fullWidth
					onChange={handleDateChange}
				/>
			</MuiPickersUtilsProvider><br /><br />
			
			<TextField name="note" value={item.note} label="Note" variant="outlined" fullWidth multiline rows={4} onChange={handleInputChange} /><br /><br />

			<IconButton onClick={props.handleClose}><CancelIcon /> Cancel</IconButton>
			<IconButton type="submit"><SaveIcon /> Save</IconButton>
		</Form>
	)
}

export default AddForm