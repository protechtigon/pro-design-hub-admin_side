import React, { Component,Fragment } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import CKEditors from "react-ckeditor-component";
import { AvField, AvForm } from 'availity-reactstrap-validation';
import one from '../../../assets/images/pro3/1.jpg'
import user from '../../../assets/images/user.png';
import { categoriesList, addProduct } from '../../../services/api'
import Loader from 'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';

export class Add_product extends Component {
    constructor(props) {
        super(props)
        this.state = {
            quantity: 1,
            file: '',
            dummyimgs: [
                { img: user },
                { img: user },
                { img: user },
            ],
            content: '',
            list: [],
            cList: [],
            size: 'XS',
            categoryId: 1,
            title: '',
            price: '',
            images: [],
            isActive: false,
            preview: one,
            stock: 0
        }
        this.onChange = this.onChange.bind(this);
        this._handleCategory = this._handleCategory.bind(this);
        // this._handleSize = this._handleSize.bind(this); 
        this.handleChange = this.handleChange.bind(this);
        this._handleFormSubmit = this._handleFormSubmit.bind(this);
    }
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
    // IncrementItem = () => {
    //     this.setState(prevState => {
    //         if (prevState.quantity < 9) {
    //             return {
    //                 quantity: prevState.quantity + 1
    //             }
    //         } else {
    //             return null;
    //         }
    //     });
    // }
    // DecreaseItem = () => {
    //     this.setState(prevState => {
    //         if (prevState.quantity > 0) {
    //             return {
    //                 quantity: prevState.quantity - 1
    //             }
    //         } else {
    //             return null;
    //         }
    //     });
    // }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        
    }

    onChange(evt) {
        // console.log("onChange fired with event info: ", evt);
        var html = evt.editor.getData();
        this.setState({ content: html });
    }

    //image upload
    _handleSubmit(e) {
        e.preventDefault();
    }

    _handleImgChange(e, i) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
        this.state.images.push(file);

        const { dummyimgs  } = this.state;
        
        reader.onloadend = () => {
            dummyimgs[i].img = reader.result;
            //preview = reader.result;
            this.setState({
                file: file,
                dummyimgs,
                preview: reader.result
            });
        }
        reader.readAsDataURL(file)
    }

    _handleCategory(e) {
        this.setState({
            categoryId: e.target.value
        })
    }

    // _handleSize(e) {
    //     this.setState({
    //         size: e.target.value
    //     })
    // }

    _handleFormSubmit(e) {
        e.preventDefault();

        let { title, price, categoryId, content, images, size, stock } = this.state
        console.log('categoryId', categoryId)
        if(!images.length > 0) {
            toast.error("Please Select atleast 1 image!")
        } 
        else if (content === '') {
            toast.error("Please add product description!")
        }
        else {
            this.setState({ isActive: true }, async() => {
                await addProduct({ title, price, categoryId, content, images, size, stock }).then(response => {

                    if(response.status === 200) {
                        this.setState({
                            isActive: false,
                            images: [],
                            dummyimgs: [
                                { img: user },
                                { img: user },
                                { img: user },
                            ],
                            preview: one
                        })
                        toast.success("New Product added Successflly!")
                    }
                    else {
                        this.setState({
                            isActive: false,
                        })
                        toast.error("Something went wrong!")
                    }
                }).catch(err => {
                    this.setState({
                        isActive: false,
                    })
                    toast.error("Something went wrong!")
                })
            })
        }
    }

    render() {
        const { loading, list, isActive, preview } = this.state;
        return (
            <Fragment>
                <Breadcrumb title="Add Product" parent="Products" />

                <div className="container-fluid">
                <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Add Product</h5>
                                </div>
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
                                    <div className="card-body">
                                        <div className="row product-adding">
                                            <div className="col-xl-5">
                                                <div className="add-product">
                                                    <div className="row">
                                                        <div className="col-xl-9 xl-50 col-sm-6 col-9">
                                                            
                                                            <img src={preview} alt="" className="img-fluid image_zoom_1 blur-up lazyloaded" />
                                                            
                                                        </div>
                                                        <div className="col-xl-3 xl-50 col-sm-6 col-3">
                                                            <ul className="file-upload-product">
                                                                {
                                                                    this.state.dummyimgs.map((res, i) => {
                                                                        return (
                                                                            <li key={i}>
                                                                                <div className="box-input-file">
                                                                                    <input className="upload" type="file" onChange={(e) => this._handleImgChange(e, i)} />
                                                                                    <img src={res.img} style={{ width: 50, height: 50 }} />
                                                                                    <a id="result1" onClick={(e) => this._handleSubmit(e.target.id)}></a>
                                                                                </div>
                                                                            </li>
                                                                        )
                                                                    })
                                                                }
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-7">
                                                <AvForm className="needs-validation add-product-form" onValidSubmit={this._handleFormSubmit} onInvalidSubmit={this.handleInvalidSubmit}>
                                                    <div className="form form-label-center">
                                                        <div className="form-group mb-3 row">
                                                            <label className="col-xl-3 col-sm-4 mb-0">Product Name :</label>
                                                            <div className="col-xl-8 col-sm-7">
                                                                <AvField className="form-control" name="title" id="validationCustom01" type="text" required onChange={this.handleChange}/>
                                                            </div>
                                                            <div className="valid-feedback">Looks good!</div>
                                                        </div>
                                                        <div className="form-group mb-3 row">
                                                            <label className="col-xl-3 col-sm-4 mb-0">Price :</label>
                                                            <div className="col-xl-8 col-sm-7">
                                                                <AvField className="form-control mb-0" name="price" id="validationCustom02" type="number" required onChange={this.handleChange} />
                                                            </div>
                                                            <div className="valid-feedback">Looks good!</div>
                                                        </div>
                                                        <div className="form-group mb-3 row">
                                                            <label className="col-xl-3 col-sm-4 mb-0">Stock :</label>
                                                            <div className="col-xl-8 col-sm-7">
                                                                <AvField className="form-control mb-0" name="stock" id="validationCustom02" type="number" required onChange={this.handleChange} />
                                                            </div>
                                                            <div className="valid-feedback">Looks good!</div>
                                                        </div>
                                                        <div className="form-group mb-3 row">
                                                            <label className="col-xl-3 col-sm-4 mb-0">Product Category :</label>
                                                            <div className="col-xl-8 col-sm-7">
                                                                {/* <AvField className="form-control " name="product_code" id="validationCustomUsername" type="number" required /> */}
                                                                <select className="form-control digits" id="exampleFormControlSelect1" onChange={this._handleCategory}>
                                                                    {list.map((e , key) => {
                                                                        return <option key={key} value={e.id}>{e.name}</option>
                                                                    })}
                                                                </select>
                                                            </div>
                                                            <div className="invalid-feedback offset-sm-4 offset-xl-3">Please choose Valid Code.</div>
                                                        </div>
                                                    </div>
                                                    <div className="form">
                                                        {/* <div className="form-group row">
                                                            <label className="col-xl-3 col-sm-4 mb-0" >Select Size :</label>
                                                            <div className="col-xl-8 col-sm-7">
                                                                <select className="form-control digits" id="exampleFormControlSelect1" onChange={this._handleSize}>
                                                                    <option value="XS">Extra Small</option>
                                                                    <option value="S">Small</option>
                                                                    <option value="M">Medium</option>
                                                                    <option value="L">Large</option>
                                                                    <option value="XL">Extra Large</option>
                                                                </select>
                                                            </div>
                                                        </div> */}
                                                        {/* <div className="form-group row">
                                                            <label className="col-xl-3 col-sm-4 mb-0">Total Products :</label>
                                                            <fieldset className="qty-box ml-0">
                                                                <div className="input-group bootstrap-touchspin">
                                                                    <div className="input-group-prepend">
                                                                        <button className="btn btn-primary btn-square bootstrap-touchspin-down" type="button" onClick={this.DecreaseItem} >
                                                                            <i className="fa fa-minus"></i>
                                                                        </button>
                                                                    </div>
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text bootstrap-touchspin-prefix" ></span>
                                                                    </div>
                                                                    <input className="touchspin form-control" type="text" value={this.state.quantity} onChange={this.handleChange} />
                                                                    <div className="input-group-append">
                                                                        <span className="input-group-text bootstrap-touchspin-postfix"></span>
                                                                    </div>
                                                                    <div className="input-group-append ml-0">
                                                                        <button className="btn btn-primary btn-square bootstrap-touchspin-up" type="button" onClick={this.IncrementItem}>
                                                                            <i className="fa fa-plus"></i>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </fieldset>
                                                        </div> */}
                                                        <div className="form-group row">
                                                            <label className="col-xl-3 col-sm-4">Add Description :</label>
                                                            <div className="col-xl-8 col-sm-7 description-sm">
                                                                <CKEditors
                                                                    activeclassName="p10"
                                                                    content={this.state.content}
                                                                    //data="<p>Hello from CKEditor 5!</p>"
                                                                    //onChange={ ( event, editor ) => console.log( { event, editor } ) }
                                                                    events={{
                                                                        // blur: this.onBlur,
                                                                        // afterPaste: this.afterPaste,
                                                                        change: this.onChange
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="offset-xl-3 offset-sm-4">
                                                        <input type="submit" className="btn btn-primary" value="Add"/>
                                                        <button type="button" className="btn btn-light">Discard</button>
                                                    </div>
                                                    {isActive &&
                                                        <div
                                                            style={{
                                                                width: "100%",
                                                                height: "100",
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center"
                                                            }}>
                                                            <Loader type="ThreeDots" color="#FF8084" height="100" width="100" />

                                                        </div>
                                                    }
                                                </AvForm>
                                            </div>
                                        </div>
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

export default Add_product
