import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { createProductRequest, getProductsRequest, deleteProductRequest, getProductRequest, updateProductRequest, updateProductRequestNoUpdateImage } from "../api/products";


const ProductsContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useProducts = () => {
    const context = useContext(ProductsContext);
  
    if (!context) {
      throw new Error('useProducts debe estar definido en un contexto');
    }
    return context;
  };
  // Fin de useProducts
  


export function ProductsProvider({ children }) {
    const [products, setProducts]= useState([]);

    const createProduct = async(product)=>{
     try{
             await createProductRequest(product);
             getProducts();
     }catch(error){
      console.log(error)
     }
    }//fin de crateProducto

    const getProducts = async ()=>{
      try{
        const res = await getProductsRequest();
        setProducts(res.data);
      }catch(error){
        console.log(error);
      }
    }//fin de getProduct

    const deletProduct = async(id)=>{
      try{
        const res= await deleteProductRequest(id);
        if (res.status ===200)
          setProducts(products.filter(product=> product._id !=id));
      }catch (error){
        console.log(error)
      }
    }// fin de Delete product

    const getProduct= async(id)=>{
      try{
        const res= await getProductRequest(id)
       //console.log(res)
       return res.data
      }catch(error){
        console.log(error)
      }
    }//fin de getProduct

    const updateProduct = async(id, product)=>{
      try{
        await updateProductRequest(id, product);
      }catch(error){
        console.log(error)
      }
    }
    const updateProductNoUpdateImage = async (id, product) => {
      try {
        const res = await updateProductRequestNoUpdateImage(id, product);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    
    // Fin de updateProductNoUpdateImage
    
    return (
      <ProductsContext.Provider value={{
        products,
        createProduct,
        getProducts,
        deletProduct,
        getProduct,
        updateProduct,
        updateProductNoUpdateImage
      }}>
        {children}
      </ProductsContext.Provider>
    );
  }
  
  // Fin de ProductsProvider
  
  ProductsProvider.propTypes = {
    children: PropTypes.any,
  };
  