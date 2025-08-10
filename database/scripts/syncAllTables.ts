import { Users } from "../models/Users.model";
import { Housings } from "../models/Housings.model";
import { Addresses } from "../models/Addresses.model";
import { Currencies } from "../models/Currencies.model";

(async () => {
  await Users.sync({alter: true});
  await Currencies.sync({alter: true});
  await Addresses.sync({alter: true});
  await Housings.sync({alter: true});
  console.log("tables synced");
})();