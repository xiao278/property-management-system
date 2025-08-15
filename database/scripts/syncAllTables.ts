import { Users } from "../models/Users.model";
import { Housings } from "../models/Housings.model";
import { Addresses, Countries } from "../models/Addresses.model";
import { Currencies } from "../models/Currencies.model";
import { ItemCategories, ItemManufacturers, ItemModels } from "../models/ItemModel.model";
import { Rooms } from "../models/Rooms.model";

(async () => {
  await Users.sync({alter: true});

  await ItemCategories.sync({alter: true});
  await ItemManufacturers.sync({alter: true})
  await ItemModels.sync({alter: true});
  
  await Countries.sync({alter: true});
  await Addresses.sync({alter: true});
  await Currencies.sync({alter: true});
  await Housings.sync({alter: true});
  await Rooms.sync({alter: true});

  console.log("tables synced");
})();