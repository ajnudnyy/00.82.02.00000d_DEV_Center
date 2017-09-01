
import React, {
  Component
} from 'react'
import { browserHistory } from 'react-router'
import { Link } from 'dva/router';
import FormG from '../common/FormG';
import { Layout, Tree, Table, Tabs, Button, Card, Menu, Icon, Modal } from 'antd'
const { Header, Footer, Sider, Content } = Layout
const TreeNode = Tree.TreeNode
const TabPane = Tabs.TabPane
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup
const confirm = Modal.confirm
let seft

export default class Feature extends Component {

  constructor(props) {
    super(props)

    this.state = {
      data: []
    }
    seft = this;
    this.Uiproject_List()
  }

  onchangeHandle_callback = (key) => {
    console.log(key)
  }

  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  }

  handleClick = (e) => {
    if(e.key == 5){
      console.log('e.key=====', e.key)
      windows.location.href = 'http://localhost:8989/#/Feature1-3?_k=6xoiy9';
    } else {
      console.log('e.key=====', e.key)
      windows.location.href = 'http://localhost:8989/#/Feature1-2?_k=ihycok';
    }
  }

  Uiproject_List = (e) => {
      var obj = {
          //uProjectUUID : 0 ,    // ¹¤³ÌUUID
      };

      this.DoPost_Project("Uiproject_List",obj,function(res){
          console.log('Uiproject_List=====', res.obj)
          var Ui_list = res.obj || []
          var templist = []
          Ui_list.forEach(function(item, index){
            templist.push({
                key: index,
                strUIProjectName: item.strUIProjectName,
                strUIProjectDescription: item.strUIProjectDescription,
                pricing: '253.45',
                nUIProjectFlag: item.nUIProjectFlag == 1 ? '开发中' : '已发布',
                dtUIProjectUpdateTime_UTC: item.dtUIProjectUpdateTime_UTC,
                op: '1'
              })
          })

          seft.setState({
             data: templist
           })
      });
  }

  DoPost_Project = (func,obj,cb) => {
    var url = "http://dev.top-link.me/dev/Handler_Uiproject_V1.ashx";
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

  showConfirm = () => {
    confirm({
      title: '你确定要删除此条目?',
      content: '删除之后不可恢复',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  render() {
    console.log('this.state===',this.state)
    const columns = [{
      title: '工程名称',
      dataIndex: 'strUIProjectName',
      render: text => <a href="#">{text}</a>,
    }, {
      title: '描述',
      dataIndex: 'strUIProjectDescription',
    }, {
      title: '定价',
      dataIndex: 'pricing',
    }, {
      title: '状态',
      dataIndex: 'nUIProjectFlag',
    }, {
      title: '更新时间',
      dataIndex: 'dtUIProjectUpdateTime_UTC',
    }, {
      title: '操作',
      dataIndex: 'op',
      render: text => <a href="#">查看</a>,
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
      opName: "Ul工程项目添加",
      serverType: "Ulproject_Add",
      uDevModelUUID: "0"
    }

    const operations = FormG(MeduleInfo);

    return (
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
    )
  }
}