import { Form, TreeSelect } from "antd";

const SearchField = ({ setSelectedDepartment }) => (// передали setSelectedDepartament через props
  <Form.Item label="Мне нужны сотрудники" className="dep_sel">
    <TreeSelect
      onChange={(value) => setSelectedDepartment(value)}
      treeData={[
        { title: "Все", value: 0 },
        { title: "IT", value: "IT отдел" },
        {
          title: "Технического отдела",
          value: "Технический отдел",
        },
        {
          title: "Диспетчерского отдела",
          value: "Диспетчерский отдел",
        },
      ]}
    />
  </Form.Item>
);

export { SearchField };
