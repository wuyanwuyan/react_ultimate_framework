import React from "react";
import TrendTable from './component/TrendTable';
import News from './component/News';


class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="flex">
                <div className="flex1" style={{marginRight: 20}}>
                    <TrendTable />
                </div>
                <div className="left-wrapper">
                    <News />
                </div>
            </div>

        );
    }
}

export default HomePage;