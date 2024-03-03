import axios from "axios";
import { createContext, useState } from "react";

export const wishListContext = createContext()
export default function WishListProvider(props) {
    const [wishListCount, setWishListCount] = useState(0)
    let baseUrl = `https://ecommerce.routemisr.com`;
    let header = { token: localStorage.getItem('userToken') }

    function addToWichList(id) {
        return axios.post(`${baseUrl}/api/v1/wishlist`,
            {
                productId: id
            }
            ,
            {
                headers: header
            }
        )
    }
    /*  */
    function getWishList() {
        return axios.get(`${baseUrl}/api/v1/wishlist`,
            {
                headers: header
            }
        )

    }


    function deleteWishList(id,) {
        return axios.delete(`${baseUrl}/api/v1/wishlist/${id}`,
            { headers: header }
        )
    }
    return <wishListContext.Provider value={{deleteWishList, addToWichList, wishListCount, setWishListCount, getWishList }}>

        {props.children}

    </wishListContext.Provider>


}