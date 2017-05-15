import React from 'react';
import {Sider} from 'react-cqtoolbox/lib/layout';
import {Menu, MenuItem, SubMenu} from 'react-cqtoolbox/lib/menu';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import classNames from 'classnames';
import ArticleList from '../page/Articles';
import Write from '../page/Write';
import Media from '../page/Media';
import style from './menubar.scss';
export default class Menubar extends React.Component {
    constructor(props) {
        super(props);

    }

    onMenuClick = () => {

    }

    render() {
        return (
            <Router>
                <div className="flex">
                    <Sider collapsible={false} theme={style} width={140}>
                        <Menu>
                            <SubMenu theme={style} open={true} icon="file" title="文章">
                                <Link to="/articles"> <MenuItem theme={style}
                                                                onClick={this.onMenuClick}>
                                    所有文章
                                </MenuItem></Link>
                                <Link to="/write"> <MenuItem theme={style}
                                                             onClick={this.onMenuClick}>
                                    写文章
                                </MenuItem></Link>
                            </SubMenu>
                            <SubMenu theme={style} open={true} icon="file" title="媒体">
                                <Link to="/media"> <MenuItem theme={style}
                                                             onClick={this.onMenuClick}>
                                    所有媒体
                                </MenuItem> </Link>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <div  className={classNames("flex1",style.main_content)}>
                        <Route path='/articles' component={ () => <ArticleList />}/>
                        <Route path='/write' component={ () => <Write />}/>
                        <Route path='/media' component={ () => <Media />}/>
                    </div>
                </div>

            </Router>
        )
    }
}