import { onGetHistory } from "@/app/services/HistoryService";
import { Tag } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";

const History = () => {
  const [historyData, setHistoryData] = useState<[]>();
  useEffect(() => {
    const fetchData = async () => {
      const res = await onGetHistory();
      //@ts-ignore
      setHistoryData(res);
    };
    fetchData();
  }, []);
  console.log(historyData);
  const columns: ColumnsType<[]> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Khởi tạo vào lúc",
      dataIndex: "createdAt",
      key: "createdAt",
    },

    {
      title: "Tạo bởi",
      dataIndex: "createdBy",
      key: "createdBy",
    },
    {
      title: "Sản phẩm",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Lý do",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "Cập nhật vào lúc",
      dataIndex: "updatedAt",
      key: "updatedAt",
    },
    {
      title: "Cập nhật bởi",
      dataIndex: "updatedBy",
      key: "updatedBy",
    },
  ];
  return (
    <>
      <Table
        columns={columns}
        scroll={{ x: 1000 }}
        dataSource={historyData?.map((history: any) => ({
          ...history,
          key: history.id,
        }))}
      />
    </>
  );
};
export default History;
