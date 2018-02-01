import React from 'react';

// 404 页面
export default class PageNotFound extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <label style={{color:'red',fontSize:'0.3rem'}} className="flex_center_vh">404</label>
            </div>
        )
    }
}