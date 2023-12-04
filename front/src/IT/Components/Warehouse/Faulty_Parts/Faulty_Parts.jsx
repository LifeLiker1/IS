import React, { useEffect, useState } from "react";
import "./Faulty_Parts.scss";
import { columns, getFaultyData } from "./Faulty_Variables";
import { Table } from "antd";

const Faulty_PArts = () => {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFaultyData();
      setDataSource(data);
    };

    fetchData();
  }, []);
  return (
    <div>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default Faulty_PArts;
