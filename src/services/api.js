import axios from 'axios'
import qs from 'qs'

export const baseUrl = 'https://pdh-estore.herokuapp.com/';
export const loginUrl = `${baseUrl}login`
export const categoryUrl = `${baseUrl}categories`
export const productUrl = `${baseUrl}products`
export const addProductUrl = `${baseUrl}products/add`
export const delProductUrl = `${baseUrl}products/delete`
export const designerUrl = `${baseUrl}user/list/2`
export const userUrl = `${baseUrl}user/list/0`
export const addUserUrl = `${baseUrl}user/add`
export const delUserUrl = `${baseUrl}user/delete`
export const couponUrl = `${baseUrl}coupons`
export const addCouponUrl = `${baseUrl}coupons/add`
export const delCouponUrl = `${baseUrl}coupons/delete`
export const addPortfolioUrl = `${baseUrl}portfolios/add`
export const delPortfolioUrl = `${baseUrl}portfolios/delete`
export const portfolioUrl = `${baseUrl}portfolios`
export const orderUrl = `${baseUrl}orders`
export const updateOrderUrl = `${baseUrl}orders/update`
export const updatePassword = `${baseUrl}user/`

// user login
export const userLogin = async (email, password) => {

    const result = await axios({
        method: 'post',
        url: `${loginUrl}`,
        data: qs.stringify({
            email: email,
            password: password,
            is_admin: 1
        }),
    });
    return result;
    
}

// designer login
export const designerLogin = async (email, password) => {

    const result = await axios({
        method: 'post',
        url: `${loginUrl}`,
        data: qs.stringify({
            email: email,
            password: password,
            is_admin: 2
        }),
    });
    return result;
    
}

// Reset Password
export const resetPass = async (id, password) => {

    const result = await axios({
        method: 'post',
        url: `${updatePassword}${id}/password-update`,
        data: qs.stringify({
            password: password,
        }),
    });
    return result;
    
}

// add new Product
export const addProduct = async (product) => {

    const fd = new FormData();
    fd.append('name', product.title)
    fd.append('description', product.content)
    fd.append('price', product.price)
    fd.append('size', product.size)
    fd.append('category_id', product.categoryId)
    fd.append('stock', product.stock)
    
    await product.images.forEach(item => {
                
        fd.append('images',item)
        
    })

    const result = await axios({
        method: 'post',
        url: `${addProductUrl}`,
        headers: {
            "Content-Type": "multipart/form-data"
        },
        data: fd
    });
    return result;
    
}

// update Product
export const updateProduct = async (product) => {

    const fd = new FormData();
    fd.append('name', product.title)
    fd.append('description', product.content)
    fd.append('price', product.price)
    fd.append('size', product.size)
    fd.append('category_id', product.categoryId)
    fd.append('old_images', product.old_images)
    fd.append('stock', product.stock)
    
    await product.images.forEach(item => {
                
        fd.append('images',item)
        
    })

    const result = await axios({
        method: 'post',
        url: `${productUrl}/${product.id}/update`,
        headers: {
            "Content-Type": "multipart/form-data"
        },
        data: fd
    });
    return result;
    
}

// getting single product
export const singleProduct = async(id) => {
    const result = await axios.get(`${productUrl}/${id}`).then(({ data }) => 
        {
            if(data.fatal) {
               return {
                    error: true,
                }
            }
            else {
                return data;
            }
            
        }).catch(err => (
            {
                error: true
            }
        ));

    return result;
}

// getting products list
export const productsList = async() => {
    const result = await axios.get(productUrl).then(({ data }) => 
        {
            if(data.fatal) {
               return {
                    error: true,
                }
            }
            else {
                return data;
            }
            
        }).catch(err => (
            {
                error: true
            }
        ));

    return result;
}

// delete product
export const delProduct = async (product_id) => {

    const result = await axios({
        method: 'post',
        url: `${delProductUrl}`,
        data: qs.stringify({
            product_id: product_id
        }),
    });
    return result;
    
}

// getting categories list
export const categoriesList = async() => {
    const result = await axios.get(categoryUrl).then(({ data }) => 
        {
            if(data.fatal) {
               return {
                    error: true,
                }
            }
            else {
                return data;
            }
            
        }).catch(err => (
            {
                error: true
            }
        ));

    return result;
}

// getting designers list
export const designersList = async() => {
    const result = await axios.get(designerUrl).then(({ data }) => 
        {
            if(data.fatal) {
               return {
                    error: true,
                }
            }
            else {
                return data;
            }
            
        }).catch(err => (
            {
                error: true
            }
        ));

    return result;
}

// create new designer
export const createDesigner = async (email, password, firstName, lastName) => {

    const result = await axios({
        method: 'post',
        url: `${addUserUrl}`,
        data: qs.stringify({
            name: firstName+ ' ' +lastName,
            email: email,
            password: password,
            is_admin: 2
        }),
    });
    return result;
    
}

// add new Portfolio
export const addPortfolio = async (portfolio) => {

    const fd = new FormData();
    fd.append('title', portfolio.title)
    fd.append('description', portfolio.content)
    fd.append('user_id', portfolio.id)
    
    await portfolio.images.forEach(item => {
                
        fd.append('images',item)
        
    })

    const result = await axios({
        method: 'post',
        url: `${addPortfolioUrl}`,
        headers: {
            "Content-Type": "multipart/form-data"
        },
        data: fd
    });
    return result;
    
}

// delete portfolio
export const delPortfolio = async (portfolio_id) => {

    const result = await axios({
        method: 'post',
        url: `${delPortfolioUrl}`,
        data: qs.stringify({
            portfolio_id: portfolio_id
        }),
    });
    return result;
    
    
}

// get portfolio
export const getPortfolio = async (user_id) => {

        
    const result = await axios({
        method: 'get',
        url: `${portfolioUrl}`,
        params: {
            user_id: user_id
        },
    });
    return result;
    
}
//get portfolio by id
export const getPortfolioById = async (id) => {

        
    const result = await axios({
        method: 'get',
        url: `${portfolioUrl}/${id}`,
    });
    return result;
    
}

// update Portfolio
export const updatePortfolio = async (portfolio) => {

    const fd = new FormData();
    fd.append('title', portfolio.title)
    fd.append('description', portfolio.content)
    fd.append('old_images', portfolio.old_images)
    
    await portfolio.images.forEach(item => {
                
        fd.append('images',item)
        
    })

    const result = await axios({
        method: 'post',
        url: `${portfolioUrl}/${portfolio.id}/update`,
        headers: {
            "Content-Type": "multipart/form-data"
        },
        data: fd
    });
    return result;
    
}

// Update Skills
export const updateSkill = async (id, skills) => {

    const result = await axios({
        method: 'post',
        url: `${updatePassword}${id}/skills-update`,
        data: qs.stringify({
            skills: skills,
        }),
    });
    return result;
    
}

// delete user
export const delUser = async (user_id) => {


    user_id.forEach(async id => {
        
        await axios({
            method: 'post',
            url: `${delUserUrl}`,
            data: qs.stringify({
                user_id: id
            }),
        });
        // return result;
    })
    
}

// getting Users list
export const usersList = async() => {
    const result = await axios.get(userUrl).then(({ data }) => 
        {
            if(data.fatal) {
               return {
                    error: true,
                }
            }
            else {
                return data;
            }
            
        }).catch(err => (
            {
                error: true
            }
        ));

    return result;
}

// getting Coupon list
export const couponList = async() => {
    const result = await axios.get(couponUrl).then(({ data }) => 
        {
            if(data.fatal) {
               return {
                    error: true,
                }
            }
            else {
                return data;
            }
            
        }).catch(err => (
            {
                error: true
            }
        ));

    return result;
}

// create new Coupon
export const createCoupon = async (title, code, discount) => {

    const result = await axios({
        method: 'post',
        url: `${addCouponUrl}`,
        data: qs.stringify({
            title: title,
            code: code,
            discount: discount,
        }),
    });
    return result;
    
}

// delete coupon
export const delCoupon = async (coupon_id) => {

    coupon_id.forEach(async id => {
        
        await axios({
            method: 'post',
            url: `${delCouponUrl}`,
            data: qs.stringify({
                coupon_id: id
            }),
        });
       
        // return result;
    })
    
    
}

// getting order list
export const orderList = async() => {
    const result = await axios.get(orderUrl).then(({ data }) => 
        {
            if(data.fatal) {
               return {
                    error: true,
                }
            }
            else {
                return data;
            }
            
        }).catch(err => (
            {
                error: true
            }
        ));

    return result;
}

// create new Coupon
export const updateOrder = async (id, status) => {

    const result = await axios({
        method: 'post',
        url: `${updateOrderUrl}`,
        data: qs.stringify({
            order_id: id,
            status: status
        }),
    });
    return result;
    
}