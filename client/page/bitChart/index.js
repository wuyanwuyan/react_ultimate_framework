import React from 'react';
import ReactDOM from 'react-dom';
import Chart from './Chart';

class BitChart extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Chart />
            </div>
        )
    }
}




if (__CLIENT__) {
    let initState = window.__INITIAL_STATE__ || {};
    ReactDOM.render(<BitChart {...initState}/>, document.getElementById("react-container"));
}

export default BitChart;