import React, { useState, useEffect } from "react";
import Loader from "../../Interactive/Loader/Loader";

//отслеживание сотрудников на смене
const OnShift = () => {
  const [useData, setUseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function employeesOnShift() {
      try {
        const response = await fetch(
          "http://localhost:3001/api/employees/onShift"
        );
        if (response.ok) {
          const data = await response.json();
          setUseData(data);
          console.log(data);
          setLoading(false);
        } else {
          setError("Ошибка при получении данных");
          setLoading(false);
        }
      } catch (error) {
        setError("Произошла ошибка");
        setLoading(false);
      }
    }

    employeesOnShift();
  }, []);

  const names =
    useData && useData.length > 0 ? (
      useData.map((item) => (
        <div key={item.id}>
          <b>
            {item.surname} {item.name}
          </b>{" "}
          дежурит на рынке <b>{item.market}</b>
        </div>
      ))
    ) : (
      <b>Пока все отдыхают</b>
    );

  return (
    <div>
      {loading ? (
        <Loader/>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>{names}</div>
      )}
    </div>
  );
};

export default OnShift;
