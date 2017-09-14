
import React, {
  Component
} from 'react'
import { browserHistory } from 'react-router'
import { Link } from 'dva/router';
import FormG from '../common/FormG';
import SubSider from '../../components/sider/Sider';
import FeatureSetConfig from '../common/FeatureSetConfig';
import { DoPost, HandleCreateform } from '../../server'
import config from '../../config';
import { Layout, Tree, Table, Tabs, Button, Card, Menu, Icon, Modal } from 'antd'
const { Header, Footer, Sider, Content } = Layout
const TreeNode = Tree.TreeNode
const TabPane = Tabs.TabPane
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup
const confirm = Modal.confirm
let seft


const conf = {

    type: 'tableList',

    url: 'http://localhost:8810/admin/Handler_Product_V1.ashx',

    // 初始化页面的数据 回调函数传入 items 列表
    pageData: function(num, callback){

        var dat = {
          nPageSize: 8,
          nPageIndex: num - 1,
          strKeyWord: ''
        }
        console.log('dat.nPageIndex,==============', dat.nPageIndex)
        DoPost(this.url, "product_list", dat ,function(res){
            console.log('res========================', res)
            var list = [], Ui_list = res.obj.objectlist || [], totalcount = res.obj.totalcount
            Ui_list.forEach(function(item, index){
              console.log('index=========', index)
              list.push({
                key: index,
                strProductID: item.strProductID,
                strProductModel: item.strProductModel,
                strProductName_cn: item.strProductName_cn,
                strProductDescription_cn: item.strProductDescription_cn,
                strProductNote_cn: item.strProductNote_cn,
              })
            })
            console.log('list==========', list)
            const pagination = { ...seft.state.pagination }
            // Read total count from server
            // pagination.total = data.totalCount;
            pagination.total = totalcount;
            callback( list, {
              total: pagination.total,
              nPageSize: 8
            })
        }, function(error){

          message.info(error);
        })
    },

    columns: [
        {
            title: '型号',
            dataIndex: 'strProductModel',
            type: 'string'
        }, {
            title: '名称',
            dataIndex: 'strProductName_cn',
            type: 'string'
        }, {
            title: '描述',
            dataIndex: 'strProductDescription_cn',
            type: 'string'
        },{
            title: '备注',
            dataIndex: 'strProductNote_cn',
            type: 'string'
        },{
            title: '操作',
            dataIndex: 'strProductID',
            type: 'operate',    // 操作的类型必须为 operate
            btns: [{
              text: '更新',
              type: 'update'
            },{
              text: '删除',
              type: 'delete'
            }], // 可选
        }
    ],
    // 模拟添加数据的接口 回调
    Create: function(data, callback){
      let dat = {
        key: '1000',
        strProductModel: data.strProductModel,
        strProductName_cn: data.strProductName_cn,
        strProductDescription_cn: data.strProductDescription_cn,
        strProductNote_cn: data.strProductNote_cn,
      }

      HandleCreateform( this.url, "system_customer_add", dat ,function(res){
        //这块请求更新数据 成功回调
        callback(dat);
      })
    },

    //客户信息修改
    Update:function(data, callback){
      console.log('data============',data);
      let dat = {
        strProductID: data.strProductID,
        strProductModel: data.strProductModel,
        strProductName_cn: data.strProductName_cn,
        strProductDescription_cn: data.strProductDescription_cn,
        strProductNote_cn: data.strProductNote_cn
      }



      DoPost(this.url, "system_customer_update", dat ,function(res){
        //这块请求更新数据 成功回调
        callback(data)
      })
    },

    // 删除操作
    Delete: function(data, callback){
      var dat = {
        strProductID: data.strProductID
      }

      DoPost(this.url, "system_customer_del", dat ,function(res){
        //这块请求更新数据 成功回调

        callback(data)
      })
    },
    // 创建项目所需的字段 与 更新项目所需的字段
    // rules 规范可见 https://github.com/yiminghe/async-validator

    UType: [
        {
          name: 'strProductCategoryModel',
          label: '型号',
          type: 'string',
          placeholder: '请输入型号',
          rules: [{ required: true, min: 5, message: '型号至少为 5 个字符' }]
        }, {
          name: 'strProductCategoryName_cn',
          label: '名称',
          type: 'string',
          placeholder: '请输入名称',
          rules: [{ required: true, min: 5, message: '描述至少为 5 个字符' }]
        }, {
          name: 'strProductCategoryDescription_cn',
          label: '描述',
          type: 'string',
          placeholder: '请输入描述',
          rules: [{ required: true, min: 5, message: '描述至少为 5 个字符' }]
        }, {
          name: 'strProductCategoryNote_cn',
          label: '备注',
          type: 'string',
          placeholder: '请输入备注',
          rules: [{ required: true, message: '备注至少为 5 个字符' }]
        }
    ],

    // 添加客户名单
    // rules 规范可见 https://github.com/yiminghe/async-validator
    CType: [
      {
          name: 'strProductCategoryModel',
          label: '型号',
          type: 'string',
          placeholder: '请输入备注',
          rules: [{ required: true, message: '备注至少为 5 个字符' }]
      },{
          name: 'strProductCategoryName_cn',
          label: '名称',
          type: 'string',
          placeholder: '请输入备注',
          rules: [{ required: true, message: '备注至少为 5 个字符' }]
      },{
          name: 'strProductCategoryDescription_cn',
          label: '描述',
          type: 'string',
          placeholder: '请输入备注',
          rules: [{ required: true, message: '备注至少为 5 个字符' }]
      },{
          name: 'strProductCategoryNote_cn',
          label: '备注',
          type: 'string',
          placeholder: '请输入备注',
          rules: [{ required: true, message: '备注至少为 5 个字符' }]
      }
    ],
    // 可设置的查询字段
    RType:[
      {
          name: 'ischange',
          label: '是否过滤',
          type: 'switch',
          defaultValue: false
      }
    ],
};

const Feature = FeatureSetConfig(conf);

export default class App extends Component {

  constructor(props) {
    super(props)
    console.log('props.siderInfo==========', props.siderInfo)
    this.state = {
      siderInfo: props.siderInfo,
      data: [{
        key: 0,
        uProductCategoryUUID: '',
        strProductCategoryModel: '',
        strProductCategoryName_cn: '',
        strProductCategoryDescription_cn: '',
        strProductCategoryNote_cn: ''
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

  onchangeHandle_callback = (key) => {
    console.log(key)
  }

  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
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
    return (
      <div>
        <SubSider {...this.state.siderInfo}/>
        <Feature />
      </div>
    )
  }
}
