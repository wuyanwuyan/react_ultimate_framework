import React from 'react';
import './LoadingEffect.css';

function Loader(props) {
    return  (
        <div
            className='flex_center_vh'
            style={{height: '100%'}}>
            <div
                className="load-container margin-vertical-lg">
                <div className="load-1"></div>
                <div className="load-2"></div>
                <div className="load-3"></div>
                <div className="load-4"></div>
                <div className="load-5"></div>
            </div>
        </div>
    )
}

export default Loader;
