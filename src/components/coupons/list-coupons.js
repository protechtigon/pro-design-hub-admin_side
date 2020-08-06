import React, { Component, Fragment } from 'react'
import Breadcrumb from '../common/breadcrumb';
import data from '../../assets/data/listCoupons';
import Datatable from '../common/datatable'
import { couponList } from '../../services/api'
import Loader from 'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';

export class ListCoupons extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            list: [],
            cList: [],
            loading: false,
        };
    }
    componentDidMount() {
        const coupons = couponList();
        this._getCoupons(coupons)
    }

    _getCoupons =  coupons => {
        
        this.setState({ loading: true }, async() => {
            await coupons.then(async data => {

                if(data.error) {
                    this.setState({
                        loading: false,
                    })
                    toast.error("Something went wrong while loading data!")
                } else {
                    await data.map(item => {
                        const i = {
                            id: item.id,
                            title: item.title,
                            code: item.code,
                            discount: item.discount + '%'
                        }

                        this.setState({
                            cList: [...this.state.cList, i]
                        })
                        
                    })

                    this.setState({
                        loading: false,
                        list: this.state.cList
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
                <Breadcrumb title="List Coupons" parent="Coupons" />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Products Category</h5>
                                </div>
                                <div className="card-body">
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
                                    <div id="batchDelete" className="category-table order-table coupon-list-delete">
                                        <Datatable
                                            multiSelectOption={true}
                                            myData={list}
                                            pageSize={10}
                                            pagination={true}
                                            user={false}
                                            class="-striped -highlight"
                                        />
                                    </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default ListCoupons
