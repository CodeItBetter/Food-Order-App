import classes from './CheckOutForm.module.css';
import {useReducer} from 'react';

const initialName = {
        name: '',
        isNameValid: null
}

const initialStreet = {
        street: '',
        isStreetValid: null
}

const initialCity = {
        city: '',
        isCityValid: null
}

const initialPostalCode = {
        postalCode: '',
        isPostalCodeValid: null
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

const CheckOutForm = ({onCancel, submitUserData}) => {

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

        const isFormValid = name.isNameValid && city.isCityValid 
        && postalCode.isPostalCodeValid && street.isStreetValid;

        if(!isFormValid){
            return;
        }

        submitUserData({
            name: name.name,
            street: street.street,
            city: city.city,
            postalcode: postalCode.postalcode
        })

    }

    const nameIsInvalid = name.isNameValid === false;
    const streetIsInvalid = street.isNameValid === false;
    const postalCodeIsInvalid = postalCode.isNameValid === false;
    const cityIsInvalid = city.isNameValid === false;

    const nameClasses = nameIsInvalid ? classes['invalid']: '';
    const streetClasses = streetIsInvalid ? classes['invalid']: '';
    const cityClasses = cityIsInvalid ? classes['invalid']: '';
    const postalCodeClasses = postalCodeIsInvalid ? classes['invalid']: '';

    return(
        <form className={classes['form']} onSubmit={confirmHandler}>
            <div className={`${classes['control']} ${nameClasses}`}>
                <label>Name</label>
                <input type="text" onChange={nameHandler} onBlur={nameBlurHandler} 
                value={name.name} />
                {nameIsInvalid && <p>Please enter a valid name</p>}
            </div>
            <div className={`${classes['control']} ${streetClasses}`}>
                <label>Street</label>
                <input type="text" onChange={streetHandler}onBlur={streetBlurHandler} 
                value={street.street} />
                {streetIsInvalid && <p>Please enter a valid street</p>}
            </div>
            <div className={`${classes['control']} ${postalCodeClasses}`}>
                <label>Postal Code</label>
                <input type="number" onChange={postalCodeHandler} onBlur={postalCodeBlurHandler} 
                value={postalCode.postalcode} />
                {postalCodeIsInvalid && <p>Please enter a valid postalCode</p>}
            </div>
            <div className={`${classes['control']} ${cityClasses}`}>
                <label>City</label>
                <input type="text" onChange={cityHandler} onBlur={cityBlurHandler} 
                value={city.city} />
                {cityIsInvalid && <p>Please enter a valid city</p>}
            </div>
            <div className={classes['actions']}>
                <button type="button" onClick={onCancel}>Cancel</button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    )
}

export default CheckOutForm;