import React from 'react';
import { Affix, Menu, Icon, Input, Row, Col } from 'antd';
import { Link } from 'dva/router';

import LOGO from './assets/TOP-STAR-LOGO.png'

const Search = Input.Search;
const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;

const HeadMenuItemCreat  = (items) => {
        return items.map(function(item){
            return  <Link key={item.key} to={'/'+item.key}>{item.title}</Link>
        });
};

function Header(props){

    return  <div style={props.style} className="header">
              <Row type="flex" justify="space-around" align="middle">
                <Col span={2}><DemoBox value={100}><img src={LOGO} style={{ width: '64%', height: '33px' }}/></DemoBox></Col>
                <Col span={8}><DemoBox value={50}><h4>{ props.title }</h4></DemoBox></Col>
                <Col span={4}><DemoBox value={40}>
                  <div>
                    <Search
                      placeholder="输入内容"
                      style={{ width: 300 }}
                      onSearch={value => console.log(value)}/>
                  </div>
                </DemoBox></Col>
                <Col span={1}><DemoBox value={40}>
                  <Icon type="question-circle-o" style={{fontSize: '27px'}}/>
                  <span style={{verticalAlign: 'super'}}>帮助</span>
                </DemoBox></Col>
                <Col span={1}><DemoBox value={40}>
                  {
                    props.aver == 'default' ? <Icon type="user" style={{ fontSize: '27px' }}/> : <img style={{borderRadius: '100%'}} width='36' src={ props.aver } />
                  }
                  <span style={{ verticalAlign: 'sub' }}>{ props.name }</span>
                </DemoBox></Col>
              </Row>
            </div>;
};

export default Header;
