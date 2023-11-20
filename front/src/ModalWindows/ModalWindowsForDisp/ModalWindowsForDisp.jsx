import React from "react";
import { Modal, Button, Select } from "antd";

const ModalForDisp = ({
    visible,
    onCancel,
    onPost,
    selectedEquipment,
    modalParameters,
    handleRequestChange,
  }) => {
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
            Выписать заявку на:
            <Select
              defaultValue=""
              style={{ width: 250 }}
              options={modalParameters}
              onChange={handleRequestChange}
            />
            <br />
            Поломка:
            <Select
              defaultValue=""
              style={{ width: 250 }}
              options={modalParameters}
              onChange={handleRequestChange}
            />
          </div>
        )}
      </Modal>
    );
  };

  export { ModalForDisp };