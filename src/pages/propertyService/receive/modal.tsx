import { memo, useRef, useState } from 'react';
import {
  Drawer,
  Descriptions,
  List,
  Avatar,
  Divider,
  Typography,
  Button,
  Tag,
  Modal,
  Radio,
  Input,
  Form,
} from 'antd';
import styles from './index.less';

interface IProps {
  visible: boolean;
  title: string;
  onClose: Function;
  onSubmit: Function;
}

const IModal: React.FC<IProps> = memo(
  ({ visible, title, onClose, onSubmit }) => {
    const [value, setValue] = useState('1');
    const [form] = Form.useForm();

    const handleOk = () => {
      form.submit();
    };

    const handleCancel = () => {
      onClose();
    };

    const onChange = (e: any) => {
      setValue(e.target.value);
    };

    const onFinish = (values: {
      approvalStatus: string;
      approvalFailExplain: string;
    }) => {
      onSubmit(values);
    };

    return (
      <Modal
        className={styles.modal}
        title={title}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
        centered={true}
        width={350}
        footer={
          <div className={styles.modalFooter}>
            <div>
              <Button
                type="primary"
                style={{ borderRadius: '20px' }}
                onClick={handleOk}
              >
                确认提交
              </Button>
            </div>
            <div>
              <Button
                type="primary"
                style={{ borderRadius: '20px' }}
                onClick={handleCancel}
              >
                取消提交
              </Button>
            </div>
          </div>
        }
      >
        <Form
          form={form}
          initialValues={{ approvalStatus: '1' }}
          autoComplete="off"
          onFinish={onFinish}
        >
          <Form.Item name="approvalStatus">
            <Radio.Group onChange={onChange} value={value}>
              <Radio value="1">审核通过</Radio>
              <Radio value="0">审核拒绝</Radio>
            </Radio.Group>
          </Form.Item>
          {value === '0' && (
            <Form.Item
              name="approvalFailExplain"
              rules={[{ max: 50, type: 'string', message: '最多输入50字' }]}
            >
              <Input.TextArea placeholder="请输入拒绝理由，最多50字" />
            </Form.Item>
          )}
        </Form>
      </Modal>
    );
  },
);

export default IModal;
