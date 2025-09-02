// this page is used to display the details of a housing unit + update & delete housing unit
// it is a pop-up page that is opened when a housing unit is clicked in the housing list or elsewhere

import { Accordion, AccordionDetails, AccordionProps, AccordionSummary, Button, Paper, SxProps } from "@mui/material";
import { FullPagePopup } from "../../components/Template/FullPagePopup/FullPagePopup";
import "./HousingDetailPage.css";
import { HousingInfo, HousingSearchFilters, HousingSearchResult, HousingUnitInfo, SearchHousingQueryResultFormatted } from "../../../../interface/HousingQuery";
import { AddressDisplay } from "../../components/Content/AddressDisplay/AddressDisplay";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { JSX, useState } from "react";
import { HousingForm } from "../../components/Content/HousingForm/HousingForm";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { post } from "../../api";
import { AuthOrHide } from "../../components/Auth/AuthOrHide";
import { RoomPage } from "./subpages/RoomPage/RoomPage";
import { RenovationPage } from "./subpages/RenovationPage/RenovationPage";

interface HousingDetailPageProps {
    show: boolean;
    setShow: (show: boolean) => void;
    housingData: SearchHousingQueryResultFormatted;
}

function MyAccordionSummary(props: { children: JSX.Element | JSX.Element[] }) {
    const { children } = props;
    return (<AccordionSummary expandIcon={<ExpandMoreIcon />}>{children}</AccordionSummary>) 
}

function MyAccordionDetails(props: { children: JSX.Element | JSX.Element[] }) {
    const { children } = props;
    return (<AccordionDetails>{children}</AccordionDetails>) 
}

function MyAccordion(props: AccordionProps) {
    const { children } = props;
    const style: SxProps = {backgroundColor: "rgb(244, 246, 244)", borderColor: "rgb(160,195,160)", borderWidth: "1px", borderStyle: "solid"}
    const newSx = {...style, ...props.sx};
    const newElevation = props.elevation ?? 2;
    return (<Accordion {...props} sx={newSx} elevation={newElevation} disableGutters>{children}</Accordion>) 
}

export function HousingDetailPage(props: HousingDetailPageProps) {
    const { housingData } = props;
    const [ newHousingData, setNewHousingData ] = useState(housingData);
    const methods = useForm<HousingInfo>();
    const onFormSubmit: SubmitHandler<HousingInfo> = async (data) => {
        const res = await post("/api/housing/update", data);
        if (res.ok) {
            alert("Housing Updated Successfully");
            await fetchUpdatedHousingData();
        }
        else {
            const error = await res.json()
            alert(`Failed to update: ${error.message}`)
        }
    }

    const fetchUpdatedHousingData = async () => {
        const searchFilters:HousingSearchFilters = {property_id: housingData.id};
        const res = await post("/api/housing/search", searchFilters);
        if (res.ok) {
            const data = await res.json() as HousingSearchResult;
            setNewHousingData(data.housingList[0]);
        }
        else {
            const error = await res.json()
            alert(`Failed to fetch: ${error.message}`)
        }
    }

    const handleHousingDelete = async () => {
        const searchFilters:HousingSearchFilters = {property_id: housingData.id};
        const res = await post("/api/housing/delete", searchFilters);
        if (res.ok) {
            alert("Housing Deleted Successfully")
        }
        else {
            const error = await res.json()
            alert(`Failed to delete: ${error.message}`)
        }
    }


    return (
        <FullPagePopup {...props}>
            <div className="HousingDetailPageWrapper">
                <div className="HousingDetailPageContainer">
                    <Paper elevation={15} sx={{
                        padding: "20px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        justifyContent: "flex-start",
                        alignItems: "stretch",
                        marginTop: "64px",
                        marginBottom: "64px",
                        backgroundColor: "rgba(250, 255, 245, 1)",
                    }}>
                        <MyAccordion sx={{padding: "20px"}}>
                            <AddressDisplay address={newHousingData.address} unit={newHousingData.unit} />
                        </MyAccordion>

                        <MyAccordion>
                            <MyAccordionSummary>
                                <h3>Details</h3>
                            </MyAccordionSummary>
                            <MyAccordionDetails>
                                <p>content</p>
                            </MyAccordionDetails>
                        </MyAccordion>

                        <MyAccordion>
                            <MyAccordionSummary>
                                <h3>Details</h3>
                            </MyAccordionSummary>
                            <MyAccordionDetails>
                                <p>content</p>
                            </MyAccordionDetails>
                        </MyAccordion>

                        <MyAccordion>
                            <MyAccordionSummary>
                                <h3>Inventory</h3>
                            </MyAccordionSummary>
                            <MyAccordionDetails>
                                <p>Inventory page here</p>
                            </MyAccordionDetails>
                        </MyAccordion>

                        <MyAccordion slotProps={{ transition: { unmountOnExit: false } }}>
                            <MyAccordionSummary>
                                <h3>Renovations</h3>
                            </MyAccordionSummary>
                            <MyAccordionDetails>
                                <RenovationPage housingData={housingData}/>
                            </MyAccordionDetails>
                        </MyAccordion>

                        <MyAccordion slotProps={{ transition: { unmountOnExit: false } }}>
                            <MyAccordionSummary>
                                <h3>Rooms</h3>
                            </MyAccordionSummary>
                            <MyAccordionDetails>
                                <RoomPage housingData={housingData} />
                            </MyAccordionDetails>
                        </MyAccordion>

                        <AuthOrHide adminOnly={true}>
                            <MyAccordion>
                                <MyAccordionSummary>
                                    <h3>Manage Unit Information</h3>
                                </MyAccordionSummary>
                                <MyAccordionDetails>
                                    <FormProvider {...methods}>
                                        <Button sx={{
                                            margin: "10px",
                                            color: "red"
                                        }} onClick={() => handleHousingDelete()}> Delete </Button>
                                        <HousingForm onFormSubmit={onFormSubmit} prefillData={{housing: newHousingData as HousingUnitInfo, address: newHousingData.address} as HousingInfo}/>
                                    </FormProvider>
                                </MyAccordionDetails>
                            </MyAccordion>
                        </AuthOrHide>
                    </Paper>
                </div>
            </div>
        </FullPagePopup>
    )
}