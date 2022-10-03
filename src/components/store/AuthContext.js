import React,{  useState, useEffect } from 'react';

export const AuthContext = React.createContext({
    onOpen: () =>{},
    onClose: () =>{},
    onAddItems: (meals) =>{},
    cart: [],
    onDecrease: (meals) =>{},
    total: 0,
    reset: () =>{}
})

export const AuthContextProvider = ({children}) => {
    const [toggle, setToggle] = useState(false);
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() =>{
        const result = cart.reduce((total, currentValue) =>{
            return total + (currentValue.amount * currentValue.count);
        }, 0);
        setTotal(result)
    }, [cart]);

    console.log(total);

    const openHandler = () =>{
        setToggle(true);
    }

    const closeHandler = () =>{
        setToggle(false);
    }
    const onAddItems = (meals) =>{   
        const existingItem = cart.find(meal => meal.id === meals.id);    
        if(existingItem){
            const modifiedCart = cart.map(item => {
                if(item.id === existingItem.id){
                    return {...item , count: item.count + meals.count}
                }
                return item;
            });           
            setCart(modifiedCart);
        }else{
            setCart(() => {
                return [...cart, meals];
            })
        }   

    }
    console.log(cart);

    const onDecrease = (meal) =>{
        if(meal.count > 1){
            setCart(cart.map(item => {
                if(item.id === meal.id){
                    return {...item , count: item.count-1}
                }
                return item;
            }))
        }else{
            setCart(cart.filter(item => item.id !== meal.id));
        }        
    }

    const reset = () =>{
        setCart([]);
    }
    return(
        <AuthContext.Provider value={{
            onOpen: openHandler,
            onClose: closeHandler,
            toggle: toggle,
            onAddItems :onAddItems,
            cart: cart,
            onDecrease: onDecrease,
            total: total,
            reset: reset
        }}>{children}</AuthContext.Provider>
    )
}