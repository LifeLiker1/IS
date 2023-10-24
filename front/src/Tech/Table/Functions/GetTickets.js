async function getTickets() {
    try {
      const response = await fetch('http://localhost:3001/api/tickets');
      if (!response.ok) {
        throw new Error('Ошибка при получении билетов');
      }
      const tickets = await response.json();
      return tickets;
    } catch (error) {
      console.error(error);
      return null; 
    }
  }
  
  getTickets().then((tickets) => {
    if (tickets) {
      console.log(tickets);
    }
  });

export { getTickets };