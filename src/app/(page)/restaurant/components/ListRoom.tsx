"use client";
import { findRoomOrderID } from "@/app/services/roomOrderService";
import { findAll, roomByAreaId, roomById } from "@/app/services/roomService";
import { IRoom, IRoomOrder } from "@/lib/interfaceBase";
import {
  Card,
  Col,
  Image,
  List,
  Radio,
  RadioChangeEvent,
  Row,
  Space,
  Typography,
  theme,
} from "antd";
import React, { useEffect, useState } from "react";

const { Text } = Typography;
interface IProps {
  onEdit: (roomOrder: IRoomOrder[]) => void;
  onEditRoom: (room: IRoom) => void;
  data: IRoom[] | undefined;
}

const ListRoom: React.FC<IProps> = ({ onEdit, onEditRoom, data }) => {
  const [filteredData, setFilteredData] = useState<IRoom[] | undefined>(data);
  const [selectedArea, setSelectedArea] = useState<number | null>(0);
  const [selectedStatus, setSelectedStatus] = useState<number | null>(11);
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [valueRadio, setValueRadio] = useState(1);
  const [valueRadioButton, setValueRadioButton] = useState(0);
  const [usedTablesCount, setUsedTablesCount] = useState<number>(0);
  const [availableTablesCount, setAvailableTablesCount] = useState<number>(0);

  const handleEdit = async (id: number) => {
    const roomOrder = await findRoomOrderID(id);
    const room = await roomById(id);
    //@ts-ignore
    onEdit(roomOrder);
    //@ts-ignore
    onEditRoom(room);
    setSelectedRoom(id);
  };

  const onChangeRoomArea = async (e: RadioChangeEvent) => {
    const areaId = e.target.value as number;
    setSelectedArea(areaId);
    setValueRadioButton(areaId);

    setSelectedStatus(11);
    setValueRadio(11);

    if (areaId === 0) {
      //@ts-ignore
      setFilteredData(data.content);
    } else {
      const responses = await roomByAreaId(areaId);
      //@ts-ignore
      setFilteredData(responses.content);
    }
  };

  const onChangeRoomStatus = (e: RadioChangeEvent) => {
    const statusId = e.target.value as number;
    setSelectedStatus(statusId);
    setValueRadio(statusId);
  };
  useEffect(() => {
    //@ts-ignore
    const filteredRooms = data?.content?.filter((room) => {
      //@ts-ignore
      const areaCondition =
        selectedArea === 0 || room.area.id === selectedArea;
      const statusCondition =
        selectedStatus === 11 ||
        (selectedStatus === 12 && room.status) ||
        (selectedStatus === 13 && !room.status);
      if (selectedStatus === 11) {
        setValueRadio(11);
      }
      return areaCondition && statusCondition;
    });

    setFilteredData(filteredRooms);
    //@ts-ignore
    const usedTables = filteredRooms?.filter((room) => room.status) || [];
    //@ts-ignore
    const availableTables = filteredRooms?.filter((room) => !room.status) || [];
    setUsedTablesCount((prevCount) =>
      usedTables.length > 0 ? usedTables.length : prevCount
    );
    setAvailableTablesCount((prevCount) =>
      availableTables.length > 0 ? availableTables.length : prevCount
    );
  }, [data, selectedArea, selectedStatus]);
  return (
    <>
      <div style={{ padding: "10px", minHeight: "80vh" }}>
        <Radio.Group
          onChange={onChangeRoomArea}
          buttonStyle="solid"
          value={valueRadioButton}
        >
          <Radio.Button value={0} style={{ marginRight: "10px" }}>
            Tất cả
          </Radio.Button>
          <Radio.Button value={1} style={{ marginRight: "10px" }}>
            Khu vực 1
          </Radio.Button>
          <Radio.Button value={2} style={{ marginRight: "10px" }}>
            Khu vực 2
          </Radio.Button>
        </Radio.Group>
        <br />
        <Radio.Group
          onChange={onChangeRoomStatus}
          value={valueRadio}
          style={{ padding: "10px" }}
        >
          <Radio value={11}>Tất cả</Radio>
          <Radio value={12}>{`Sử dụng (${usedTablesCount})`}</Radio>
          <Radio value={13}>{`Còn trống (${availableTablesCount})`}</Radio>
        </Radio.Group>
        <List
          grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 6, xxl: 6 }} // Adjust the grid settings
          dataSource={filteredData}
          renderItem={(item) => {
            const { name, id, status } = item;
            return (
              <List.Item>
                <a onClick={() => handleEdit(id)}>
                  <Card
                    size="small"
                    hoverable
                    cover={
                      <Image
                        src="https://firebasestorage.googleapis.com/v0/b/leafy-emblem-385311.appspot.com/o/image%2Fdining-room%20(3).png?alt=media&token=116a175e-7315-41ac-ab29-98b477fbc032"
                        alt="product"
                        style={{ width: "68px" }}
                        preview={false}
                      />
                    }
                    style={{
                      // width: "100px",
                      textAlign: "center",
                      minHeight: "90px",
                      border:
                        selectedRoom === id
                          ? "1px solid red"
                          : "1px solid #e8e8e8",
                      backgroundColor: status ? "#307DC7" : "",
                    }}
                  >
                    <Text strong style={{ color: status ? "white" : "" }}>
                      {name}
                    </Text>
                    <br />
                    <Text
                      type="secondary"
                      style={{ color: status ? "white" : "" }}
                    >
                      {status ? "Đang sử dụng" : "Trống"}
                    </Text>
                  </Card>
                </a>
              </List.Item>
            );
          }}
        />
      </div>
    </>
  );
};

export default ListRoom;
