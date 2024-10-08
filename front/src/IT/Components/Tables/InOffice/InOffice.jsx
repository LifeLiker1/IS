import React, { useEffect, useState } from "react";
import { Collapse } from "antd";
import { fetchDataInOffice } from "../../../../Functions/InOffice/ApplicationInOffice";
import Header from "../../../../Header/Header";
import AppFooter from "../../../../Footer/AppFooter";
import Loader from "../../../../Interactive/Loader/Loader";

const InOffice = () => {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  document.title = "Страница IT-отдела";

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
                {item.adress}
                <br />
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
      <Header />
      {loading ? (
        <Loader/>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Collapse items={items} />
      )}
      <AppFooter />
    </div>
  );
};

export default InOffice;
