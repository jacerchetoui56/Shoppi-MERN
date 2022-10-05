import axios from "axios";
import React, {
    useContext,
    useState,
    useRef,
    useEffect,
} from "react";

const appContext = React.createContext();


function AppProvider({ children }) {
    // !the cart
    const [cart, setCart] = useState({ data: [], number: 0 });
    const [cartCount, setCartCount] = useState(0)
    /**checking if the user is loggedIn or not */
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    // loading animation when still fetchinng data
    const [loading, setLoading] = useState(true);
    //getting the user on page load 
    async function getUserInfos() {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
            "http://localhost:5000/api/v1/products/user",
            {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }
        );
        if (data.success) {
            setLoggedIn(true);
            setUser(data.user.userName);
            setCartCount(data.count)
        }
    }

    useEffect(() => {
        try {
            if (localStorage.getItem("token")) {
                getUserInfos();
            }
        } catch (error) {
            console.log(error);
        }
    }, []);
    useEffect(() => {
        if (!loggedIn) {
            setUser(null);
            setCart([])
            setCartCount(0)
        }
    }, [loggedIn]);

    // *toggling the drop down menu States
    const [showLinks, setShowLinks] = useState(false);
    const [showPagesSublinks, setShowPagesSublinks] = useState(false);
    const [showBlogSublinks, setShowBlogSublinks] = useState(false);
    const productsRef = useRef();
    function pageChanged() {
        // scroll to top
        window.scrollTo(0, 0);
        // close the drop down menu
        setShowLinks(false);
        setShowBlogSublinks(false);
        setShowPagesSublinks(false);
    }

    async function addToCart(id, name, image, price) {
        const token = localStorage.getItem("token");
        try {
            const { data } = await axios.put(
                "http://localhost:5000/api/v1/products/cart",
                {
                    id,
                    name,
                    image,
                    price,
                },
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            );
            if (data.success) {
                setCartCount(data.count)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <appContext.Provider
            value={{
                showLinks,
                setShowLinks,
                productsRef,
                pageChanged,
                showPagesSublinks,
                setShowPagesSublinks,
                showBlogSublinks,
                setShowBlogSublinks,
                cart,
                loggedIn,
                setLoggedIn,
                user,
                setUser,
                loading,
                setLoading,
                setCart,
                addToCart,
                cartCount,
                setCartCount
            }}
        >
            {children}
        </appContext.Provider>
    );
}

function useGlobalContext() {
    return useContext(appContext);
}

export { AppProvider, useGlobalContext };
