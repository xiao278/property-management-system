import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { createContext, useContext, useEffect, useState } from "react";
import { CountryQueryResult } from "../../../../../interface/HousingQuery";
import { deleteCountry, fetchCountries } from "../../../apiCalls/country";
import { InteractiveTable, ItColumns } from "../../../components/Template/DataTable/InteractiveTable/InteractiveTable";
import { deleteCurrency, fetchCurrencies } from "../../../apiCalls/currency";
import { CurrencyQueryResult } from "../../../../../interface/miscQuery/CurrencyQuery";
import "./ManageCategoriesPage.css"

export const manageCategoriesPageExtension = "manage-categories"

const AccordionExpandContext = createContext< [string | false, (newState: string | false) => void]>([false, () => {}]);

export function ManageCategoriesPage() {
    const state = useState<string | false>(false);

    return (
        <div className="ManageCategoriesPageContainer">
            <AccordionExpandContext value={state}>
                <ManageCategory<CountryQueryResult> fetchCallback={fetchCountries} deleteCallback={deleteCountry} displayName="Countries" />
                <ManageCategory<CurrencyQueryResult> fetchCallback={fetchCurrencies} deleteCallback={deleteCurrency} displayName="Currencies" />
            </AccordionExpandContext>
        </div>
    )
}

interface MananageCategoryProps<T> {
    fetchCallback: () => Promise<T[] | null>;
    deleteCallback: (id: number) => Promise<void>;
    displayName: string;
}

function ManageCategory<T extends {id:number, name:string}>(props: MananageCategoryProps<T>) {
    const [ expanded, setExpanded ] = useContext(AccordionExpandContext);
    const { fetchCallback, deleteCallback, displayName} = props;
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

    const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <Accordion slotProps={{ transition: { unmountOnExit: true } }} expanded={expanded === displayName} onChange={handleChange(displayName)}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${displayName}-content`}
                id={`${displayName}-header`}
            >
                <Typography component="span">{displayName}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{backgroundColor: "black", padding: 0}}>
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