// this page is used to display the details of a housing unit + update & delete housing unit
// it is a pop-up page that is opened when a housing unit is clicked in the housing list or elsewhere

import { Accordion, AccordionDetails, AccordionSummary, Paper, SxProps } from "@mui/material";
import { FullPagePopup } from "../../components/Template/FullPagePopup/FullPagePopup";
import "./HousingDetailPage.css";
import { HousingInfo, SearchHousingQueryResultFormatted } from "../../../../interface/Query";
import { AddressDisplay } from "../../components/Content/AddressDisplay/AddressDisplay";
import { SmallCard } from "../../components/Template/SmallCard/SmallCard";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { JSX } from "react";
import { HousingForm } from "../../components/Content/HousingForm/HousingForm";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { post } from "../../api";

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

function MyAccordion(props: { children: JSX.Element | JSX.Element[], sx?:SxProps | undefined }) {
    const { children, sx } = props;
    const style: SxProps = {backgroundColor: "rgb(244, 244, 244)"}
    return (<Accordion sx={{...style, ...sx}} elevation={2} disableGutters>{children}</Accordion>) 
}

export function HousingDetailPage(props: HousingDetailPageProps) {
    const { housingData } = props;

    const methods = useForm<HousingInfo>();
    const onFormSubmit: SubmitHandler<HousingInfo> = async (data) => {
        // const res = await post("/api/housing/create", data);
        // if (res.ok) {
        //     alert("Housing Added Successfully");
        // }
        // else {
        //     const error = await res.json()
        //     alert(`Error: ${error.message}`)
        // }
        console.log(data);
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
                            <AddressDisplay address={housingData.address} unit={housingData.unit} />
                        </MyAccordion>
                        <MyAccordion>
                            <MyAccordionSummary>
                                <h3>Manage Unit Information</h3>
                            </MyAccordionSummary>
                            <MyAccordionDetails>
                                <FormProvider {...methods}>
                                    <HousingForm onFormSubmit={onFormSubmit}/>
                                </FormProvider>
                            </MyAccordionDetails>
                        </MyAccordion>
                        <MyAccordion>
                            <MyAccordionSummary>
                                <h3>Status</h3>
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
                                <h3>Details</h3>
                            </MyAccordionSummary>
                            <MyAccordionDetails>
                                <p>content</p>
                            </MyAccordionDetails>
                        </MyAccordion>
                        
                    </Paper>
                </div>
            </div>
        </FullPagePopup>
    )
}