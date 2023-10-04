export async function AddEmployee(employeeData) {
  try {
    const formData = new FormData();
    Object.keys(employeeData).forEach((key) => {
      formData.append(key, employeeData[key]);
    });

    const response = await fetch("http://localhost:3001/api/employees", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      console.log("Сотрудник успешно добавлен");
    } else {
      console.error("Ошибка при добавлении сотрудника");
    }
  } catch (error) {
    console.error(error);
  }
}
