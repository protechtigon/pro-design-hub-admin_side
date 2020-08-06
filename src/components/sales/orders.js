import React, { Component, Fragment } from 'react'
import Breadcrumb from '../common/breadcrumb';
import data from '../../assets/data/orders';
import Datatable from './datatable'
import { orderList } from '../../services/api'
import Loader from 'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';

export class Orders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            oList: [],
            loading: false,
        };
    }

    componentDidMount() {
        const orders = orderList();
        this._getOrders(orders)
        
    }

    _getOrders =  orders => {
        
        this.setState({ loading: true }, async() => {
            await orders.then(async data => {

                if(data.error) {
                    this.setState({
                        loading: false,
                    })
                    toast.error("Something went wrong while loading data!")
                } else {
                    await data.map(item => {
                        const billing_address = JSON.parse(item.billing_address);
                        const i = {
                            id: item.id,
                            total: '$' + item.amount,
                            order_status: item.status,
                            order_by: billing_address.fname + ' ' + billing_address.lname,
                            address: billing_address.address,
                            city: billing_address.city,
                            country: billing_address.country

                        }

                        this.setState({
                            oList: [...this.state.oList, i]
                        })
                        
                    })
                    this.setState({
                        loading: false,
                        list: this.state.oList
                    })
                }
            
            })
        })

    }

    render() {
        const { list, loading } = this.state
        return (
            <Fragment>
                <Breadcrumb title="Orders" parent="Sales" />

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Manage Order</h5>
                                </div>
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
                                    <div className="card-body order-datatable">
                                    <Datatable
                                                multiSelectOption={false}
                                                myData={list}
                                                pageSize={10}
                                                pagination={true}
                                                class="-striped -highlight"
                                            />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />  
            </Fragment>
        )
    }
}

export default Orders
