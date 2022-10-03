import React,{useContext} from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';
import {AuthContext} from '../store/AuthContext';

export const Backdrop = ({onClose}) =>{
    return <div className={classes['backdrop']} onClick={onClose} />
}

export const Overlay = ({children}) =>{
    return <div className={classes['modal']}>{children}</div>
}
const Modal = ({children, onClose}) =>{
    const ctx = useContext(AuthContext);
    return(
        <div>
            {ReactDOM.createPortal(<Backdrop onClose={ctx.onClose} />, document.getElementById('backdrop'))}
            {ReactDOM.createPortal(<Overlay>{children}</Overlay>, document.getElementById('overlay'))}
        </div>
    )
}

export default Modal;