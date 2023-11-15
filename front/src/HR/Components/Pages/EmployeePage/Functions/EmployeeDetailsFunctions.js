// EmployeeDetailsFunctions.js
import { notification } from "antd";

export async function fetchData(employeeId, setEmployee) {
  try {
    document.title = "Личное дело сотрудника";
    const response = await fetch(
      `http://localhost:3001/api/employees/${employeeId}`
    );

    if (!response.ok) {
      throw new Error("Ошибка при получении данных");
    }

    const data = await response.json();
    setEmployee(data);
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
}

export async function fireEmployee(employeeId, history) {
  try {
    const response = await fetch(
      `http://localhost:3001/api/employees/${employeeId}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      notification.open({
        message: "Сотрудник уволен",
        duration: 3,
      });
    } else {
      notification.open({
        message: "Ошибка при увольнении сотрудника",
        duration: 3,
      });
    }

    history("/employees");
  } catch (error) {
    console.error("Ошибка при удалении сотрудника:", error);
  }
}

export async function updateEmployeeData(employeeId, values, setIsEditing) {
  try {
    const response = await fetch(
      `http://localhost:3001/api/employees/${employeeId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );

    if (response.ok) {
      notification.success({
        message: "Данные успешно обновлены",
        duration: 3,
      });
      setIsEditing(false);
    } else {
      throw new Error("Ошибка при обновлении данных");
    }
  } catch (error) {
    console.error(error);
    notification.error({
      message: "Ошибка при обновлении данных",
      duration: 3,
    });
  }
}
