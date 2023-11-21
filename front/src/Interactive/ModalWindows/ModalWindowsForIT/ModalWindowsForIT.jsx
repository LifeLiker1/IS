import React from "react";
import { Modal, Button, Select } from "antd";

const ModalForIT = ({
  visible,
  onCancel,
  onPost,
  selectedEquipment,
  modalParameters,
  handleRequestChange,
}) => {
  return (
    <Modal
      title="Изменить данные оборудования"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="post" type="primary" onClick={onPost}>
          Принять изменения
        </Button>,
        <Button key="cancel" onClick={onCancel}>
          Закрыть
        </Button>,
      ]}
    >
      {selectedEquipment && (
        <div>
          <p>Модqwefqwefq3ель: {selectedEquipment.name}</p>
          <p>Тиhqergqergп: {selectedEquipment.type}</p>
          <p>Распqergerоложение: {selectedEquipment.address}</p>
          <p>Стberbwerbwerbwerbатус: {selectedEquipment.tag}</p>
          Выписать зqerbqerbаяqererbqerbbqвку на:
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



export {  ModalForIT };
