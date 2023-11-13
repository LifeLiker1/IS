import onField from "../../../Images/OnField.jpeg";
import inOffice from "../../../Images/InOffice.jpeg";
import Warehouse from "../../../Images/warehouse.jpeg";
const cardForField = {
  background: `url(${onField})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  color: "white",
};
const cardForOffice = {
  background: `url(${inOffice})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  color: "white",
};
const cardForWarehouse = {
  background: `url(${Warehouse})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  color: "white",
};

export { cardForField, cardForWarehouse, cardForOffice };
