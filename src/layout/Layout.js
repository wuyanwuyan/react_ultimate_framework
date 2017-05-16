import React from 'react';
import Header from './Header'
import Menubar from './Menubar';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom';
import Login from '../page/login';
export default class Layout extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Router>
                    <Switch>
                        <Route exact path='/login' component={ () => <Login />}/>
                        <Route component={() => (
                            <div>
                                <Header/>
                                <Menubar/>
                            </div>) }/>
                    </Switch>
            </Router>
        )
    }
}