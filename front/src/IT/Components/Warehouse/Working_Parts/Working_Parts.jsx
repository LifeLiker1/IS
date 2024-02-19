import React, { useEffect, useState } from "react";
import "./Working_Parts.scss";
import { Table, Button } from "antd";
import { columns, getWorkingData } from "../VariablesForWarehouse/Variables";
import Loader from "../../../../Interactive/Loader/Loader";
import ModalForWarehouse from "../../../../Interactive/ModalWindows/ModalForWarehouse/ModalForWarehouse";

const Working_Parts = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getWorkingData();
      const sortedData = data.slice().sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        return nameA.localeCompare(nameB);
      });
      console.log(sortedData)
      setDataSource(sortedData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (equipment) => {
    setSelectedEquipment(equipment);
    setModalVisible(true);
  };

  const handleSave = async (values, equipment) => {
    const updateData = async () => {
      const requestData = {
        name: values.name,
        standFor: values.standFor,
        description: values.description,
        count: values.count,
      };

      try {
        const response = await fetch(
          `http://localhost:3001/api/warehouse/${equipment.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
          }
        );
        console.log(requestData);

        if (response.ok) {
          console.log("Данные успешно обновлены.");
        } else {
          console.error("Произошла ошибка при обновлении данных.");
        }
      } catch (error) {
        console.error("Произошла ошибка при обновлении данных.", error);
      } finally {
        fetchData();
        setModalVisible(false);
      }
    };

    updateData();
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };
// eslint-disable-next-line no-unused-vars
  const handleAdd = () => {
  };

  return (
    <div>
      <Table
        columns={[
          ...columns,
          {
            title: "Действие",
            dataIndex: "action",
            key: "action",
            render: (text, record) => (
              <Button type="link" onClick={() => handleEdit(record)}>
                Редактировать
              </Button>
            ),
          },
        ]}
        dataSource={dataSource}
      />
      {loading ? (
        <Loader />
      ) : (
        <>
          {selectedEquipment && (
            <ModalForWarehouse
              visible={modalVisible}
              onCancel={handleCancel}
              onSave={handleSave}
              equipment={selectedEquipment}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Working_Parts;
