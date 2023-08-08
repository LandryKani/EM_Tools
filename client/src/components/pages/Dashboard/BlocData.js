import React from 'react'
import { CircularProgressbar } from "react-circular-progressbar";
import "../../../assets/css/Admin/circularProgressbar.css";
import img from "../../../assets/img/subscription.png"
function BlocData({val, color}) {

    if ( color == "purple") {
        color = "color-purple"
    } else {
        color = "color-green"
    }
    
    
    return (
        <div className='item_bloc_data display-flex'>
            <div className={`info_text ${color}`} >
                <h4>Total ads <span>  00XAF /Month</span></h4>
                <h2>10/10</h2>
                <h4> <img src={img} />  FREE Subscription </h4>
            </div>
            <div className='info_graph'>
                <CircularProgressbar className={`${color}`} value={val} text={`${val}%`} />
            </div>

        </div>
    )
}

export default BlocData