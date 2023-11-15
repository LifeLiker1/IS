import onField from "../../../Images/OnField.jpeg";
import inOffice from "../../../Images/InOffice.jpeg";
import Warehouse from "../../../Images/warehouse.jpeg";
const cardForField = {
  background: `url(${onField})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  color: "white",
  minWidth: 250,
};
const cardForOffice = {
  background: `url(${inOffice})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  color: "white",
  minWidth: 250,
};
const cardForWarehouse = {
  background: `url(${Warehouse})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  color: "white",
  minWidth: 250,
};

export { cardForField, cardForWarehouse, cardForOffice };
