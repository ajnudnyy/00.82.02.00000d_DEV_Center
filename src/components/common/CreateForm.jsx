import React from 'react';
import { browserHistory } from 'react-router'
import { Form, Modal, Button, message } from 'antd';
import CFormItem from './CreateFormItem';
import { plInfo, HandleCreate } from '../../server'

let MeduleInfo
let self

let CForm = React.createClass({

    getInitialState: function() {
        return { visible: false }
    },

    render: function() {

        MeduleInfo = this.props.MeduleInfo
        const CType = typeof MeduleInfo == 'undefined' ? this.props.CType : MeduleInfo.CType;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 18 },
        }

        return  CType ?
                <div className="create">
                  <Button type="primary" icon="plus-circle-o" onClick={this.showModal}>{MeduleInfo.opName}</Button>
                  <Modal title={MeduleInfo.opName} visible={this.state.visible} onOk={this.handleCreate} onCancel={this.hideModal}>
                    <Form layout="horizontal">
                      {
                        CType.map(function(item, index){
                          //return self.dealConfigCType(item);
                          return <CFormItem key={index} getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} item={item}/>
                        })
                      }
                    </Form>
                  </Modal>
                </div>:
                <div></div>
    },

    handleCreate: function(){

        console.log('收到表单值: ', this.props.form.getFieldsValue());

        this.props.form.validateFields((errors, values) => {
            self = this
            if (!!errors) {
                message.info('表单格式不正确');
                return;
            } else {
                HandleCreate(MeduleInfo, this.props.form.getFieldsValue(), function(){
                  self.hideModal();
                  message.success('操作成功');
                  //window.location.reload()
                },
                function(){
                  self.hideModal();
                  message.info('提交失败');
                }
              )
            }
        });
        //this.props.submit(this.props.form.getFieldsValue());
    },

    handleReset: function() {
        this.props.form.resetFields();
    },

    showModal: function() {
        this.setState({ visible: true });
    },

    hideModal: function() {
        this.setState({ visible: false });
        this.handleReset();
    }
});

CForm = Form.create()(CForm);

export default CForm;
