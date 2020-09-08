import React, { Component, Fragment  } from 'react';
import AddForm from './UserAdd'
import EditForm from './UserEdit'
import withStyles from "@material-ui/styles/withStyles";
import { Button, Icon, Modal } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import api from "../services/api";
import styles from "../styles/global";

import TopBar from "../template/TopBar";

class UsersContacts extends Component {
	
	constructor (props) {
		super(props);

		this.title = 'Users Contacts';
		this.open = false;
		this.state = { open: false, edit: false };	
		this.array = [];
		this.currentEdit = [];
		this.editing = false;
	}

	componentDidMount() {
		api.get('/users-contacts-list')
		.then(response => {
			this.setState({
				results: response.data
			})
		});
	}

	render() {
		
		const { classes } = this.props;
		var data = [];
		var open = false;
		var editing = false;
		var currentEdit = [];
		
		const handleOpen = () => {
			this.setState({ open: true });
		};
		
		const handleClose = () => {
			this.setState({ open: false });
		};
		
		open = this.state.open;
		
		if(!!this.state.results) {
			this.array = this.state.results.map(result => [
				result.user.name, 
				result.address, 
				result.city, 
				result.phone, 
				'']);
		}
		
		if(!!this.state.array) {
			data = this.state.array;
		} else {
			data = this.array;
		}
		
		// CRUD operations
		const addForm = item => {
			item._id = data.length + 1;
			const items = [
				item.user, 
				item.address, 
				item.city, 
				item.phone, 
				''];
			this.setState({ array: data.concat([items]) });
			handleClose();
		};
		
		const addButton = () => {
			this.setState({ edit: false });
			handleOpen();
		};
		
		const editForm = (_id, item) => {
			this.setState({ edit: false });
			const items = [
				item.user, 
				item.address, 
				item.city, 
				item.phone, 
				''];
			this.setState({ array: data.map(result => (result[0] === _id ? items : result)) });
			handleClose();
		};
		
		const editButton = item => {
			this.setState({ edit: true });
			this.setState({ arrayEdit: {
				user: item[0], 
				address: item[1], 
				city: item[2], 
				phone: item[3], 
				action: ''} 
			});
			handleOpen();
		};
		
		/*const deleteForm = _id => {
			this.setState({ edit: false });
			this.setState({ array: data.filter(item => item._id !== _id) });
		};*/

		editing = this.state.edit;
		currentEdit = this.state.arrayEdit;
		
		const columns = [
		  { name: 'Name', options: {filter: false} },
		  { name: 'Address', options: {filter: false} },
		  { name: 'City', options: {filter: false} },
		  { name: 'Phone', options: {filter: false} },
		  { name: "Action", 
			options: {
			  filter: true,
			  customBodyRender: (value, tableMeta, updateValue) => {
				return (
				  <Fragment>
					<Button variant="contained" className={classes.viewButton} size="small" onClick={() => {editButton(tableMeta.rowData)}}>
						<Icon>visibility</Icon> View
					</Button>
					<Button variant="contained" className={classes.editButton} size="small" onClick={() => {editButton(tableMeta.rowData)}}>
						<Icon>edit</Icon> Edit
					</Button>
				  </Fragment>
				);
			  }
			}
		  }
		];
		
		const options = {
		  filter: true,
		  filterType: "dropdown",
		  responsive: ""
		};
		
		const currentPath = this.props.location.pathname;
		
		return (
			<Fragment>
			<TopBar currentPath={currentPath} />
			<div className={classes.root}>
				<Button variant="contained" className={classes.addButton} size="small" onClick={() => { addButton() }}>
					<Icon>add</Icon> Add
				</Button>
				
				<MUIDataTable
				title={this.title}
				data={data}
				columns={columns}
				options={options}/>
				
				<Modal
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
				open={open}
				onClose={handleClose}>
					<div className="modal">
						{editing ? (
							<Fragment>
								<h2 id="simple-modal-title">Edit User Contact</h2>
								<div id="simple-modal-description">
									<EditForm
									editing={editing}
									currentEdit={currentEdit}
									editForm={editForm}/>
								</div>
							</Fragment>
						) : (
							<Fragment>
								<h2 id="simple-modal-title">Add User Contact</h2>
								<div id="simple-modal-description">
									<AddForm addForm={addForm} />
								</div>
							</Fragment>
						)}	
					</div>
				</Modal>
			</div>
			</Fragment>
		)
	}
}

export default withStyles(styles)(UsersContacts);