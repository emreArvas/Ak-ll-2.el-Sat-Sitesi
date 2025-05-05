import axios from "axios";

var url = 'https://proje2024.bsite.net/api/v1/'

/* user işlemleri */

// login
export const loginUser =async (body) => {
    var res = await axios.post(url + "User/login",body);
    return res;
}
// createUser
export const createUser = async(body) => {
    var res = await axios.post(url + "User/create",body);
    return res;
}
// forgot
export const forgotPassword = async(body) => {
    var res = await axios.put(url + "User/forgot",body);
    return res;
}
// changePassword
export const changePassword =async (email,body) => {
    var res =await  axios.put(url + "User/changePassword/"+email,body);
    return res;
}
// delete
export const deleteUser = async (id) => {
    var res =await   axios.put(url + "User/"+id);
    return res;
}

/* Product işlemleri */

// add
export const addProduct = async(id,body) => {
    var res = await  axios.post(url + "Product/add/"+id,body);
    return res;
}
// update
export const updateProduct =async (id,body) => {
    var res =  axios.put(url + "Product/update/"+id,body);
    return res;
}
// delete
export const deleteProduct =async (id) => {
    var res = await  axios.delete(url + "Product/delete/"+id);
    return res;
}
// get
export const getProduct =async (id) => {
    var res =await   axios.get(url + "Product/get/"+id);
    return res;
}
// list
export const getProducts =async () => {
    var res =await   axios.get(url + "Product/products");
    return res;
}
// list/userId
export const getProductsForUser =async (id) => {
    var res =await  axios.get(url + "Product/products/"+id);
    return res;
}


/* Cart İşlemleri */
// add
export const addCart =async (userId,productId) => {
    var res =await  axios.post(url + "Cart/addCart/"+userId+"/"+productId);
    return res;
}
// delete
export const deleteCart =async (id) => {
    var res =await  axios.delete(url + "Cart/removeCart/"+id);
    return res;
}
// list/userId
export const listCart =async (userId) => {
    var res =await  axios.get(url + "Cart/carts/"+userId);
    return res;
}


/*Order İşlemleri*/
// create/userId/productId
export const createOrder =async (userId,productId) => {
    var res =await  axios.post(url + "Order/create/"+userId+"/"+productId);
    return res;
}
// cancel
export const cancelOrder =async (orderId) => {
    var res =await  axios.delete(url + "Order/cancel/"+orderId);
    return res;
}
// update Order Status
export const updateOrderStatus =async (orderId,body) => {
    var res =await  axios.put(url + "Order/updateOrderStatus/"+orderId,body);
    return res;
}
// yapılan siparişler listesi
export const getOrders =async (userId) => {
    var res =await  axios.get(url + "Order/"+userId);
    return res;
}
// gelen siparişler listesi 
export const getInComingOrders =async (userId) => {
    var res =await  axios.get(url + "Order/getOrders/"+userId);
    return res;
}