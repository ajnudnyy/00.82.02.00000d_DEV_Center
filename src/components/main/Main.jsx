import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router'

const Main = (props) => {

    let Feature = props.feature;

    return  <div key={props.featureId} className="mainer" style={{ height: '100%' }}>
                <Feature params={props.params || ''}  className="item" />
            </div>
}

export default Main;
