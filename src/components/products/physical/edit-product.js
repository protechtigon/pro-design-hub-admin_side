import React, { Component,Fragment } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import CKEditors from "react-ckeditor-component";
import { AvField, AvForm } from 'availity-reactstrap-validation';
import one from '../../../assets/images/pro3/1.jpg'
import user from '../../../assets/images/user.png';
import { categoriesList, singleProduct, updateProduct } from '../../../services/api'
import Loader from 'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';

export class Edit_product extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
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
            oldImg: [],
            stock: 0
        }
        this.onChange = this.onChange.bind(this);
        this._handleCategory = this._handleCategory.bind(this);
        this._handleSize = this._handleSize.bind(this); 
        this.handleChange = this.handleChange.bind(this);
        this._handleFormSubmit = this._handleFormSubmit.bind(this);
    }
    componentDidMount() {
        const category = categoriesList();
        this._getCategories(category)
    }

    _getCategories = category => {
        
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
                        list: this.state.cList
                    })

                    const product = singleProduct(this.state.id);
                    this._getProduct(product)
                }
            
            }
            )
        })

    }

    // getting product detail
    _getProduct= product => {
        this.setState({ loading: true }, async() => {
            await product.then(async data => {
  
                if(data.length === 0) {
                    this.setState({
                        loading: false,
                    })
                    toast.error("Product not found!")
                } else {
                    const images = data[0].images.split(',')
                    const title = data[0].name;
                    const content = data[0].description;
                    const price = data[0].price;
                    const categoryId = data[0].category_id;
                    var stock = data[0].stock;
                    if(stock == null) {
                        stock = 1
                    } 
                    const { dummyimgs  } = this.state;
                    switch(images.length) {
                        case 1: 
                            dummyimgs[0].img = images[0];
                            this.setState({
                                dummyimgs,
                                title, 
                                content,
                                price,
                                categoryId,
                                loading: false,
                                oldImg: images,
                                stock
                            })
                            break;
                        case 2: 
                            dummyimgs[0].img = images[0];
                            dummyimgs[1].img = images[1];
                            this.setState({
                                dummyimgs,
                                title, 
                                content,
                                price,
                                categoryId,
                                loading: false,
                                oldImg: images,
                                stock
                            })
                            break;
                        case 3: 
                            dummyimgs[0].img = images[0];
                            dummyimgs[1].img = images[1];
                            dummyimgs[2].img = images[2];
                            this.setState({
                                dummyimgs,
                                title, 
                                content,
                                price,
                                categoryId,
                                loading: false,
                                oldImg: images,
                                stock
                            })
                            break;
                        default:
                            break;
                    }

                }
            
            })
        })
    }

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

        const { dummyimgs, oldImg  } = this.state;
        
        reader.onloadend = () => {
            dummyimgs[i].img = reader.result;
            oldImg.splice(i, 1, '');
            //preview = reader.result;
            this.setState({
                file: file,
                dummyimgs,
                preview: reader.result,
                oldImg
            });
        }
        reader.readAsDataURL(file)
    }

    _handleCategory(e) {
 
        this.setState({
            categoryId: e.target.value
        })
    }

    _handleSize(e) {
        this.setState({
            size: e.target.value
        })
    }

    _handleFormSubmit(e) {
        e.preventDefault();

        let { title, price, categoryId, content, images, size, oldImg, stock, id } = this.state
     
        const filteredImg = oldImg.filter(function (el) {
              return el !== "";
        });
        const old_images = filteredImg.join();
        
        if (content === '') {
            toast.error("Please add product description!")
        }
        else {
            this.setState({ isActive: true }, async() => {
                await updateProduct({ title, price, categoryId, content, images, size, old_images , stock, id }).then(response => {
 
                    if(response.status === 200) {
                        this.setState({
                            isActive: false,
                            images: [],
                            // dummyimgs: [
                            //     { img: user },
                            //     { img: user },
                            //     { img: user },
                            // ],
                            // preview: one
                        })
                        toast.success("Product updated Successflly!")
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
        const { 
            loading, 
            list, 
            isActive, 
            preview, 
            title, 
            price, 
            categoryId, 
            content, 
            stock
        } = this.state;

        return (
            <Fragment>
                <Breadcrumb title="Edit Product" parent="Products" />

                <div className="container-fluid">
                <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Edit Product</h5>
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
                                                                <AvField 
                                                                    className="form-control" 
                                                                    name="title" 
                                                                    id="validationCustom01" 
                                                                    type="text" 
                                                                    required 
                                                                    onChange={this.handleChange} 
                                                                    value={title}/>
                                                            </div>
                                                            <div className="valid-feedback">Looks good!</div>
                                                        </div>
                                                        <div className="form-group mb-3 row">
                                                            <label className="col-xl-3 col-sm-4 mb-0">Price :</label>
                                                            <div className="col-xl-8 col-sm-7">
                                                                <AvField 
                                                                    className="form-control mb-0" 
                                                                    name="price" 
                                                                    id="validationCustom02" 
                                                                    type="number" 
                                                                    required 
                                                                    onChange={this.handleChange} 
                                                                    value={price}/>
                                                            </div>
                                                            <div className="valid-feedback">Looks good!</div>
                                                        </div>
                                                        <div className="form-group mb-3 row">
                                                            <label className="col-xl-3 col-sm-4 mb-0">Stock :</label>
                                                            <div className="col-xl-8 col-sm-7">
                                                                <AvField 
                                                                    className="form-control mb-0" 
                                                                    name="stock" 
                                                                    id="validationCustom02" 
                                                                    type="number" 
                                                                    required 
                                                                    onChange={this.handleChange} 
                                                                    value={stock}/>
                                                            </div>
                                                            <div className="valid-feedback">Looks good!</div>
                                                        </div>
                                                        <div className="form-group mb-3 row">
                                                            <label className="col-xl-3 col-sm-4 mb-0">Product Category :</label>
                                                            <div className="col-xl-8 col-sm-7">
                                                                {/* <AvField className="form-control " name="product_code" id="validationCustomUsername" type="number" required /> */}
                                                                <select className="form-control digits" id="exampleFormControlSelect1" onChange={this._handleCategory} value={categoryId}>
                                                                    {list.map((e , key) => {
                                                                        return <option key={key} value={e.id}>{e.name}</option>
                                                                    })}
                                                                </select>
                                                            </div>
                                                            <div className="invalid-feedback offset-sm-4 offset-xl-3">Please choose Valid Code.</div>
                                                        </div>
                                                    </div>
                                                    <div className="form">
                                                        <div className="form-group row">
                                                            <label className="col-xl-3 col-sm-4">Add Description :</label>
                                                            <div className="col-xl-8 col-sm-7 description-sm">
                                                                <CKEditors
                                                                    activeclassName="p10"
                                                                    content={content}
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
                                                        <input type="submit" className="btn btn-primary" value="Update"/>
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

export default Edit_product
