import React, { Component } from 'react';
import Breadcrumb from '../common/breadcrumb';
import { Chart } from "react-google-charts";
import {
    Line, Bar
} from 'react-chartjs-2';
import { lineChart, chartOptions, areaChart, areaOptions, barOptions, barChart, sellOption, sellData, salesOption, salesData } from '../../constants/chartData'
import Report_table from './report-table';
import { orderList } from '../../services/api'
import Loader from 'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';
import Datatable from './datatable'

export class Reports extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            oList: [],
            loading: false,
            filter: '',
            tlist: [],
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {

        if (e.target.value) {
            this.setState({ oList: [] }) //After 1 second, set render to true

            const today = new Date()
            const filterDate = new Date(today)

            filterDate.setDate(filterDate.getDate() - e.target.value)

            // today.toDateString()

            // yesterday.toDateString()

            var resultOrderData = this.state.tlist.filter(function (a) {
                var date = new Date(a.created_At);
                return (date >= filterDate && date <= today);
            })

            this.setState({ list: resultOrderData })
        }
        else {
            this.setState({ list: this.state.tlist })
        }
    }

    componentDidMount() {
        const orders = orderList();
        this._getOrders(orders)
    }

    _getOrders = orders => {

        this.setState({ loading: true }, async () => {
            await orders.then(async data => {

                if (data.error) {
                    this.setState({
                        loading: false,
                    })
                    toast.error("Something went wrong while loading data!")
                } else {

                    await data.map(item => {
                        const billing_address = JSON.parse(item.billing_address);
                        // console.log(billing_address)
                        const i = {
                            id: item.id,
                            total: '$' + item.amount,
                            order_status: item.status,
                            order_by: billing_address ? billing_address.fname + ' ' + billing_address.lname : "",
                            address: billing_address ? billing_address.address : "",
                            city: billing_address ? billing_address.city : "",
                            country: billing_address ? billing_address.country : "",
                            created_At: item.created_at

                        }

                        this.setState({
                            oList: [...this.state.oList, i]
                        })

                    })
                    this.setState({
                        loading: false,
                        list: this.state.oList,
                        tlist: this.state.oList
                    })
                }

            })
        })

    }

    render() {
        const { list, loading } = this.state
        return (
            <div>
                <Breadcrumb title="Reports" parent="Reports" />
                <div className="container-fluid">
                    <div className="row">
                        {/* <div className="col-xl-8 col-md-6">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Sales Summary</h5>
                                </div>
                                <div className="card-body sell-graph">
                                    <Line data={salesData} options={salesOption} width={700} height={305} />
                                </div>
                            </div>
                        </div> */}
                        {/* <div className="col-xl-4 col-md-6">
                            <div className="card report-employee">
                                <div className="card-header">
                                    <h2>75%</h2>
                                    <h6 className="mb-0">Employees Satisfied</h6>
                                </div>
                                <div className="card-body p-0">
                                    <div className="ct-4 flot-chart-container">
                                        <Line data={lineChart} options={chartOptions} width={778} height={500} />
                                    </div>
                                </div>
                            </div>
                        </div> */}

                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Sales Report</h5>
                                    <div style={{ marginTop: 20 }}>
                                        <div className="form-group mb-3 row">
                                            <label className="col-xl-2 col-sm-3 mb-0">Filter Orders :</label>
                                            <div className="col-xl-8 col-sm-7">
                                                {/* <AvField className="form-control " name="product_code" id="validationCustomUsername" type="number" required /> */}
                                                <select className="form-control digits" id="exampleFormControlSelect1" onChange={this.handleChange}>
                                                    <option value="">Select...</option>
                                                    <option value="1">Yesterday</option>
                                                    <option value="7">Last 7 Days</option>
                                                    <option value="30">Last 30 Days</option>
                                                </select>
                                            </div>
                                            <div className="invalid-feedback offset-sm-4 offset-xl-3">Please choose Valid Code.</div>
                                        </div>
                                    </div>
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
                                    <div className="card-body">
                                        <div id="basicScenario" className="report-table">
                                            {/* <Report_table /> */}

                                            <div className="translation-list">
                                                <Datatable
                                                    multiSelectOption={false}
                                                    myData={list}
                                                    pageSize={12}
                                                    pagination={false}
                                                    class="-striped -highlight"
                                                />
                                            </div>

                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        {/* <div className="col-lg-6">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Expenses</h5>
                                </div>
                                <div className="card-body expense-chart">
                                    <div className="chart-overflow" id="area-chart1" >
                                        <Line data={areaChart} options={areaOptions} width={778} height={308} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="card">
                                <div className="card-header">
                                    <h5> Sales / Purchase</h5>
                                </div>
                                <div className="card-body">
                                    <div className="sales-chart">
                                        <Bar data={barChart} options={barOptions} width={778} height={308} />
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                    {/* <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5> Sales / Purchase Return</h5>
                            </div>
                            <div className="card-body">
                                <div className="report-last-sm">
                                    <Line data={sellData} options={sellOption} width={700} height={300} />
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
                <ToastContainer />
            </div>
        )
    }
}

export default Reports
