import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import Breadcrumb from '../common/breadcrumb';
import data from '../../assets/data/listUser';
import Datatable from '../common/datatable'
import { designersList } from '../../services/api'
import Loader from 'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';


export class List_designer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            list: [],
            dList: [],
            loading: false,
        };
    }
    componentDidMount() {
        const designers = designersList();
        this._getDesigners(designers)
        
    }

    _getDesigners =  designers => {
        
        this.setState({ loading: true }, async() => {
            await designers.then(async data => {

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
                            dList: [...this.state.dList, i]
                        })
                        
                    })
                    this.setState({
                        loading: false,
                        list: this.state.dList
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
                <Breadcrumb title="Designer List" parent="Designers" />
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header">
                            <h5>Designer Details</h5>
                        </div>
                        <div className="card-body">
                            <div className="btn-popup pull-right">
                                <Link to="/Designers/create-designer" className="btn btn-secondary">Create Designer</Link>
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
                <ToastContainer />        
            </Fragment>
        )
    }
}

export default List_designer
