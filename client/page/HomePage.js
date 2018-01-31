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
                <div className="flex1">
                    <TrendTable />
                </div>
                {
                    !__MOBILE__ && <div className="left-wrapper"><News /></div>
                }
            </div>

        );
    }
}

export default HomePage;