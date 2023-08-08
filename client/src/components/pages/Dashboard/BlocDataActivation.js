import React from 'react'
// import Button from '../../../buttons/Button.styled';
import img from "../../../assets/img/subscription.png";

function BlocDataActivation({val}) {

    return (
        <div className='item_bloc_data display-flex'>
            <div className='info_text_activation'>
                <h4>Total ads </h4>
                <h2>13K</h2>
                <h4><img src={img} /> ALL Subscription</h4>
            </div>
            <div className='info_activation'>
               <div className='data_active display-flex'>
                    <h3>12.7K</h3>
                    {/* <Button
                        title="ACTIVATE"
                        bgcolor="#2ec1ac"
                        borderRadius="30px"
                        height="40px"
                        maxWidth="100px"
                    /> */}
               </div>
               <div className='data_inactive display-flex'>
               <h3>0.3K</h3>
                    {/* <Button 
                        title="INACTIVATE"
                        bgcolor="#ff9f66"
                        borderRadius="30px"
                        height="40px"
                        maxWidth="100px"
                    /> */}
               </div>
            </div>

        </div>
    )
}

export default BlocDataActivation