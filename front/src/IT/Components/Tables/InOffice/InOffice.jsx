import React, { useEffect, useState } from 'react'
import { Collapse, Spin } from "antd";
import { fetchDataInOffice } from "../../../../Tech/Table/Functions/Responses";

const InOffice = () => {
    const [equipment, setEquipment] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetchDataInOffice()
        .then((data) => {
          setEquipment(data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setError("Произошла ошибка");
          setLoading(false);
        });
    }, []);
  
    const items = [
      {
        key: "1",
        label: "Оборудование на парковке",
        children: (
          <div>
            {Array.isArray(equipment) && equipment.length > 0 ? (
              equipment.map((item) => (
                <p key={item.id}>
                  {item.adress}<br/>
                  {item.model} {item.type}
                </p>
              ))
            ) : (
              <p>Нет доступных данных</p>
            )}
          </div>
        ),
      },
      {
        key: "2",
        label: "Оборудование в офисе",
        // children: <p>{text}</p>,
      },
    ];
  
    return (
      <div>
        {loading ? (
          <Spin size="large" />
        ) : error ? (
          <div>{error}</div>
        ) : (
          <Collapse items={items} />
        )}
      </div>
    );
  };

export default InOffice