import React, { Component,Fragment } from 'react'
import Breadcrumb from '../../common/breadcrumb';
import data from '../../../assets/data/physical_list';
import { Edit, Trash2 } from 'react-feather'
import { productsList, delProduct } from '../../../services/api'
import Loader from 'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom'


export class Product_list extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data,
            list: [],
            pList: [],
            loading: false

        }
    }

    componentDidMount() {
        
        const products = productsList();
        this._getProducts(products)
 
        
    }

    _getProducts =  products => {
        
        this.setState({ loading: true }, async() => {
            await products.then(async data => {
                
                if(data.error) {
                    this.setState({
                        loading: false,
                    })
                    toast.error("Something went wrong while loading products!")
                } else {
                    await data.map(item => {
                    
                        const pro = {
                            id: item.id,
                            name: item.name,
                            category_id: item.category_id,
                            description: item.description,
                            size: item.size,
                            price: item.price,
                            images: item.images.split(','),
                            tag:"old",
                            discount :"not on sale",
                            rating: item.rating
                        }

                        this.setState({
                            pList: [...this.state.pList, pro]
                        })
                        
                    })
                    this.setState({
                        loading: false,
                        list: this.state.pList
                    })
                }
            
            }
            )
        })

    }

    _removeProduct(product_id) {
        delProduct(product_id).then(res => {
            
            if(res.data.affectedRows) {
                toast.success('Product Successfully Deleted!')
                //updating product list
                this.setState({
                    pList: [],
                    list:[]
                })
                const products = productsList();
                this._getProducts(products)
            }
            else {
                toast.error("Something went wrong while deleting product!")
            }
        }).catch(err => {
            toast.error("Something went wrong while deleting product!")
        })
    }
    render() {
        const { list, loading } = this.state;
     
        return (
            <Fragment>
                <Breadcrumb title="Product List" parent="Products" />
                <div className="container-fluid">
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
                    <div className="row products-admin ratio_asos">
                        {
                            list.map((myData, i) => {
                                return (
                                    <div className="col-xl-3 col-sm-6" key={i}>
                                        <div className="card">
                                            <div className="products-admin">
                                                <div className="card-body product-box">
                                                    <div className="img-wrapper">
                                                        <div className="lable-block">
                                                            {(myData.tag === 'new' )?<span className="lable3">{myData.tag}</span> : ''}
                                                            {(myData.discount === 'on sale' )?<span className="lable4">{myData.discount}</span> : '' }
                                                            </div>
                                                        <div className="front">
                                                            <a className="bg-size"><img className="img-fluid blur-up bg-img lazyloaded" src={myData.images[0]} /></a>
                                                            <div className="product-hover">
                                                                <ul>
                                                                    <li>
                                                                        <button className="btn" type="button">
                                                                            <Link to={`/products/edit-product/${myData.id}`}><Edit className="editBtn" /></Link>
                                                                        </button>
                                                                    </li>
                                                                    <li>
                                                                        <button className="btn" type="button" onClick={() => this._removeProduct(myData.id)}>
                                                                            <Trash2 className="deleteBtn" />
                                                                        </button>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-detail">
                                                        <div className="rating">
                                                            {myData.rating == null ? 
                                                                    <i className=""></i> 
                                                                :
                                                                myData.rating == 1 ?
                                                                <>
                                                                    <i className="fa fa-star"></i>
                                                                </>
                                                                :
                                                                myData.rating == 2 ?
                                                                <>
                                                                    <i className="fa fa-star"></i>
                                                                    <i className="fa fa-star"></i>
                                                                </>
                                                                :
                                                                myData.rating == 3 ?
                                                                <>
                                                                    <i className="fa fa-star"></i>
                                                                    <i className="fa fa-star"></i>
                                                                    <i className="fa fa-star"></i>
                                                                </>
                                                                :
                                                                myData.rating == 4 ?
                                                                <>
                                                                    <i className="fa fa-star"></i>
                                                                    <i className="fa fa-star"></i>
                                                                    <i className="fa fa-star"></i>
                                                                    <i className="fa fa-star"></i>
                                                                </>
                                                                :
                                                                myData.rating == 5 &&
                                                                <>
                                                                    <i className="fa fa-star"></i>
                                                                    <i className="fa fa-star"></i>
                                                                    <i className="fa fa-star"></i>
                                                                    <i className="fa fa-star"></i>
                                                                    <i className="fa fa-star"></i> 
                                                                </>
                                                                
                                                            }
                                                         
                                                        </div>
                                                        <a> <h6 >{myData.name}</h6></a>
                                                        {/* <h4 >{myData.price} <del >{myData.discount_price}</del></h4> */}
                                                        <h4>${myData.price}</h4>
                                                        {/* <ul className="color-variant">
                                                            <li className="bg-light0"></li>
                                                            <li className="bg-light1"></li>
                                                            <li className="bg-light2"></li>
                                                        </ul> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                }
                </div>
                <ToastContainer /> 
            </Fragment>
        )
    }
}

export default Product_list
