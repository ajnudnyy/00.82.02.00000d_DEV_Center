import React from 'react';
import { Form, Modal, Button } from 'antd';
import CFormItem from './CreateFormItem';

let CForm = React.createClass({
    getInitialState: function() {
        return { visible: false }
    },

    render: function() {
        const self = this;
        const CType = this.props.CType;
        const MeduleInfo = this.props.MeduleInfo
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
                        CType.map(function(item){
                          //return self.dealConfigCType(item);
                          return <CFormItem key={item.name} getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout} item={item}/>
                        })
                      }
                    </Form>
                  </Modal>
                </div>:
                <div></div>
    },

    handleCreate: function(){

        console.log('收到表单值：', this.props.form.getFieldsValue());

        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                console.log('Errors in form!!!');
                return;
            }else{
                console.log('Submit!!!');
                this.props.submit(values);
                this.hideModal();
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
