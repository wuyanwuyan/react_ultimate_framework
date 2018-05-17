import React from 'react';
import './SimpleTab.css';

export default class SimpleTab extends React.Component {
    static defaultProps = {
        width: 120
    }

    constructor(props) {
        super(props);
        this.state = {
            tabIndex: 0,
        }

    }


    _onChangeTab = (index) => () => {
        if (index === this.state.tabIndex) return;
        this.setState({tabIndex: index})
        this.props.onChange(index);
    }

    render() {
        const props = this.props;
        const state = this.state;
        return (
            <div className='flex simple-tab' style={{width: props.width}}>
                <span className={state.tabIndex === 0 ? 'active' : ''} onClick={this._onChangeTab(0)}>涨</span>
                <span className={state.tabIndex === 1 ? 'active' : ''} onClick={this._onChangeTab(1)}>跌</span>
            </div>
        )
    }
}