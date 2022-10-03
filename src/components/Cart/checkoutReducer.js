import classes from './CheckOutForm.module.css';
import {useReducer} from 'react';

const initialName = {
        name: '',
        isNameValid: false
}

const initialStreet = {
        street: '',
        isStreetValid: false
}

const initialCity = {
        city: '',
        isCityValid: false
}

const initialPostalCode = {
        postalCode: '',
        isPostalCodeValid: false
    }

const isEmpty = (value) => value.trim().length === 0;
const isSixCharacters = (value) => value.trim().length === 6;

const nameReducer = (state, action) =>{
    if(action.type ==='NAME_INPUT'){
        return{ name: action.value, isNameValid: !isEmpty(action.value) }
    }
    if(action.type === 'NAME_BLUR'){
        return { name: state.name, isNameValid: !isEmpty(state.name) }
    }
    return initialName;
}

const streetReducer = (state, action) =>{
    if(action.type ==='STREET_INPUT'){
        return{ street: action.value, isStreetValid: !isEmpty(action.value) }
    }
    if(action.type === 'STREET_BLUR'){
        return { street: state.street, isStreetValid: !isEmpty(state.street) }
    }
    return initialStreet;
}

const cityReducer = (state, action) =>{
    if(action.type ==='CITY_INPUT'){
        return{ city: action.value, isCityValid: !isEmpty(action.value) }
    }
    if(action.type === 'CITY_BLUR'){
        return { city: state.city, isCityValid: !isEmpty(state.city) }
    }
    return initialCity;
}

const postalCodeReducer = (state, action) =>{
    if(action.type ==='POSTALCODE_INPUT'){
        return{ postalcode: action.value, isPostalCodeValid: isSixCharacters(action.value) }
    }
    if(action.type === 'POSTALCODE_BLUR'){
        return { postalcode: state.postalcode, isPostalCodeValid: isSixCharacters(state.postalcode) }
    }
    return initialPostalCode;
}

const CheckoutReducer = ({onCancel, submitUserData}) => {

    const [name, dispatchName] = useReducer(nameReducer, initialName);
    const [street, dispatchStreet] = useReducer(streetReducer,initialStreet);
    const [city, dispatchCity] = useReducer(cityReducer, initialCity)
    const [postalCode, dispatchPostalCode] = useReducer(postalCodeReducer, initialPostalCode);

    const nameHandler = (e) =>{
        dispatchName({type: 'NAME_INPUT', value: e.target.value})
    }
    const streetHandler = (e) =>{
        dispatchStreet({type: 'STREET_INPUT', value: e.target.value})
    }
    const cityHandler = (e) =>{
        dispatchCity({type: 'CITY_INPUT', value: e.target.value})
    }
    const postalCodeHandler = (e) =>{
        dispatchPostalCode({type: 'POSTALCODE_INPUT', value: e.target.value})
    }

    const nameBlurHandler = (e) =>{
        dispatchName({type: 'NAME_BLUR'})
    }
    const streetBlurHandler = (e) =>{
        dispatchStreet({type: 'STREET_BLUR'})
    }
    const cityBlurHandler = (e) =>{
        dispatchCity({type: 'CITY_BLUR'})
    }
    const postalCodeBlurHandler = (e) =>{
        dispatchPostalCode({type: 'POSTALCODE_BLUR'})
    }

    const confirmHandler = (e) =>{
        e.preventDefault();

        const isFormValid = initialName.isNameValid && initialCity.isCityValid 
        && initialPostalCode.isPostalCodeValid && initialStreet.isStreetValid;

        if(!isFormValid){
            return;
        }

        submitUserData({
            name: initialName.name,
            street: initialStreet.street,
            city: initialCity.city,
            postalcode: initialPostalCode.postalcode
        })
    }
    return(
        <form className={classes['form']} onSubmit={confirmHandler}>
            <div className={classes['control']}>
                <label>Name</label>
                <input type="text" onChange={nameHandler} onBlur={nameBlurHandler} 
                value={initialName.name} />
            </div>
            <div className={classes['control']}>
                <label>Street</label>
                <input type="text" onChange={streetHandler}onBlur={streetBlurHandler} 
                value={initialStreet.street} />
            </div>
            <div className={classes['control']}>
                <label>Postal Code</label>
                <input type="number" onChange={postalCodeHandler} onBlur={postalCodeBlurHandler} 
                value={initialPostalCode.postalcode} />
            </div>
            <div className={classes['control']}>
                <label>City</label>
                <input type="text" onChange={cityHandler} onBlur={cityBlurHandler} 
                value={initialCity.city} />
            </div>
            <div className={classes['actions']}>
                <button type="button" onClick={onCancel}>Cancel</button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    )
}

export default CheckoutReducer;