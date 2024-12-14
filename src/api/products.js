import axios from './axios';

export  const getProductsRequest = ()=> axios.get('/products');


export  const getProductRequest = (id)=> axios.get('/products/'+id);


export  const createProductRequest = (product)=> axios.post('/products', product,{
    Headers:{
        'Content-Type': 'multipart/from-data'
    }
});

export const deleteProductRequest = (id)=> axios.delete('/products/'+id);

export const updateProductRequest = (id, product)=>axios.put('/products/'+id, product);


export const updateProductRequestNoUpdateImage = (id, product)=>axios.put('/productsupdatenoimage/'+id, product);

