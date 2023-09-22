// CityDistrictData.js

const Countries = [
    {
      title: "Казахстан",
      value: "Kazakhstan",
      children: [
        {
          title: "Алматы",
          value: "Almaty",
          children: [
            {
              title: "Ауэзовский",
              value: "Auezovskiy",
            },
            {
              title: "Бостандыкский",
              value: "Bostandikskiy",
            },
            {
              title: "Медеусский",
              value: "Medeuskiy",
            },
            {
              title: "Наурызбайский",
              value: "Nauryzbaykskiy",
            },
          ],
        },
        {
          title: "Астана",
          value: "Astana",
          children: [
            // Здесь добавьте районы для Астаны
          ],
        },
        {
          title: "Алматинская область",
          value: "Almaty_obl",
          children: [
            // Здесь добавьте районы для Алматинской области
          ],
        },
      ],
    },
    // Добавьте данные о других странах и городах, если необходимо
  ];
  
  export default Countries;
  