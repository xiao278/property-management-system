import { Users } from "../models/Users.model";
import { Housings } from "../models/Housings.model";
import { Addresses } from "../models/Addresses.model";

(async () => {
  await Users.sync();
  await Addresses.sync();
  await Housings.sync();
  console.log("tables synced");
})();