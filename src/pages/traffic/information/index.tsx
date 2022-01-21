import { memo } from 'react';
import Table from '@/components/table';

const Information = memo(() => {
  const columns = [
    {
      title: '车牌号',
      dataIndex: 'name',
      key: 'name',
      align: 'center' as 'center',
    },
    {
      title: '违停信息',
      dataIndex: 'age',
      key: 'age',
      align: 'center' as 'center',
    },
    {
      title: '违停时间',
      dataIndex: 'address',
      key: 'address',
      align: 'center' as 'center',
    },
    {
      title: '车主姓名',
      key: 'tags',
      dataIndex: 'tags',
      align: 'center' as 'center',
    },
    {
      title: '车主手机',
      key: 'action',
      dataIndex: 'action',
      align: 'center' as 'center',
    },
    {
      title: '操作',
      key: 'action1',
      dataIndex: 'action1',
      align: 'center' as 'center',
    },
  ];

  const data: any[] = [];
  return <Table columns={columns} dataSource={data} search />;
});

export default Information;