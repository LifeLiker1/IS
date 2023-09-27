export async function AddEmployee(
  name,
  surname,
  sex,
  city,
  district,
  street,
  mobilePhone,
  departament,
  position,
  about,
  hobbies,
  image
) {
  try {
    const data = await fetch("http://localhost:3001/api/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        surname: surname,
        sex: sex,
        adress: {
          city: city,
          district: district,
          street: street,
        },
        mobilePhone: mobilePhone,
        departament: departament,
        position: position,
        about: about,
        hobbies: hobbies,
      }),
    });

    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
