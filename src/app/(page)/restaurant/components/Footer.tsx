"use client";
import { findAll } from "@/app/services/roomService";
import { IRoom } from "@/lib/interfaceBase";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Typography, Space, Card, Row, Col, Modal, List, ModalFuncProps } from "antd";
import React, { useEffect, useState } from "react";
const { Text } = Typography;

const fullwidth: React.CSSProperties = {
  width: "100%",
};
interface IProps {
  room: IRoom | undefined;
  changeRoom: (roomId: any, newRoomId: any) => void;
  checkoutRoomOrder: (roomId: any) => void;
  totalPrice: number;
}

const Footer: React.FC<IProps> = (props) => {
  const [data, setData] = useState<[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { confirm } = Modal;
  console.log(props.room)
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showPromiseConfirm = () => {
    confirm({
      title: 'Bạn có chắc chắn muốn thanh toán?',
      icon: <ExclamationCircleFilled />,
      // content: '...',
      onOk() {
        return new Promise<void>((resolve) => {
          setTimeout(() => {
            checkoutRoomOrder(props.room?.id)
            resolve();
          }, 1000);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {
      },
    });
  };
  const formatCurrency = (value: number | undefined) => {
    if (typeof value !== "number") {
      return "N/A";
    }
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };
  const handleChangeRoom = async (roomId: any, newRoomId: any) => {
    try {
      props.changeRoom(roomId, newRoomId);
      handleCancel();
    } catch (error) {
      console.error("Error", error);
    }
  };
  const checkoutRoomOrder = async (roomId: any) => {
    try {
      props.checkoutRoomOrder(roomId);
    } catch (error) {
      console.error("Error", error);

    }
  }
  const listData = async () => {
    const response = await findAll();
    //@ts-ignore
    setData(response);
  };
  useEffect(() => {
    listData();
  }, [data]);
  return (
    <Row gutter={32} justify={"center"}>
      <Col span={16}>
        <Space direction="vertical" style={fullwidth}>
          <Space direction="vertical" style={fullwidth}>
            <Row gutter={16}>
              <Col span={12}>
                <Button type="primary" block>
                  Tìm khách hàng
                </Button>
              </Col>
              <Col span={12}>
                <Button type="primary" block onClick={showModal}>
                  Chuyển bàn
                </Button>
                <Modal
                  title={
                    <span>
                      Chuyển từ
                      <span style={{ fontWeight: 750 }}> {props.room?.name} </span>
                      sang
                    </span>
                  }
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  width={1000}
                >
                  <List
                    grid={{
                      gutter: 5,
                      xs: 1,
                      sm: 2,
                      md: 3,
                      lg: 4,
                      xl: 6,
                      xxl: 3,
                    }}
                    style={{ padding: "10px" }}
                    dataSource={data.content}
                    renderItem={(item) => {
                      const { name, id } = item;
                      const roomInUse = props.room?.id === id; 
                      return (
                        <List.Item>
                          <a
                            onClick={() => handleChangeRoom(props.room?.id, id)}
                            style={{ pointerEvents: roomInUse ? 'none' : 'auto' }}
                          >
                            <Card
                              size="small"
                              hoverable
                              cover
                              style={{
                                textAlign: "center",
                                minHeight: "90px",
                                opacity: roomInUse ? 0.5 : 1, 
                                pointerEvents: roomInUse ? 'none' : 'auto',
                              }}
                            >
                              <Text strong>{name}</Text>
                              <br />
                              <Text type="secondary">Trống</Text>
                            </Card>
                          </a>
                        </List.Item>
                      );
                    }}
                  />
                </Modal>
              </Col>
            </Row>
          </Space>
          <Space
            direction="vertical"
            style={{
              width: "100%",
            }}
          >
            <Row gutter={16}>
              
              <Col span={12}>
                <Button type="primary" block>
                  Tạm tính
                </Button>
              </Col>
              <Col span={12}>
              <Button type="primary" danger block onClick={showPromiseConfirm}>
              Thanh toán
              </Button>
              </Col>
            </Row>
          </Space>
        </Space>
      </Col>
      <Col className="gutter-row" span={6}>
        <Space direction="vertical" style={fullwidth}>
          <Text strong>
            Tổng cộng:
            <Text type="danger"> {formatCurrency(props.totalPrice)}</Text>
          </Text>
          {/* <Button type="primary" danger size="large" block onClick={() => checkoutRoomOrder(props.room?.id)}> */}
          
        </Space>
      </Col>
    </Row>
  );
};

export default Footer;
