import React, { useState, useEffect } from 'react'

const UserEdit = props => {
	const [ item, set ] = useState(props.current)
	useEffect( () => {
			set(props.current)
		},
		[ props ]
	)

	const handleInputChange = event => {
		const { name, value } = event.target
		set({ ...item, [name]: value })
	}

	return (
		<form
		  onSubmit={event => {
			event.preventDefault()
			props.editForm(item._id, item)
		  }}
		>
			<label>Nome</label>
			<input type="text" name="name" value={item.name} onChange={handleInputChange} /><br />
			<label>Usuario</label>
			<input type="text" name="username" value={item.username} onChange={handleInputChange} /><br />
			<label>E-mail</label>
			<input type="text" name="email" value={item.email} onChange={handleInputChange} /><br /><br />
			<label>Role</label>
			<input type="text" name="role" value={item.role} onChange={handleInputChange} /><br /><br />
			<label>Status</label>
			<input type="text" name="status" value={item.status} onChange={handleInputChange} /><br /><br />
			<button>Salvar</button>
		</form>
	)
}

export default UserEdit
