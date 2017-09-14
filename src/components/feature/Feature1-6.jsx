
import React, {
  Component
} from 'react'
import { browserHistory } from 'react-router'
import { Link } from 'dva/router';
import FormG from '../common/FormG';
import SubSider from '../../components/sider/Sider';
import FeatureSetConfig from '../common/FeatureSetConfig';
import SelectItem from '../common/SelectItem';
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

    url: 'http://localhost:8810/admin/Handler_Machine_V1.ashx',

    // 初始化页面的数据 回调函数传入 items 列表
    initData: function(callback){

        var dat = {
          nPageSize: 8,
          nPageIndex: 0,
          strKeyWord: ''
        }
        DoPost(this.url, "machine_list", dat ,function(res){
            var list = [], Ui_list = res.obj.objectlist || [], totalcount = res.obj.totalcount
            Ui_list.forEach(function(item, index){
              list.push({
                key: index,
                strProductID: item.strProductID,
                strProductModel: item.strProductModel,
                strProductName_cn: item.strProductName_cn,
                strProductDescription_cn: item.strProductDescription_cn,
                strProductNote_cn: item.strProductNote_cn,
              })
            })
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
            title: '机器型号',
            dataIndex: 'strMachineSN',
            type: 'string'
        }, {
            title: '出厂日期',
            dataIndex: 'dtMachineBornDatetime',
            type: 'date'
        }, {
            title: '备注',
            dataIndex: 'strMachineNote',
            type: 'string'
        }, {
            title: '操作',
            dataIndex: 'uMachineUUID',
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
        strMachineSN: data.strMachineSN,
        dtMachineBornDatetime: data.dtMachineBornDatetime,
        strMachineNote: data.strMachineNote
      }

      HandleCreateform( this.url, "system_customer_add", dat ,function(res){
        //这块请求更新数据 成功回调
        callback(dat);
      })
    },

    //客户信息修改
    Update:function(data, callback){
      let dat = {
        uMachineUUID: data.uMachineUUID,
        strMachineSN: data.strMachineSN,
        dtMachineBornDatetime: data.dtMachineBornDatetime,
        strMachineNote: data.strMachineNote,
      }

      DoPost(this.url, "system_customer_update", dat ,function(res){
        //这块请求更新数据 成功回调
        callback(data)
      })
    },

    // 删除操作
    Delete: function(data, callback){
      var dat = {
        uMachineUUID: data.uMachineUUID

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
          name: 'strMachineSN',
          label: '机器型号',
          type: 'string',
          placeholder: '请输入型号',
          rules: [{ required: true, min: 5, message: '型号至少为 5 个字符' }]
        }, {
          name: 'dtMachineBornDatetime',
          label: '出厂日期',
          type: 'date',
          placeholder: '请输入名称',
          rules: [{ required: true, min: 5, message: '描述至少为 5 个字符' }]
        }, {
          name: 'strMachineNote',
          label: '备注',
          type: 'string',
          placeholder: '请输入描述',
          rules: [{ required: true, min: 5, message: '描述至少为 5 个字符' }]
        }
    ],

    // 添加客户名单
    // rules 规范可见 https://github.com/yiminghe/async-validator
    CType: [
      {
        name: 'strMachineSN',
        label: '机器型号',
        type: 'string',
        placeholder: '请输入型号',
        rules: [{ required: true, min: 5, message: '型号至少为 5 个字符' }]
      }, {
        name: 'dtMachineBornDatetime',
        label: '出厂日期',
        type: 'date',
        placeholder: '请输入名称',
        rules: [{ required: true, min: 5, message: '描述至少为 5 个字符' }]
      }, {
        name: 'strMachineNote',
        label: '备注',
        type: 'string',
        placeholder: '请输入描述',
        rules: [{ required: true, min: 5, message: '描述至少为 5 个字符' }]
      }
    ],

    // 可设置的查询字段
    RType:[
        {
            name: 'stype',
            label: '选择型号',
            type: 'select',
            defaultValue: '15101',
            options:[{
                text: '9a785d91-7f56-4c4a-a54b-595042d9d2ef',
                value: '15101'
            },{
                text: '67bc948e-b817-4b66-a2dc-21eaba878d46',
                value: '15100'
            },{
                text: 'b442b403-f8d2-45fe-bb17-c8944201b920',
                value: '15101'
            },{
                text: '9a785d91-7f56-4c4a-a54b-595042d9d2ee',
                value: '15100'
            }]
        }
    ],
    // 查询操作回调
    Retrieve: function(data, callback){

        console.log(data);

        var dat = {
          nPageSize: 8,
          nPageIndex: 0,
          uProductUUID: data.rtype,
          strKeyWord: ''
        }
        DoPost(this.url, "machine_list", dat ,function(res){

          var list = [], Ui_list = res.obj.objectlist || [], totalcount = res.obj.totalcount
          let i = 0;
          Ui_list.forEach(function(ele) {
              ele.key = i++;
          });

          // 查询成功 传入列表数据
          callback(Ui_list);

        }, function(error){
          message.info(error);
        })


    }
};

const Feature = FeatureSetConfig(conf);

let selectoption = {
  stylelish: {
    width: '60%',
    position: 'absolute',
    top: '15%'
  },
  Selectlist :[
    {item: '9a785d91-7f56-4c4a-a54b-595042d9d2ef'},
    {item: '9a785d91-7f56-e5-a54b-6u12w0g44'},
    {item: '9a785d91-7f56-4c4a-a54b-231946j6jhdf3'},
  ]
}

export default class App extends Component {

  constructor(props) {
    super(props)
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

  }

  onSelect = (selectedKeys, info) => {

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
          {/* {<SelectItem {...selectoption}/>} */}
        <Feature />
      </div>
    )
  }
}
