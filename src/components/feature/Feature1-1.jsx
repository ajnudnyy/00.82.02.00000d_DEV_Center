import React, {
  Component
} from 'react'
import { browserHistory } from 'react-router'
import { Link } from 'dva/router';
import FormG from '../common/FormG';
import { ButtonToolbar, Panel } from 'react-bootstrap';
import { Layout, Tree, Table, Tabs, Tag, Button, Card, Menu, Icon, Row, Col, Modal, message } from 'antd'
const { Header, Footer, Sider, Content } = Layout
const TreeNode = Tree.TreeNode
const TabPane = Tabs.TabPane
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup
const confirm = Modal.confirm

let seft

const title = (
  <h3>UI工程</h3>
);

export default class Feature extends Component {

  constructor(props) {
    super(props)

    this.state = {
      data: [],
      show: false
    }
    seft = this;
    this.Plproject_List()
  }

  onchangeHandle_callback = (key) => {
    console.log(key)
  }

  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  }

  handleClick = (e) => {
    if(e.key == 5){
      browserHistory.push('/Feature1-1')
    } else {
      browserHistory.push('/Feature1-2')
    }
  }

  Plproject_List = (e) => {
      var obj = {
          //uProjectUUID : 0 ,    // ¹¤³ÌUUID
      }

      this.DoPost_Project("Plproject_List",obj,function(res){
          console.log('Plproject_List=====', res)
          var Pl_list = res.obj || []
          var templist = []
          Pl_list.forEach(function(item, index){
            templist.push({
                key: index,
                strPLProjectName: item.strPLProjectName,
                strPLProjectDescription: item.strPLProjectDescription,
                strPLProjectNote: item.strPLProjectNote,
                uPLProjectUUID: item.uPLProjectUUID
              })
          })

          seft.setState({
             data: templist
          })
      });
  }

  DoPost_Project = (func,obj,cb) => {
    var url = "http://dev.top-link.me/dev/Handler_Plproject_V1.ashx";
    return this.DoPost(url,func,obj,cb);
  }

  DoPost = (url,func,obj,cb) => {

        var req = new TRequest();

        console.log(func);
        // exec : function (url, op, obj, cb, err)
        req.exec(url, func, obj,
            // success:
            function (json){

               cb(json);            //cbÊÇÒ»¸öº¯Êý£¬ÕâÀïµ÷ÓÃÁËÕâ¸öº¯Êý£¬È»ºó¸øÁË²ÎÊý¡£

               return ;
            },
            // error:

            function (json) {

            });

        return ;
  }

  HandleViewPl = (uPLProjectUUID) => {
    console.log(uPLProjectUUID)
    var url = 'http://dev.top-link.me/pl/?id='+ uPLProjectUUID;
    var win = window.open(url, '_blank');
    win.focus()
  }

  showModal () {
    seft.setState({
      show: true
    });
  }

  hideModal () {
    seft.setState({
      show: false
    });
  }

  HandleDeletePl = (uPLProjectUUID) => {
    console.log('uPLProjectUUID=======', uPLProjectUUID)
    confirm({
      title: '你确定要删除此条目?',
      content: '删除之后不可恢复',
      onOk() {
        console.log('OK');

        message.success('成功删除');
      },
      onCancel() {
        message.info('取消删除');
      },
    });
  }

  render() {
    console.log('this.state===',this.state)
    const columns = [{
      title: '工程名称',
      dataIndex: 'strPLProjectName',
      render: text => <a href="#">{text}</a>,
    }, {
      title: '描述',
      dataIndex: 'strPLProjectDescription',
    }, {
      title: '更新时间',
      dataIndex: 'strPLProjectNote',
    }, {
      title: '操作',
      dataIndex: 'uPLProjectUUID',
      render: (text, record) => (
        <span>
          <a onClick={ () => { seft.HandleViewPl( text ) } }>查看</a>
          <span className="ant-divider" />
          <a onClick={ () => { seft.HandleDeletePl( text ) } }>删除</a>
        </span>
      )
    }]

    // rowSelection object indicates the need for row selection
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',    // Column configuration not to be checked
      }),
    };

    const MeduleInfo = {
      opName: "PL工程添加",
      serverType: "Plproject_Add",
      uDevModelUUID: "0"
    }

    const operations = FormG(MeduleInfo);

    return (
        <div>
          <Tabs defaultActiveKey="1"
                onChange={this.onchangeHandle_callback}
                tabBarExtraContent={operations}>
             <TabPane tab="全部" key="1">
               <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.data} />
             </TabPane>
             <TabPane tab="已发布" key="2">
               <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.data} />
             </TabPane>
             <TabPane tab="发布中" key="3">
               <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.data} />
             </TabPane>
             <TabPane tab="已停止" key="4">
               <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.data} />
             </TabPane>
          </Tabs>
        </div>
    )
  }
}
