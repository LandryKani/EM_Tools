import React, { useState, useEffect } from 'react'
import GetChart from './Chart';
import chart from '../../../assets/img/chartjs.png'


function GraphicBarre() {
    const [dateFrom, setDateFrom] = useState();
    const [dateTo, setDateTo] = useState();
    return (
        <div className='bloc_diagram'>
            <div className=' bloc_diagram_header display-flex-align-center'>
                <h4>Stats of number of vues </h4>
                <div className='bloc_date display-flex-align-center'>
                    <span> From </span> <input type="date" onChange={(e) => setDateFrom(e.target.value)} />
                    <span> to </span> <input type="date" onChange={(e) => setDateTo(e.target.value)} />
                </div>
            </div>
            <div className='Boc_chart'>
                <GetChart/>
            </div>
        </div>
    )
}

export default GraphicBarre