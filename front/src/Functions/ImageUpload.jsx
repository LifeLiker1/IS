import React, { useState } from 'react';

function ImageUpload({ onImageUpload }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleUpload = () => {
    if (selectedImage) {
      onImageUpload(selectedImage);
    }
  };

  return (
    <div>
      <h2>Загрузить изображение</h2>
      <input
        type="file"
        accept=".jpg, .jpeg, .png"
        onChange={handleImageChange}
      />
      <button onClick={handleUpload}>Загрузить</button>
    </div>
  );
}

export default ImageUpload;
