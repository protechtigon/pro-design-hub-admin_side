import React, { Component, Fragment} from 'react'
import Breadcrumb from '../../common/breadcrumb';
import Modal from 'react-responsive-modal';
import 'react-toastify/dist/ReactToastify.css';
import data from '../../../assets/data/category';
import Datatable from '../../common/datatable';
import { categoriesList } from '../../../services/api'
import Loader from 'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';

export class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            list: [],
            cList: [],
            loading: false,
        };
    }
    onOpenModal = () => {
        // this.setState({ open: true });
        // toast.success("Successfully Deleted !")
        // toast.error("Something went wrong while loading data!")
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    componentDidMount() {
        
        const category = categoriesList();
        this._getCategories(category)
 
        
    }

    _getCategories =  category => {
        
        this.setState({ loading: true }, async() => {
            await category.then(async data => {

                if(data.error) {
                    this.setState({
                        loading: false,
                    })
                    toast.error("Something went wrong while loading data!")
                } else {
                    await data.map(item => {
                        const i = {
                            id: item.id,
                            name: item.name
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
        const { open, list, loading } = this.state;

        return (
            <Fragment>
                <Breadcrumb title="Category" parent="Products" />
                {/* <!-- Container-fluid starts--> */}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Products Category</h5>
                                </div>
                                <div className="card-body">
                                    <div className="btn-popup pull-right">

                                        {/* <button type="button" className="btn btn-primary" onClick={this.onOpenModal} data-toggle="modal" data-original-title="test" data-target="#exampleModal">Add Category</button> */}
                                        <Modal open={open} onClose={this.onCloseModal} >
                                            <div className="modal-header">
                                                <h5 className="modal-title f-w-600" id="exampleModalLabel2">Add Physical Product</h5>
                                            </div>
                                            <div className="modal-body">
                                                <form>
                                                    <div className="form-group">
                                                        <label htmlFor="recipient-name" className="col-form-label" >Category Name :</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="message-text" className="col-form-label">Category Image :</label>
                                                        <input className="form-control" id="validationCustom02" type="file" />
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-primary" onClick={() => this.onCloseModal('VaryingMdo')}>Save</button>
                                                <button type="button" className="btn btn-secondary" onClick={() => this.onCloseModal('VaryingMdo')}>Close</button>
                                            </div>
                                        </Modal>
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
                                            }}>
                                             <Loader type="ThreeDots" color="#FF8084" height="100" width="100" />

                                        </div> : 
                                        // <div id="basicScenario" className="product-physical">
                                        <div id="basicScenario" className="product-physical">
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
                </div>
                <ToastContainer />                     
                {/* <!-- Container-fluid Ends--> */}
            </Fragment>
        )
    }
}

export default Category

