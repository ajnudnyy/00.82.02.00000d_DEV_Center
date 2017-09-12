
import React, {
  Component
} from 'react'
import { browserHistory } from 'react-router'
import { Link } from 'dva/router';
import FormG from '../common/FormG';
import SubSider from '../../components/sider/Sider';
import config from '../../config';
import { Layout, Tree, Table, Tabs, Button, Card, Menu, Icon, Modal, message } from 'antd'
import { DoPost } from '../../server'
const { Header, Footer, Sider, Content } = Layout
const TreeNode = Tree.TreeNode
const TabPane = Tabs.TabPane
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup
const confirm = Modal.confirm
let seft

const columns = [{
  title: 'uCustomerUUID',
  dataIndex: 'uCustomerUUID',
  render: name => `${name.first} ${name.last}`
}, {
  title: 'strCustomerName',
  dataIndex: 'strCustomerName',
  width: '20%',
}, {
  title: 'strCustomerAddress',
  dataIndex: 'strCustomerAddress',
}, {
  title: 'strCustomerEmail',
  dataIndex: 'strCustomerEmail',
}];

export default class Feature extends Component {

  constructor(props) {
    super(props)
    this.state = {
      siderInfo: props.siderInfo,
      data: [{
        key: 0,
        uCustomerUUID: '',
        strCustomerName: '',
        strCustomerAddress: '',
        strCustomerEmail: ''
      }],
      pagination: {
        nPageIndex: '1',
        nPageSize: '8'
      },
      params: {
        nPageIndex: '1',
        nPageSize: '8',
        strKeyWord: ""
      },
      loading: false
    }
    seft = this;
  }

  componentDidMount() {
    this.Uiproject_List(this.state.params)
  }

  onchangeHandle_callback = (key) => {
    console.log(key)
  }

  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  }

  handleTableChange = (pagination) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    console.log('pagination===========',pagination)
    this.Uiproject_List({
      nPageSize: pager.nPageSize,
      nPageIndex: pagination.current,
      strKeyWord: ""
    });
  }

  Uiproject_List = (params) => {
    seft.setState({ loading: true })
    var dat = {
      nPageSize: params.nPageSize,
      nPageIndex: params.nPageIndex,
      strKeyWord: params.strKeyWord,
      ...params
    }
    console.log('dat==============', dat)
    DoPost('http://localhost:8810/admin/Handler_Customer_V1.ashx', "system_customer_list", dat ,function(res){
        console.log('res===================', res)

        var templist = [], Ui_list = res.obj.objectlist || [], totalcount = res.obj.totalcount
        Ui_list.forEach(function(item, index){
          console.log('index=========', index)
          templist.push({
            key: index,
            uCustomerUUID: item.uCustomerUUID,
            strCustomerMobile: item.strCustomerMobile,
            strCustomerName: item.strCustomerName,
            strCustomerAddress: item.strCustomerAddress,
            strCustomerEmail: item.strCustomerEmail
          })
        })
        const pagination = { ...seft.state.pagination }
        // Read total count from server
        // pagination.total = data.totalCount;
        pagination.total = totalcount;

        seft.setState({
          loading: false,
          data: templist,
          pagination,
        });
    }, function(error){
      message.info(error);
    })

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

  HandleViewPl = (uULProjectUUID) => {
    var url = 'http://dev.top-link.me/ul/?id='+ uULProjectUUID;
    var win = window.open(url, '_blank');
    win.focus()
  }

  render() {
    const columns = [{
        title: '名称',
        dataIndex: 'strCustomerName',
        render: text => <a href="#">{text}</a>,
      }, {
        title: '手机',
        dataIndex: 'strCustomerMobile',
      }, {
        title: '客户地址',
        dataIndex: 'strCustomerAddress',
      }, {
        title: '操作',
        dataIndex: 'uCustomerUUID',
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
      opName: "Ul工程项目添加",
      modleName: "UIproject",
      op: "_Add",
      uDevModelUUID: "0",
      CType: [
          {
              name: 'strUIProjectName',
              label: '工程名',
              type: 'string',
              placeholder: '请输入PL工程名称',
              rules: [{ required: true, min: 5, message: '用户名至少为 5 个字符' }]
          }
      ]
    }

    const operations = FormG(MeduleInfo);
    return (
      <div>
        <SubSider {...this.state.siderInfo}/>
        <Tabs defaultActiveKey="1"
              onChange={this.onchangeHandle_callback}
              tabBarExtraContent={operations}
              style={{ }}>
         <TabPane tab="全部" key="1">
           <Table columns={columns}
             rowSelection={rowSelection}
             rowKey={record => record.registered}
             dataSource={this.state.data}
             pagination={this.state.pagination}
             loading={this.state.loading}
             onChange={this.handleTableChange}/>
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
