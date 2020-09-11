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
import ViewForm from './UserView';

class Users extends Component {
	
	constructor (props) {
		super(props);

		this.title = 'Users List';
		this.state = { add: false, edit: false, view: false };	
		this.array = [];
	}
	
	componentDidMount() {
		api.get('/users-list')
		.then(response => {
			this.setState({
				results: response.data
			})
		});
	}

	handleAdd = () => {
		this.setState({ add: true, edit: false, view: false });
	};
	
	handleEdit = () => {
		this.setState({ add: false, edit: true, view: false });
	};
	
	handleView = () => {
		this.setState({ add: false, edit: false, view: true });
	};
	
	handleClose = () => {
		this.setState({ add: false, edit: false, view: false });
	};
	
	addButton = () => {
		this.handleAdd();
	};
	
	addForm = item => {
		item._id = this.array.length + 1;
		const items = [
			item.name, 
			item.username, 
			item.email, 
			item.role, 
			item.status, 
			''];
		this.setState({ array: this.array.concat([items]) });
		this.handleClose();
	};

	editButton = item => {
		this.setState({ arrayEdit: {
			name: item[0], 
			username: item[1], 
			email: item[2], 
			role: item[3], 
			status: item[4], 
			action: ''} 
		});
		this.handleEdit();
	};
	
	editForm = (_id, item) => {
		const items = [
			item.name, 
			item.username, 
			item.email, 
			item.role, 
			item.status, 
			''];
		this.setState({ array: this.array.map(result => (result[0] === _id ? items : result)) });
		this.handleClose();
	};
	
	viewButton = item => {
		this.setState({ arrayView: {
			name: item[0], 
			username: item[1], 
			email: item[2], 
			role: item[3], 
			status: item[4], 
			action: ''} 
		});
		this.handleView();
	};

	render() {
		
		const { classes } = this.props;		

		if(!!this.state.results) {
			this.array = this.state.results.map(result => [
				result.name, 
				result.username, 
				result.email, 
				result.role, 
				result.status, 
				'']);
		}
				
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
							<Button variant="contained" className={classes.viewButton} size="small" onClick={() => {this.viewButton(tableMeta.rowData)}}>
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
			responsive: 'stacked',
			rowsPerPage: 10,
			customToolbar: () => {
			  return (
				<CustomToolbar addButton={this.addButton} />
			  );
			}
		};
		
		const currentPath = this.props.location.pathname;
		const open = (this.state.add || this.state.edit || this.state.view) ? true : false;

		return (
			<Fragment>
			<TopBar currentPath={currentPath} />
			<div className={classes.root}>
				<MUIDataTable
				title={this.title}
				data={this.array}
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
								<h2 id="simple-modal-title">Edit User</h2>
								<div id="simple-modal-description">
									<EditForm
									editing={this.state.edit}
									currentEdit={this.state.arrayEdit}
									editForm={this.editForm}/>
								</div>
							</Fragment>
						) : ((this.state.add) ? (
							<Fragment>
								<h2 id="simple-modal-title">Add User</h2>
								<div id="simple-modal-description">
									<AddForm addForm={this.addForm} />
								</div>
							</Fragment>
						) : (
							<Fragment>
								<h2 id="simple-modal-title">View User</h2>
								<div id="simple-modal-description">
									<ViewForm currentView={this.state.arrayView}/>
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

export default withStyles(styles)(Users);