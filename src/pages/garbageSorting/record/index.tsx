import { memo, useEffect, useState, useRef } from 'react';
import Table from '@/components/table';
import { getRecordList } from '@/util/servers';

const Receive = memo(() => {
  const [pages, setPages] = useState({
    pageNo: 1,
    pageSize: 10,
  });
  const [total, setTotal] = useState(0);
  const [queryValue, setQueryValue] = useState('');
  const [current, setCurrent] = useState(1);
  const [data, setData] = useState<undefined | any[]>(undefined);

  const columns = [
    {
      title: '投放设备',
      dataIndex: 'deviceName',
      key: 'deviceName',
      align: 'center' as 'center',
    },
    {
      title: '投放时间',
      dataIndex: 'rubbishTime',
      key: 'rubbishTime',
      align: 'center' as 'center',
    },
    {
      title: '投放人',
      dataIndex: 'userName',
      key: 'userName',
      align: 'center' as 'center',
    },
    {
      title: '用户ID',
      key: 'userId',
      dataIndex: 'userId',
      align: 'center' as 'center',
    },
    {
      title: '投放重量',
      key: 'rubbishWeight',
      dataIndex: 'rubbishWeight',
      align: 'center' as 'center',
    },
    {
      title: '垃圾类型',
      key: 'rubbishType',
      dataIndex: 'rubbishType',
      align: 'center' as 'center',
    },
    {
      title: '获取积分',
      key: 'score',
      dataIndex: 'score',
      align: 'center' as 'center',
    },
  ];

  useEffect(() => {
    setData(undefined);
    const options = Object.assign({}, pages, {
      params: { deviceName: queryValue },
    });
    getRecordList(options).then((data) => {
      if (data.status === 200) {
        setData(data?.data?.data?.records);
        setTotal(data?.data?.data?.total);
      }
    });
  }, [pages]);

  function onQuery(value: string) {
    setQueryValue(value);
    setPages({
      pageNo: 1,
      pageSize: 10,
    });
    setCurrent(1);
  }

  function onPageChange(page: number, pageSize: number) {
    setPages({
      pageNo: page,
      pageSize: pageSize,
    });
    setCurrent(page);
  }

  return (
    <Table
      columns={columns}
      dataSource={data}
      total={total}
      onPageChange={onPageChange}
      current={current}
      search
      onQuery={onQuery}
    />
  );
});

export default Receive;
