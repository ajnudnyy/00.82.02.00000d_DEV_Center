import React, { PropTypes } from 'react';
import { Router, Route} from 'dva/router';
import IndexPage from './routes/IndexPage';
import AppPage from './routes/AppPage';

// router 路由配置 可使用链接放置参数数据
export default function({ history }) {
    return (
        <Router history={history}>
            <Route path="/" component={AppPage} />
            <Route path="/:FeatureId(/:params)" component={IndexPage} />
        </Router>
    )
}
