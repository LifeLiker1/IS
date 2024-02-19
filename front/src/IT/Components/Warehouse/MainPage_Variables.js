import React from "react";
import FaultyParts from "./Faulty_Parts/Faulty_Parts.jsx"
import Working_Parts from "./Working_Parts/Working_Parts.jsx";

  const items = [
    {
      key: '1',
      label: 'Рабочие Запчасти',
      children: <Working_Parts/>,
    },
    {
      key: '2',
      label: 'Неисправные Запчасти',
      children: <FaultyParts/>,
    },

  ];
  


export { items}