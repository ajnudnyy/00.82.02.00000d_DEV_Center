import React from 'react';
import { Menu, Icon, Breadcrumb } from 'antd';
import { Link } from 'dva/router'

const Main = (props) => {

    let Feature = props.feature;
    console.log('props.params==========', props.params)
    return  <div key={props.featureId} className="mainer" style={{ height: '85%', padding: '0.5% 0.8%' }}>
              <Breadcrumb className="title">
                <Breadcrumb.Item>{props.ptitle}</Breadcrumb.Item>
                <Breadcrumb.Item>{props.title}</Breadcrumb.Item>
              </Breadcrumb>
              <Feature siderInfo={ props.siderInfo } params={props.params || ''}  className="item" />
            </div>
}

export default Main;
