import React, { useState } from 'react'

const UserAdd = props => {
	const initialFormState = []
	const [ item, set ] = useState(initialFormState)
		
	const handleInputChange = event => {
		const { name, value } = event.target
		set({ ...item, [name]: value })
	}
	
	return (
		<form
			onSubmit={event => {
				event.preventDefault()
				if (!item.name || !item.username) return
				props.addForm(item)
				set(initialFormState)
			}}
		>
			<label>Name: </label>
			<input type="text" name="name" value={item.name} onChange={handleInputChange}/><br />
			<label>Username: </label>
			<input type="text" name="username" value={item.username} onChange={handleInputChange}/><br />
			<label>E-mail: </label>
			<input type="text" name="email" value={item.email} onChange={handleInputChange}/><br /><br />
			<label>Role: </label>
			<input type="text" name="role" value={item.role} onChange={handleInputChange}/><br /><br />
			<label>Status: </label>
			<input type="text" name="status" value={item.status} onChange={handleInputChange}/><br /><br />
			<button>Salvar</button>
			<br /><br />
		</form>
	)
}

export default UserAdd
