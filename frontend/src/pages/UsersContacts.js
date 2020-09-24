import React, { Component, Fragment  } from 'react';
import withStyles from "@material-ui/styles/withStyles";
import { Button, Icon, Modal } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import api from "../services/api";
import styles from "../styles/global";
import TopBar from "../template/TopBar";
import CustomToolbar from "../template/CustomToolbar";
import AddForm from './UserContactAdd';
import EditForm from './UserContactEdit';
import ViewForm from './UserContactView';

class UsersContacts extends Component {
	
	constructor (props) {
		super(props);

		this.title = 'User Contact';
		this.state = { add: false, edit: false, view: false };	
		this.array = [];
		this.data = [];
	}
	
	componentDidMount() {
		api.get('/users-contacts-list')
		.then(response => {
			this.setState({ results: response.data })
		})
		
		api.get('/users-list')
		.then(response => {
			this.setState({ users: response.data })
		})
	}

	handleAdd = () => {
		this.setState({ add: true, edit: false, view: false });
	}
	
	handleEdit = () => {
		this.setState({ add: false, edit: true, view: false });
	}
	
	handleView = () => {
		this.setState({ add: false, edit: false, view: true });
	}
	
	handleClose = () => {
		this.setState({ add: false, edit: false, view: false });
	}
	
	addItem = () => {
		this.handleAdd();
	}
	
	addForm = item => {
		this.setState({ array: this.data.concat([Object.values(item)]) });
		this.handleClose();
	}

	editItem = item => {
		this.setState({ 
			arrayItems: {
				_id: item[0], 
				user: item[1], 
				address: item[2], 
				city: item[3], 
				phone: item[4]
			} 
		});
		this.handleEdit();
	}
	
	editForm = (_id, item) => {
		this.setState({ array: this.data.map(result => (result[0] === _id ? Object.values(item) : result)) });
		this.handleClose();
	}
	
	viewItem = item => {
		this.editItem(item);
		this.handleView();
	}

	deleteRows = (RowsDeleted) => {
		this.state.results.forEach((item, key) => {
			RowsDeleted.data.forEach(index => {
				if(key === index.dataIndex)
					api.get('/user-contact-remove/' + item._id)
			})
		})
	}
	
	render() {
		
		const { classes } = this.props;		

		if(!!this.state.results) {
			this.array = this.state.results.map(result => [
				result._id, 
				(result.user != null) ? result.user.name : null, 
				result.address, 
				result.city, 
				result.phone, 
				'']
			);
		}
		
		this.data = (!!this.state.array) ? this.state.array : this.array;
		
		const columns = [
			{ name: 'ID', options: {display: false, filter: false} },
			{ name: 'User', options: {filter: true} },
			{ name: 'Address', options: {filter: true} },
			{ name: 'City', options: {filter: true} },
			{ name: 'Phone', options: {filter: true} },
			{ name: "Action", 
				options: {
					filter: false,
					customBodyRender: (value, tableMeta, updateValue) => {
					return (
						<Fragment>
							<Button variant="contained" className={classes.viewButton} size="small" onClick={() => {this.viewItem(tableMeta.rowData)}}>
								<Icon>visibility</Icon> View
							</Button>
							<Button variant="contained" className={classes.editButton} size="small" onClick={() => {this.editItem(tableMeta.rowData)}}>
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
			multiple: true,
			filterType: 'dropdown',
			responsive: 'vertical',
			onRowsDelete: this.deleteRows,
			rowsPerPage: 10,
			customToolbar: () => {
			  return (
				<CustomToolbar addItem={this.addItem} />
			  );
			}
		};
		
		const open = (this.state.add || this.state.edit || this.state.view) ? true : false;

		return (
			<Fragment>
			<TopBar />
			<div className={classes.root}>
				<MUIDataTable
				title={this.title + " List"}
				data={this.data}
				columns={columns}
				options={options}/>
				
				<Modal
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
				open={open}
				onClose={this.handleClose}>
					<div className="modal">
						{(this.state.edit) ? (
							<Fragment>
								<h2 id="simple-modal-title">Edit {this.title}</h2>
								<div id="simple-modal-description">
									<EditForm
									editing={this.state.edit}
									currentEdit={this.state.arrayItems}
									users={this.state.users}
									handleClose={this.handleClose}
									editForm={this.editForm}/>
								</div>
							</Fragment>
						) : ((this.state.add) ? (
							<Fragment>
								<h2 id="simple-modal-title">Add {this.title}</h2>
								<div id="simple-modal-description">
									<AddForm 
									users={this.state.users}
									handleClose={this.handleClose}
									addForm={this.addForm} />
								</div>
							</Fragment>
						) : (
							<Fragment>
								<h2 id="simple-modal-title">View {this.title}</h2>
								<div id="simple-modal-description">
									<ViewForm 
									handleClose={this.handleClose}
									currentView={this.state.arrayItems}/>
								</div>
							</Fragment>
						))}	
					</div>
				</Modal>
			</div>
			</Fragment>
		)
	}
}

export default withStyles(styles)(UsersContacts);