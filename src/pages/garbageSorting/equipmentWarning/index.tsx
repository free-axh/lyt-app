import { memo, useEffect, useState, useRef } from 'react';
import Table from '@/components/table';
import { getEquipmentWarningList } from '@/util/servers';

const EquipmentWarning = memo(() => {
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
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      align: 'center' as 'center',
      render: (t, r, i) => {
        return i + 1;
      },
    },
    {
      title: '告警设备',
      dataIndex: 'deviceName',
      key: 'deviceName',
      align: 'center' as 'center',
    },
    {
      title: '告警时间',
      dataIndex: 'createTime',
      key: 'createTime',
      align: 'center' as 'center',
    },
    {
      title: '设备ID',
      key: 'deviceId',
      dataIndex: 'deviceId',
      align: 'center' as 'center',
    },
    {
      title: '告警类型',
      key: 'alarmMsg',
      dataIndex: 'alarmMsg',
      align: 'center' as 'center',
    },
  ];

  useEffect(() => {
    setData(undefined);
    const options = Object.assign({}, pages, {
      params: { deviceName: queryValue },
    });
    getEquipmentWarningList(options).then((data) => {
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

export default EquipmentWarning;
