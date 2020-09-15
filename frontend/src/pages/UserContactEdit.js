import React, { useState, useEffect } from 'react';
import { Form } from "../styles/form";
import api from "../services/api";

const EditForm = props => {
	const [ item, setForm ] = useState(props.currentEdit)
	const [ msg, setMsg ] = useState({})
	const users = useState(props.users)
	const [userSelected, setUserSelected] = useState(item.userSelected)

	useEffect( () => { setForm(props.currentEdit) },
		[ props ]
	)

	const handleInputChange = event => {
		const { name, value } = event.target
		setForm({ ...item, [name]: value })
	}

	const saveItem = (_id, item) => {
		item.user = userSelected
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

	return (
		<Form
		  onSubmit={event => {
			event.preventDefault()
			saveItem(item._id, item)
		  }}
		>
			{msg.success && <p>{msg.success}</p>}
          	{msg.error && <p>{msg.error}</p>}
			
			<label>User</label><br />
			<select name="user" value={userSelected} onChange={e => setUserSelected(e.target.value)} required>
				{optionsUsers}
			</select><br />

			<label>Address: </label><br />
			<input type="text" name="address" value={item.address} onChange={handleInputChange} required /><br />

			<label>City: </label><br />
			<input type="text" name="city" value={item.city} onChange={handleInputChange} required /><br />

			<label>Phone</label><br />
			<input type="text" name="phone" value={item.phone} onChange={handleInputChange} required /><br /><br />

			<button><i className="fa fa-close"></i> Cancel</button> 
			<button><i className="fa fa-hdd-o"></i> Save</button>
		</Form>
	)
}

export default EditForm