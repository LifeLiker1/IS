export async function AddEmployee(
  name,
  surname,
  sex,
  adress,
  mobilePhone,
  departament
  // images
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
        adress: adress,
        mobilePhone: mobilePhone,
        departament: departament,
      }),
    });

    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
