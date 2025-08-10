import { HousingForm } from "../../components/Content/HousingForm/HousingForm"
import "./HousingEntryPage.css"


export const housingEntryPageRoute = "/insert"

export function HousingEntryPage() {
    return (
        <div className="HousingEntryPageContainer">
            <HousingForm />
        </div>
    )
}