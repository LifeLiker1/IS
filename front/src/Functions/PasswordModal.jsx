import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Указываем корневой элемент приложения

const PasswordModal = ({ isOpen, onRequestClose, onPasswordSubmit }) => {
  const [password, setPassword] = useState("");

  const handlePasswordSubmit = () => {
    onPasswordSubmit(password);
    setPassword(""); // Очищаем пароль после отправки
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Введите пароль"
    >
      <h2>Введите пароль</h2>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handlePasswordSubmit}>Подтвердить</button>
    </Modal>
  );
};

export default PasswordModal;
