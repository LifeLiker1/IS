import React, { useEffect, useState } from "react";
import "./Working_Parts.scss";
import { Table } from "antd";
import { columns, dataSource, getWorkingData } from "./Working_Variables";
import Loader from "../../../../Interactive/Loader/Loader";

const Working_Parts = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const data = await getWorkingData();
      setDataSource(data);
    };
    try {
      setLoading(true);
      fetchData();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <Table columns={columns} dataSource={dataSource} />
      )}
    </div>
  );
};

export default Working_Parts;
