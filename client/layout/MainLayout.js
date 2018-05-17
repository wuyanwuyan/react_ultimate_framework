import React from "react";
import "./mainLayout.css";
import {NavLink} from "react-router-dom";


export default class MainLayout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            [
                <div key='header' style={{backgroundColor: 'white'}}>
                    <header className='flex'>

                        <img className='logo alignSelfCenter margin-left-md' src={require('../assets/logo.png')}/>

                        <ul className='ul-links flex_center_v alignSelfEnd'>
                            <li>
                                <NavLink exact className='nav-link' activeClassName='nav-link-active'
                                         to='/'>7x24快讯</NavLink>
                            </li>
                            <li>
                                <NavLink className='nav-link' activeClassName='nav-link-active'
                                         to='/realtime'>实时行情</NavLink>
                            </li>
                            <li>
                                <NavLink className='nav-link' activeClassName='nav-link-active'
                                         to='/about'>关于我们</NavLink>
                            </li>
                        </ul>
                    </header>
                </div>,
                <main key='main'>
                    {this.props.children}
                </main>,
                <footer key='footer'>
                    <p>京ICP备18019521号-1</p>
                </footer>

            ]

        )
    }
}


