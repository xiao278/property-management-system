import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from "react";
import { CountryQueryResult } from "../../../../../interface/HousingQuery";
import { deleteCountry, fetchCountries } from "../../../apiCalls/country";
import { InteractiveTable, ItColumns } from "../../../components/Template/DataTable/InteractiveTable/InteractiveTable";
import { deleteCurrency, fetchCurrencies } from "../../../apiCalls/currency";
import { CurrencyQueryResult } from "../../../../../interface/miscQuery/CurrencyQuery";
import "./ManageCategoriesPage.css"

export const manageCategoriesPageExtension = "manage-categories"

export function ManageCategoriesPage() {
    return (
        <div className="ManageCategoriesPageContainer">
            <ManageCategory<CountryQueryResult> fetchCallback={fetchCountries} deleteCallback={deleteCountry} displayName="Countries" />
            <ManageCategory<CurrencyQueryResult> fetchCallback={fetchCurrencies} deleteCallback={deleteCurrency} displayName="Currencies" />
        </div>
    )
}

interface MananageCategoryProps<T> {
    fetchCallback: () => Promise<T[] | null>;
    deleteCallback: (id: number) => Promise<void>;
    displayName: string;
}

function ManageCategory<T extends {id:number, name:string}>(props: MananageCategoryProps<T>) {
    const { fetchCallback, deleteCallback, displayName } = props;
    const [rows, setRows] = useState<T[] | null>(null);
    const [updateTrigger, setUpdateTrigger] = useState(false);
    const reload = () => {setUpdateTrigger(!updateTrigger)};

    useEffect(() => {
        const load = async () => {
            const res = await fetchCallback();
            setRows(res);
        }

        load();
    }, [updateTrigger]);

    const handleDelete = async (id: number) => {
        await deleteCallback(id);
        reload();
    }

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <Typography component="span">{displayName}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <InteractiveTable<T> 
                    columns={{name: {displayName: "Name"}} as Partial<Record<keyof T, ItColumns>>} 
                    detailedFields={{}} 
                    primaryColumn="name" 
                    rows={rows}
                    deleteRow={{
                        callback: handleDelete,
                        field: "id"
                    }}
                />
            </AccordionDetails>
        </Accordion>
    )
}