import { Users } from "../models/Users.model";
import { Housings, HousingTypes } from "../models/Housings.model";
import { Addresses, Countries } from "../models/Addresses.model";
import { Currencies } from "../models/Currencies.model";
import { ItemCategories, ItemManufacturers, ItemModels } from "../models/ItemModel.model";
import { Rooms } from "../models/Rooms.model";
import { Renovations } from "../models/Renovations.model";
import { PeriodTypes, RentalContracts, Tenants } from "../models/RentalContract.model";

async function syncUsers() {
  await Users.sync({alter: true});
};

async function syncItemModels() {
  await ItemCategories.sync({alter: true});
  await ItemManufacturers.sync({alter: true})
  await ItemModels.sync({alter: true});
}

async function syncCountries() {
  await Countries.sync({alter: true});
}

async function syncAddresses() {
  await syncCountries();
  await Addresses.sync({alter: true});
}

async function syncCurrencies() {
  await Currencies.sync({alter: true});
}

async function syncHousings() {
  await syncCurrencies();
  await syncAddresses();
  await HousingTypes.sync({alter: true});
  await Housings.sync({alter: true});
}

async function syncHousingExtras() {
  await syncHousings();
  await Renovations.sync({alter: true});
  await Rooms.sync({alter: true});
  await PeriodTypes.sync({alter: true});
  await Tenants.sync({alter: true});
  await RentalContracts.sync({alter: true});
}

(async () => {
  await syncUsers();
  await syncHousingExtras();
  await syncItemModels();
  console.log("tables synced");
})();