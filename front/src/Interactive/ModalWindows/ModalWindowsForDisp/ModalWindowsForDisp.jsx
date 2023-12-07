import React, { useEffect, useState } from "react";
import { Modal, Button, Select } from "antd";

const ModalForDisp = ({
  visible,
  onCancel,
  onPost,
  selectedEquipment,
  modalParameters,
  handleRequestChange,
  handleIssueChange
}) => {
  const [techList, setTechList] = useState([]);
  useEffect(() => {
    async function fetchTechOnField() {
      try {
        const response = await fetch(
          "http://localhost:3001/api/employees/onShift"
        );
        if (!response.ok) {
          throw new Error("Ошибка при выполнении запроса");
        }
        const employees = await response.json();
        setTechList(employees);
      } catch (error) {
        console.log(error);
      }
    }

    fetchTechOnField();
  }, []);
  return (
    <Modal
      title="Выписать заявку"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="post" type="primary" onClick={onPost}>
          Выписать заявку
        </Button>,
        <Button key="cancel" onClick={onCancel}>
          Закрыть
        </Button>,
      ]}
    >
      {selectedEquipment && (
        <div>
          <p>Модель: {selectedEquipment.name}</p>
          <p>Тип: {selectedEquipment.type}</p>
          <p>Расположение: {selectedEquipment.address}</p>
          <p>Статус: {selectedEquipment.tag}</p>
          неисправность :
          <Select
            defaultValue=""
            style={{ width: 250 }}
            options={modalParameters}
            onChange={handleIssueChange}
          />
          <br />
          Выписать на техника:
          <Select
            defaultValue=""
            style={{ width: 250 }}
            options={techList.map((tech) => ({
              value: tech.name, // Используйте соответствующее поле из полученных данных
              label: tech.name, // Используйте соответствующее поле из полученных данных
            }))}
            onChange={handleRequestChange}
          />
        </div>
      )}
    </Modal>
  );
};

export { ModalForDisp };
