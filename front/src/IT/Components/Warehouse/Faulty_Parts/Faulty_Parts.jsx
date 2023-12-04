import React, { useEffect, useState } from "react";
import "./Faulty_Parts.scss";
import {
  columns,
  getFaultyData,
} from "../VariablesForWarehouse/Variables";
import { Table, Button } from "antd";
import Loader from "../../../../Interactive/Loader/Loader";
import ModalForWarehouse from "../../../../Interactive/ModalWindows/ModalForWarehouse/ModalForWarehouse";

const Faulty_Parts = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getFaultyData();
      const sortedData = data.slice().sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        return nameA.localeCompare(nameB);
      });
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
    console.log(equipment);
    setSelectedEquipment(equipment);
    setModalVisible(true);
  };

  const handleSave = async (values, equipment) => {
    const updateData = async () => {
      const requestData = {
        name: values.name,
        standFor: values.standFor,
        description: values.description,
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

  const handleAdd = () => {
    // Реализуйте логику добавления нового оборудования
  };
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Button type="primary" onClick={handleAdd}>
            Добавить оборудование
          </Button>
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

export default Faulty_Parts;
