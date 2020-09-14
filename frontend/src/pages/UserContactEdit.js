import React, { useState, useEffect } from 'react';
import { Form } from "../styles/form";
import api from "../services/api";

const EditForm = props => {
	const [ item, setForm ] = useState(props.currentEdit)
	const [ msg, setMsg ] = useState({})

	console.log("item ", item)
	console.log("currentEdit ", props.currentEdit)

	useEffect( () => { setForm(props.currentEdit) },
		[ props ]
	)

	const handleInputChange = event => {
		const { name, value } = event.target
		setForm({ ...item, [name]: value })
	}

	const sendItem = (_id, item) => {
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

	const userList = () => {
		var options = null;
		item.user.forEach((value, key) => {
			var selected = null;
		  	if (value.name == item.user.name) 
				selected = 'selected';
			options += '<option value="'+value._id+'" selected>'+value.name+'</option>'
		});
		return options;
	};
	
	return (
		<Form
		  onSubmit={event => {
			event.preventDefault()
			sendItem(item._id, item)
		  }}
		>
			{msg.success && <p>{msg.success}</p>}
          	{msg.error && <p>{msg.error}</p>}
			
			<label>User</label><br />
			<select name="user" onChange={handleInputChange} required>
				{userList}			
			</select><br />

			<label>Address: </label><br />
			<input type="text" name="address" value={item.address} onChange={handleInputChange} required /><br />

			<label>City: </label><br />
			<input type="text" name="city" value={item.city} onChange={handleInputChange} required /><br />

			<label>Phone</label><br />
			<input type="number" name="phone" value={item.phone} onChange={handleInputChange} required /><br /><br />

			<button><i className="fa fa-close"></i> Cancel</button> 
			<button><i className="fa fa-hdd-o"></i> Save</button>
		</Form>
	)
}

export default EditForm