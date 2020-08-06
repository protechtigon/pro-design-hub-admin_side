import React, { Component,Fragment } from 'react';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createCoupon } from '../../services/api'
import { ToastContainer, toast } from 'react-toastify';

export class Tabset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeShow: true,
            startDate: new Date(),
            title: '',
            quantity: '',
            code: ''
        }
        this.handleChange = this.handleChange.bind(this)
    }

    clickActive = (event) => {
        document.querySelector(".nav-link").classList.remove('show');
        event.target.classList.add('show');
    }
    handleChange(e) {
        this.setState({
            // startDate: date
            [e.target.name]: e.target.value
        });
    }

        // handle login form submit
        handleSubmit = (e) => {
            e.preventDefault();
    
            let {title, code, quantity} = this.state
  
                createCoupon(title, code, quantity).then(response =>{

                    if(response.status === 200) {

                        toast.success("New Coupon Successfully Created!")

                    }
                    else {
                        toast.error("Something went wrong!")
                    }
                    
                }).catch(err => {
                    toast.error("Something went wrong!")
                })

        }

    render() {
        return (
            <Fragment>
                <Tabs>
                    <TabList className="nav nav-tabs tab-coupon" >
                        <Tab className="nav-link" onClick={(e) => this.clickActive(e)}>General</Tab>
                        {/* <Tab className="nav-link" onClick={(e) => this.clickActive(e)}>Restriction</Tab>
                        <Tab className="nav-link" onClick={(e) => this.clickActive(e)}>Usage</Tab> */}
                    </TabList>

                    <TabPanel>
                        <div className="tab-pane fade active show">
                            <form className="needs-validation" onSubmit={this.handleSubmit}>
                                <h4>General</h4>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="form-group row">
                                            <label className="col-xl-3 col-md-4"><span>*</span> Title</label>
                                            <input className="form-control col-md-7" id="validationCustom0" type="text" name="title" required onChange={this.handleChange}/>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-xl-3 col-md-4"><span>*</span> Code</label>
                                            <input className="form-control col-md-7" id="validationCustom1" type="text" name="code" required onChange={this.handleChange}/>
                                            <div className="valid-feedback">Please Provide a Valid Coupon Code.</div>
                                        </div>
                                        {/* <div className="form-group row">
                                            <label className="col-xl-3 col-md-4">Start Date</label>
                                            <DatePicker
                                            selected={this.state.startDate}
                                            onChange={this.handleChange}
                                        />
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-xl-3 col-md-4">End Date</label>
                                            <DatePicker
                                                selected={this.state.startDate}
                                                onChange={this.handleChange}
                                            />
                                        </div> */}
                                        {/* <div className="form-group row">
                                            <label className="col-xl-3 col-md-4">Free Shipping</label>
                                            <div className="col-md-7 checkbox-space">
                                                <label className="d-block">
                                                    <input className="checkbox_animated" id="chk-ani2" type="checkbox" />
                                                    Allow Free Shipping
                                                </label>
                                            </div>
                                        </div> */}
                                        <div className="form-group row">
                                            <label className="col-xl-3 col-md-4"><span>*</span> Quantity</label>
                                            <input className="form-control col-md-7" type="number" name="quantity" required=""  onChange={this.handleChange}/>
                                        </div>
                                        {/* <div className="form-group row">
                                            <label className="col-xl-3 col-md-4">Discount Type</label>
                                            <select className="custom-select col-md-7" required="">
                                                <option value="">--Select--</option>
                                                <option value="1">Percent</option>
                                                <option value="2">Fixed</option>
                                            </select>
                                        </div> */}
                                        {/* <div className="form-group row">
                                            <label className="col-xl-3 col-md-4">Status</label>
                                            <div className="col-md-7 checkbox-space">
                                                <label className="d-block">
                                                    <input className="checkbox_animated" id="chk-ani2" type="checkbox" />
                                                    Enable the Coupon
                                                </label>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                                <div className="pull-right">
                                    <input type="submit" className="btn btn-primary" value="Save" />
                                </div>
                            </form>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <form className="needs-validation" noValidate="">
                            <h4>Restriction</h4>
                            <div className="form-group row">
                                <label className="col-xl-3 col-md-4">Products</label>
                                <input className="form-control col-md-7" id="validationCustom3" type="text" required="" />
                                <div className="valid-feedback">Please Provide a Product Name.</div>
                            </div>
                            <div className="form-group row">
                                <label className="col-xl-3 col-md-4">Category</label>
                                <select className="custom-select col-md-7" required="">
                                    <option value="">--Select--</option>
                                    <option value="1">T-shirts</option>
                                    <option value="2">Logo</option>
                                    <option value="3">Business Cards</option>
                                    <option value="4">Flyers</option>
                                    <option value="5">Brochures</option>
                                </select>
                            </div>
                            <div className="form-group row">
                                <label className="col-xl-3 col-md-4">Minimum Spend</label>
                                <input className="form-control col-md-7" id="validationCustom4" type="number" />
                            </div>
                            <div className="form-group row">
                                <label className="col-xl-3 col-md-4">Maximum Spend</label>
                                <input className="form-control col-md-7" id="validationCustom5" type="number" />
                            </div>
                        </form>
                    </TabPanel>
                    <TabPanel>
                        <form className="needs-validation" noValidate="">
                            <h4>Usage Limits</h4>
                            <div className="form-group row">
                                <label className="col-xl-3 col-md-4">Per Limit</label>
                                <input className="form-control col-md-7" id="validationCustom6" type="number" />
                            </div>
                            <div className="form-group row">
                                <label className="col-xl-3 col-md-4">Per Customer</label>
                                <input className="form-control col-md-7" id="validationCustom7" type="number" />
                            </div>
                        </form>
                    </TabPanel>
                </Tabs>
                {/* <div className="pull-right">
                    <button type="button" className="btn btn-primary">Save</button>
                </div> */}
                <ToastContainer />
            </Fragment>
        )
    }
}

export default Tabset
