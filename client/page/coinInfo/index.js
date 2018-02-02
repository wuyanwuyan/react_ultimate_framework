import React from "react";

import CoinBaseInfo from "./CoinBaseInfo";
import CoinMarketTrend from "./CoinMarketTrend";

export default class CoinInfo extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            [
                <CoinBaseInfo key="base"/>,
                <CoinMarketTrend key="trend"/>
            ]
        )
    }
}