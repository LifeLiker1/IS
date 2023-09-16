
export async function fetchEmployees() {
  try {
    const response = await fetch('URL_ВАШЕГО_СЕРВЕРА/api/employees'); // Замените на реальный URL вашего сервера
    if (!response.ok) {
      throw new Error('Ошибка при получении данных');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    throw error;
  }
}
