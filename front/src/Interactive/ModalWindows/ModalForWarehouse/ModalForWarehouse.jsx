import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button } from "antd";

const ModalForWarehouse = ({ visible, onCancel, onSave, equipment }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (equipment) {
      form.setFieldsValue(equipment);
    } else {
      form.resetFields();
    }
  }, [equipment, form]);

  const handleSave = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      onSave(values, equipment);
    } catch (error) {
      console.error("Ошибка при сохранении данных", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      title="Редактирование оборудования"
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Отмена
        </Button>,
        <Button
          key="save"
          type="primary"
          loading={loading}
          onClick={handleSave}
        >
          Сохранить
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Название"
          name="name"
          rules={[{ required: true, message: "Введите название" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Описание"
          name="description"
          rules={[{ required: true, message: "Введите описание" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Устанавливается на"
          name="standFor"
          rules={[{ required: true, message: "Устанавливается на" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Количество"
          name="count"
          rules={[{ required: true, message: "Количество" }]}
        >
          <Input />
        </Form.Item>
        {/* Добавьте другие поля формы по аналогии */}
      </Form>
    </Modal>
  );
};

export default ModalForWarehouse;
