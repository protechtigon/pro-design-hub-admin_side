import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import Breadcrumb from '../common/breadcrumb';
import data from '../../assets/data/listUser';
import Datatable from '../common/datatable'
import { usersList } from '../../services/api'
import Loader from 'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';

export class List_user extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            list: [],
            uList: [],
            loading: false,
        };
    }
    componentDidMount() {
        const users = usersList();
        this._getUsers(users)
        
    }

    _getUsers =  users => {
        
        this.setState({ loading: true }, async() => {
            await users.then(async data => {

                if(data.error) {
                    this.setState({
                        loading: false,
                    })
                    toast.error("Something went wrong while loading data!")
                } else {
                    await data.map(item => {
                        const i = {
                            id: item.id,
                            name: item.name,
                            email: item.email
                        }

                        this.setState({
                            uList: [...this.state.uList, i]
                        })
                        
                    })
                    this.setState({
                        loading: false,
                        list: this.state.uList
                    })
                }
            
            }
            )
        })

    }
    render() {
        const { list, loading } = this.state
        return (
            <Fragment>
                <Breadcrumb title="User List" parent="Users" />
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header">
                            <h5>User Details</h5>
                        </div>
                        <div className="card-body">
                            <div className="btn-popup pull-right">
                                {/* <Link to="/users/create-user" className="btn btn-secondary">Create User</Link> */}
                            </div>
                            <div className="clearfix"></div>
                            {loading ? 
                                <div
                                    style={{
                                        width: "100%",
                                        height: "100",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}
                                >
                                    <Loader type="ThreeDots" color="#FF8084" height="100" width="100" />

                                </div> : 
                                <div id="batchDelete" className="category-table user-list order-table coupon-list-delete">
                                    <Datatable
                                        multiSelectOption={true}
                                        myData={list}
                                        pageSize={10}
                                        pagination={true}
                                        user={true}
                                        class="-striped -highlight"
                                    />
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default List_user
