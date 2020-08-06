import React, { Component, Fragment } from 'react'
import Breadcrumb from '../common/breadcrumb';
import CKEditors from "react-ckeditor-component";
import { AvField, AvForm } from 'availity-reactstrap-validation';
import one from '../../assets/images/pro3/1.jpg'
import user from '../../assets/images/user.png';
import { updatePortfolio, getPortfolioById } from '../../services/api'
import Loader from 'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';
import ls from 'local-storage'


export default class Edit_portfolio extends Component {
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
            title: '',
            images: [],
            isActive: false,
            loading: false,
            preview: one,
            havingPortfolio: false,
            oldImg: [],
        }
        this.onChange = this.onChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this._handleFormSubmit = this._handleFormSubmit.bind(this);
    }
    componentDidMount() {

        let { id } = this.state;
        const portfolio = getPortfolioById(id);
        this._getPortfolio(portfolio)
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
    _handleFormSubmit(e) {
        e.preventDefault();

        let { title, content, images, oldImg, id } = this.state
     
        const filteredImg = oldImg.filter(function (el) {
              return el !== "";
        });
        const old_images = filteredImg.join();
        
        if (content === '') {
            toast.error("Please add product description!")
        }
        else {
            
            this.setState({ loading: true }, async() => {
                await updatePortfolio({ title, content, images, old_images , id }).then(response => {
 
                    if(response.status === 200) {
                        this.setState({
                            loading: false,
                            images: [],
                            // dummyimgs: [
                            //     { img: user },
                            //     { img: user },
                            //     { img: user },
                            // ],
                            // preview: one
                        })
                        toast.success("Portfolio updated Successflly!")
                    }
                    else {
                        this.setState({
                            loading: false,
                        })
                        toast.error("Something went wrong!")
                    }
                }).catch(err => {
                    this.setState({
                        loading: false,
                    })
                    toast.error("Something went wrong!")
                })
            })
        }
    }

    _getPortfolio =  portfolio => {
        
        this.setState({ isActive: true }, async() => {
            await portfolio.then(async response => {
                console.log(response)
                if(!response.error) {
                    if(response.data.length > 0) {
                        const images = response.data[0].images.split(',')
                        const title = response.data[0].title;
                        const content = response.data[0].description;
                        const { dummyimgs  } = this.state;
                        switch(images.length) {
                            case 1: 
                                dummyimgs[0].img = images[0];
                                this.setState({
                                    dummyimgs,
                                    title, 
                                    content,
                                    isActive: false,
                                    havingPortfolio: false,
                                    oldImg: images,
                                })
                                break;
                            case 2: 
                                dummyimgs[0].img = images[0];
                                dummyimgs[1].img = images[1];
                                this.setState({
                                    dummyimgs,
                                    title, 
                                    content,
                                    isActive: false,
                                    havingPortfolio: false,
                                    oldImg: images,
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
                                    isActive: false,
                                    havingPortfolio: false,
                                    oldImg: images,
                                    
                                })
                                break;
                            default:
                                break;
                        }   
                        
                    } else {
                        this.setState({
                            isActive: false,
                            havingPortfolio: true
                        })
                        toast.error("Some thing went wrong!")
                    }
                }
                else {
                    this.setState({
                        isActive: false,
                        havingPortfolio: true
                    })
                    toast.error("Something went wrong while checking data!")
                } 
            
            })
        })

    }
    render() {
        let {isActive,loading, preview, havingPortfolio, title} = this.state
        return (
            <Fragment>
                <Breadcrumb title="Edit Portfolio" parent="Portfolio" />
                {isActive ? 
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
                    <div className="container-fluid">

                        {!havingPortfolio &&
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h5>Edit Portfolio</h5>
                                        </div>
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
                                                                    <label className="col-xl-3 col-sm-4 mb-0">Add title :</label>
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
                                        
                                                            </div>
                                                            <div className="form">

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
                                                                <input type="submit" className="btn btn-primary" value="Update"/>
                                                                {/* <button type="button" className="btn btn-light">Discard</button> */}
                                                            </div>
                                                            {loading &&
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
                                        
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                }
                <ToastContainer /> 
            </Fragment>
        )
    }
}
