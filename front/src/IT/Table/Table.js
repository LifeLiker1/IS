import React, { useEffect, useState } from "react";
import { Collapse } from "antd";
import "./Table.scss";

const Table = () => {
    const [equipment, setEquipment] = useState([]);
  useEffect(() => {
    async function fetchData() {
      document.title ="Страница IT";
      try {
        const responce = await fetch("http://localhost:3001/api/equipment", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if(!responce.ok){
            throw new Error(`Что то пошло не так: ${responce.error}`)
        }
        const data = responce.json();
        setEquipment(data)
        console.log(equipment)
      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
}, []);
console.log(equipment)

  const items = [
    {
      key: "1",
      label: "Оборудование на парковке",
      children: <p>{equipment.adress}</p>,
    },
    {
      key: "2",
      label: "Оборудование в офисе",
      // children: <p>{text}</p>,
    },
  ];
  return (
    <div>
      <Collapse items={items} />
    </div>
  );
};

export default Table;
