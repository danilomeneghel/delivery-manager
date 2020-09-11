import React, { Component, Fragment  } from 'react';
import withStyles from "@material-ui/styles/withStyles";
import { Button, Icon, Modal } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import api from "../services/api";
import styles from "../styles/global";
import TopBar from "../template/TopBar";
import CustomToolbar from "../template/CustomToolbar";
import AddForm from './UserAdd';
import EditForm from './UserEdit';

class UsersContacts extends Component {
	
	constructor (props) {
		super(props);

		this.title = 'Users Contacts List';
		this.open = false;
		this.state = { open: false, edit: false };	
		this.array = [];
		this.data = [];
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

	handleOpen = () => {
		this.setState({ open: true });
	};
	
	handleClose = () => {
		this.setState({ open: false });
	};
	
	addButton = () => {
		this.setState({ edit: false });
		this.handleOpen();
	};
	
	addForm = item => {
		item._id = this.data.length + 1;
		const items = [
			item.user, 
			item.address, 
			item.city, 
			item.phone,  
			''];
		this.setState({ array: this.data.concat([items]) });
		this.handleClose();
	};

	editButton = item => {
		this.setState({ edit: true });
		this.setState({ arrayEdit: {
			user: item[0], 
			address: item[1], 
			city: item[2], 
			phone: item[3], 
			action: ''} 
		});
		this.handleOpen();
	};
	
	editForm = (_id, item) => {
		this.setState({ edit: false });
		const items = [
			item.user, 
			item.address, 
			item.city, 
			item.phone, 
			''];
		this.setState({ array: this.data.map(result => (result[0] === _id ? items : result)) });
		this.handleClose();
	};
	
	render() {
		
		const { classes } = this.props;
		
		var editing = false;
		var currentEdit = [];
				
		if(!!this.state.results) {
			this.array = this.state.results.map(result => [
				result.name, 
				result.username, 
				result.email, 
				result.role, 
				result.status, 
				'']);
		}
		
		if(!!this.state.array) {
			this.data = this.state.array;
		} else {
			this.data = this.array;
		}
		
		editing = this.state.edit;
		currentEdit = this.state.arrayEdit;
		
		const columns = [
			{ name: 'Name', options: {filter: true} },
			{ name: 'Username', options: {filter: true} },
			{ name: 'E-mail', options: {filter: true} },
			{ name: 'Role', options: {filter: true} },
			{ name: 'Status', options: {filter: true} },
			{ name: "Action", 
				options: {
					filter: false,
					customBodyRender: (value, tableMeta, updateValue) => {
					return (
						<Fragment>
							<Button variant="contained" className={classes.viewButton} size="small" onClick={() => {this.editButton(tableMeta.rowData)}}>
								<Icon>visibility</Icon> View
							</Button>
							<Button variant="contained" className={classes.editButton} size="small" onClick={() => {this.editButton(tableMeta.rowData)}}>
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
			selectableRows: true,
			filterType: 'dropdown',
			responsive: '',
			rowsPerPage: 10,
			customToolbar: () => {
			  return (
				<CustomToolbar addButton={this.addButton} />
			  );
			}
		};
		
		const currentPath = this.props.location.pathname;
		
		return (
			<Fragment>
			<TopBar currentPath={currentPath} />
			<div className={classes.root}>
				<MUIDataTable
				title={this.title}
				data={this.data}
				columns={columns}
				options={options}/>
				
				<Modal
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
				open={this.state.open}
				onClose={this.handleClose}>
					<div className="modal">
						{editing ? (
							<Fragment>
								<h2 id="simple-modal-title">Edit User</h2>
								<div id="simple-modal-description">
									<EditForm
									editing={editing}
									currentEdit={currentEdit}
									editForm={this.editForm}/>
								</div>
							</Fragment>
						) : (
							<Fragment>
								<h2 id="simple-modal-title">Add User</h2>
								<div id="simple-modal-description">
									<AddForm addForm={this.addForm} />
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