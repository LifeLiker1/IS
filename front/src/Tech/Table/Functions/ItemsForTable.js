const items = [
  {
    key: "1",
    label: "ADEM",
  },
  {
    key: "2",
    label: "Ялян",
  },
  {
    key: "3",
    label: "Алатау",
  },
  {
    key: "4",
    label: "Болашак",
  },
  {
    key: "5",
    label: "Арлан",
  },
  {
    key: "6",
    label: "Казына",
  },
  {
    key: "7",
    label: "Нурлы-Тау",
  },
];

const locationMap = {
  1: "ADEM",
  2: "Ялян",
  3: "Алатау",
  4: "Болашак",
  5: "Арлан",
  6: "Казына",
  7: "Нурлы-Тау",
};

// const columns = [
//     {
//       title: "Модель",
//       dataIndex: "name",
//       key: "name",
//       render: (text) => <a>{text}</a>,
//     },
//     {
//       title: "Тип",
//       dataIndex: "type",
//       key: "type",
//     },
//     {
//       title: "Расположение",
//       dataIndex: "address",
//       key: "address",
//     },
//     {
//       title: "Tags",
//       key: "tag",
//       dataIndex: "tag",
//       render: (tag) => {
//         if (tag) {
//           let color;
//           switch (tag.toLowerCase()) {
//             case "неисправно":
//               color = "error";
//               break;
//             case "заявка":
//               color = "warning";
//               break;
//             case "в работе":
//               color = "success";
//               break;
//             default:
//               color = "geekblue";
//           }
//           return (
//             // <Tag color={color} key={tag}>
//             //   {tag.toUpperCase()}
//             // </Tag>
//           );
//         }
//         return null;
//       },
//     },
// ]
export { items, locationMap };
