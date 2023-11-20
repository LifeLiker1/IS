import React, { useState, useEffect } from "react";
import { Spin } from 'antd';


//отслеживание сотрудников на смене
const OnShift = () => {
  const [useData, setUseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function employeesOnShift() {
      try {
        const response = await fetch("http://localhost:3001/api/employees/onShift");
        if (response.ok) {
          const data = await response.json();
          setUseData(data);
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

  const names = useData ? useData.map(item => (
    <div>
      {item.surname} {item.name} 
    </div>
  )) : [];

  return (
    <div>
      {loading ? (
        <Spin size="large" />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>{names}</div>
      )}
    </div>
  );
};

export default OnShift;
