import { roomById } from "@/app/services/roomService";
import { IRoom } from "@/lib/interfaceBase";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Image,
  List,
  Modal,
  Row,
  Space,
  Spin,
  Tag,
  Typography,
} from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useState } from "react";
const { Text } = Typography;

interface IProps {
  // onEditRoomProduct: (room: IRoom) => void;
  // onDeleteRoomProduct: (roomId: number) => void;
  data: IRoom[];
  // loading: boolean;
}
const ListRoomProduct: React.FC<IProps> = ({
  // onEditRoomProduct,
  // onDeleteRoomProduct,
  data,
  // loading,
}) => {
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const roomsWithProducts =
    data?.content?.filter((room) => room.roomProducts?.length > 0) || [];
  const roomsWithoutProducts =
    data?.content?.filter(
      (room) => !room.roomProducts || room.roomProducts.length === 0
    ) || [];
  const handleEdit = async (id: number) => {
    // const roomOrder = await findRoomOrderID(id);
    const room = await roomById(id);
    //@ts-ignore
    // onEdit(roomOrder);
    //@ts-ignore
    // onEditRoom(room);
    setSelectedRoom(id);
  };

  return (
    <>
      <Row justify={"space-between"}>
        <Col span={10}>
          <Card style={{ marginTop: "20px" }}>
            <Text>
              <Row justify="space-between">
                Danh sách BÀN có sản phẩm mặc định <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text>
                  Đang chọn bàn:{" "}
                  <p
                    style={{
                      // width: "100px",
                      textAlign: "center",
                      minHeight: "20px",
                      width: "10px",
                      border: "1px solid red",
                    }}
                  ></p>
                </Text>
                <Text>
                  Đang sử dụng:{" "}
                  <p
                    style={{
                      textAlign: "center",
                      minHeight: "20px",
                      width: "10px",
                      backgroundColor: "#307DC7",
                    }}
                  ></p>
                </Text>
              </Row>
            </Text>{" "}
            <List
              style={{ marginTop: "20px" }}
              grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 6, xxl: 6 }} // Adjust the grid settings
              dataSource={roomsWithProducts.map((room) => ({
                ...room,
                key: room.id,
              }))}
              renderItem={(item) => {
                //@ts-ignore
                const { name, id, roomOrders } = item;
                // const active = roomOrders.length > 0;
                const isUsed = roomOrders && roomOrders.length;
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
                          width: "115px",
                          textAlign: "center",
                          minHeight: "90px",
                          border:
                            selectedRoom === id
                              ? "1px solid red"
                              : "1px solid #e8e8e8",
                          backgroundColor: isUsed ? "#307DC7" : "",
                        }}
                      >
                        <Text strong style={{ color: isUsed ? "white" : "" }}>
                          {name}
                        </Text>
                        <br />
                        <Text
                          type="secondary"
                          style={{ color: isUsed ? "white" : "" }}
                        >
                          {isUsed ? "Đang sử dụng" : "Trống"}
                        </Text>
                      </Card>
                    </a>
                  </List.Item>
                );
              }}
            />
          </Card>
        </Col>
        <Col span={13}>
          <Card style={{ marginTop: "20px" }}>
            <Text>
              <Row justify="space-between">
                Danh sách BÀN không có sản phẩm mặc định <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text>
                  Đang chọn bàn:{" "}
                  <p
                    style={{
                      // width: "100px",
                      textAlign: "center",
                      minHeight: "20px",
                      width: "10px",
                      border: "1px solid red",
                    }}
                  ></p>
                </Text>
                <Text>
                  Đang sử dụng:{" "}
                  <p
                    style={{
                      textAlign: "center",
                      minHeight: "20px",
                      width: "10px",
                      backgroundColor: "#307DC7",
                    }}
                  ></p>
                </Text>
              </Row>
            </Text>
            <List
              style={{ marginTop: "20px" }}
              grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 5 }}
              dataSource={roomsWithoutProducts.map((room) => ({
                ...room,
                key: room.id,
              }))}
              renderItem={(item) => {
                //@ts-ignore
                const { name, id, roomOrders } = item;
                // const active = roomOrders.length > 0;
                const isUsed = roomOrders && roomOrders.length;
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
                          width: "115px",
                          textAlign: "center",
                          minHeight: "90px",
                          border:
                            selectedRoom === id
                              ? "1px solid red"
                              : "1px solid #e8e8e8",
                          backgroundColor: isUsed ? "#307DC7" : "",
                        }}
                      >
                        <Text strong style={{ color: isUsed ? "white" : "" }}>
                          {name}
                        </Text>
                        <br />
                        <Text
                          type="secondary"
                          style={{ color: isUsed ? "white" : "" }}
                        >
                          {isUsed ? "Đang sử dụng" : "Trống"}
                        </Text>
                      </Card>
                    </a>
                  </List.Item>
                );
              }}
            />
            <Text style={{ color: "red" }}>
              Lưu ý: Hãy chọn bàn trước khi thêm sản phẩm mặc định cho bàn
            </Text>
            <Button onClick={showModal} style={{ float: "right" }}>
              Thêm sản phẩm mặc định
            </Button>
            <Modal
              title="Basic Modal"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
            </Modal>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default ListRoomProduct;
