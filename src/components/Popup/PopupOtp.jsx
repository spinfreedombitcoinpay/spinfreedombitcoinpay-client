import React from "react";
import styles from "../Login/styles.module.css"
import "./pop.css"

export default function PopupOtp(props){
    return(props) ? (
        <div className="pop">
        <button  className="close" onClick={props.handleClose}>X</button>
        {props.content}
        </div>
    ):"";

}