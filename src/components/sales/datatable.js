import React, { Component, Fragment } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateOrder } from '../../services/api'
import Modal from 'react-responsive-modal';
import Loader from 'react-loader-spinner'


export class Datatable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checkedValues: [],
            myData: this.props.myData,
            open: false,
            status: 'Waiting',
            id: '',
            loading: false
        }
        this._handleStatus = this._handleStatus.bind(this); 
    }

    onOpenModal = (id) => {
        this.setState({ open: true, id: id });      
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    onSaveModal = () => {
        let { id, status } = this.state

        this.setState({ loading: true }, async() => {
            await updateOrder(id, status).then(response => {
                if(response.data.affectedRows === 1) {
                    this.setState({ open: false, loading: false });
                    toast.success("Order Successfully Updated!")
                }
                else {
                    this.setState({ loading: false });
                    toast.error("Something went wrong while updating order status!")
                }
            })
        })
        
    };
    _handleStatus(e) {
        this.setState({
            status: e.target.value
        })
    }


    selectRow = (e, i) => {
        if (!e.target.checked) {
            this.setState({
                checkedValues: this.state.checkedValues.filter((item, j) => i !== item)
            });
        } else {
            this.state.checkedValues.push(i);
            this.setState({
                checkedValues: this.state.checkedValues
            })
        }
    }

    handleRemoveRow = () => {
        // const { user, portfolio } = this.props;
        // const selectedValues = this.state.checkedValues;
        // if(user === true) {

        //     delUser(selectedValues);
        //     const updatedData = this.state.myData.filter(function (el) {
        //         return selectedValues.indexOf(el.id) < 0;
        //     });
        //     this.setState({
        //         myData: updatedData
        //     })
        //     toast.success('User Successfully Deleted!')
            
        // }
        // else {

        //     if (portfolio) {
        //         delPortfolio(selectedValues);
        //         const updatedData = this.state.myData.filter(function (el) {
        //             return selectedValues.indexOf(el.id) < 0;
        //         });
        //         this.setState({
        //             myData: updatedData
        //         })
        //         toast.success('Portfolio Successfully Deleted!') 

        //     }else {
        //         delCoupon(selectedValues);
        //         const updatedData = this.state.myData.filter(function (el) {
        //             return selectedValues.indexOf(el.id) < 0;
        //         });
        //         this.setState({
        //             myData: updatedData
        //         })
        //         toast.success('Coupon Successfully Deleted!') 
        //     }
    
        // }

        // const updatedData = this.state.myData.filter(function (el) {
        //     return selectedValues.indexOf(el.id) < 0;
        // });
        // this.setState({
        //     myData: updatedData
        // })
        // toast.success("Successfully Deleted !")
    };

    renderEditable = (cellInfo) => {
        return (
            <div
                style={{ backgroundColor: "#fafafa" }}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    const data = [...this.state.myData];
                    data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                    this.setState({ myData: data });
                }}
                dangerouslySetInnerHTML={{
                    __html: this.state.myData[cellInfo.index][cellInfo.column.id]
                }}
            />
        );
    }

    Capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }loading

    render() {
        const { pageSize, myClass, multiSelectOption, pagination } = this.props;
        const { myData } = this.state

        const columns = [];
        for (var key in myData[0]) {

            let editable = this.renderEditable
            if (key === "image") {
                editable = null;
            }
            if (key === "status") {
                editable = null;
            }
            if (key === "avtar") {
                editable = null;
            }
            if (key === "vendor") {
                editable = null;
            }
            if(key === "order_status"){
                editable = null;
            }

            columns.push(
                {
                    Header: <b>{this.Capitalize(key.toString())}</b>,
                    accessor: key,
                    Cell: editable,
                    style: {
                        textAlign: 'center'
                    }
                });
        }

        if (multiSelectOption == true) {
            columns.push(
                {
                    Header: <button className="btn btn-danger btn-sm btn-delete mb-0 b-r-4"
                        onClick={
                            (e) => {
                                if (window.confirm('Are you sure you wish to delete this item?'))
                                    this.handleRemoveRow()
                            }}>Delete</button>,
                    id: 'delete',
                    accessor: str => "delete",
                    sortable: false,
                    style: {
                        textAlign: 'center'
                    },
                    Cell: (row) => (
                        <div>
                            <span >
                                <input type="checkbox" name={row.original.id} defaultChecked={this.state.checkedValues.includes(row.original.id)}
                                    onChange={e => this.selectRow(e, row.original.id)} />
                            </span>
                        </div>
                    ),
                    accessor: key,
                    style: {
                        textAlign: 'center'
                    }
                }
            )
        } else {
            columns.push(
                {
                    Header: <b>Action</b>,
                    id: 'delete',
                    accessor: str => "delete",
                    Cell: (row) => (
                        <div>
                            {/* <span onClick={() => {
                                if (window.confirm('Are you sure you wish to delete this item?')) {
                                    let data = myData;
                                    data.splice(row.index, 1);
                                    this.setState({ myData: data });
                                }
                                toast.success("Successfully Deleted !")

                            }}>
                                <i className="fa fa-trash" style={{ width: 35, fontSize: 20, padding: 11, color: '#e4566e' }}
                                ></i>
                            </span> */}

                        <span onClick={() => this.onOpenModal(row.original.id)}><i className="fa fa-pencil" style={{ width: 35, fontSize: 20, padding: 11, color:'rgb(40, 167, 69)' }}></i></span>
                    </div>
                ),
                style: {
                    textAlign: 'center'
                },
                sortable: false
            }
        )
        
        }
        const { open, loading } = this.state;
        return (
            <Fragment>
                <Modal open={open} onClose={this.onCloseModal} >
                    <div className="modal-header">
                        <h5 className="modal-title f-w-600" id="exampleModalLabel2">Update Order Status</h5>
                    </div>
                    <div className="modal-body">
                        <form>
                            <label className="col-form-label" >Select Status :</label>
                            
                                <select className="form-control digits" id="exampleFormControlSelect1" onChange={this._handleStatus}>
                                    <option value="Waiting">Waiting</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                </select>
                            
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={this.onSaveModal}>Save</button>
                        <button type="button" className="btn btn-secondary" onClick={() => this.onCloseModal('VaryingMdo')}>Close</button>
                        {loading && 
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
                            </div>
                        }
                    </div>
                </Modal>
                <ReactTable
                    data={myData}
                    columns={columns}
                    defaultPageSize={pageSize}
                    className={myClass}
                    showPagination={pagination}
                />
                <ToastContainer />
            </Fragment>
        )
    }
}

export default Datatable
