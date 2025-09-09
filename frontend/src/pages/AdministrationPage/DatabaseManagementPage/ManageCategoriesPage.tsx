import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { post } from "../../../api";
import { useEffect, useState } from "react";
import { CategoryResult } from "../../../../../interface/CategoryQuery";
import { CountryQueryResult } from "../../../../../interface/HousingQuery";
import { deleteCountry, fetchCountries } from "../../../apiCalls/country";
import { InteractiveTable } from "../../../components/Template/DataTable/InteractiveTable/InteractiveTable";


export const manageCategoriesPageExtension = "manage-categories"

export function ManageCategoriesPage() {
    const [countries, setCountries] = useState<CountryQueryResult[] | null>(null);
    const [countryUpdateTrigger, setCountryUpdateTrigger] = useState(false);
    const updateCountries = () => {setCountryUpdateTrigger(!countryUpdateTrigger)};

    useEffect(() => {
        const loadCountries = async () => {
            const res = await fetchCountries();
            setCountries(res);
        }

        loadCountries();
    }, [countryUpdateTrigger]);

    const handleDeleteCountry = async (id: number) => {
        await deleteCountry(id);
        updateCountries();
    }

    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Typography component="span">Countries</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <InteractiveTable<CountryQueryResult> 
                        columns={{name: {displayName: "Name"}}} 
                        detailedFields={{}} 
                        primaryColumn="name" 
                        rows={countries}
                        deleteRow={{
                            callback: handleDeleteCountry,
                            field: "id"
                        }}
                    />
                </AccordionDetails>
            </Accordion>
        </div>
    )
}