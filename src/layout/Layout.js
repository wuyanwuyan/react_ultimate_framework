import React from 'react';
import Header from './Header'
import Menubar from './Menubar';

export default class Layout extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <Header/>
                <Menubar/>
            </div>
        )
    }
}