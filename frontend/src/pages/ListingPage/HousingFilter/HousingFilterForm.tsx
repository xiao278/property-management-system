import { SmallCard } from "../../../components/Template/SmallCard/SmallCard";
import "./HousingFilterForm.css";

export function HousingFilterForm() {
    return (
        <div className="HousingFilterFormContainer">
            <SmallCard title="Housing Type Filters">
                <div>Form content</div>
            </SmallCard>
            <SmallCard title="Location Filters">
                <div>Form content</div>
            </SmallCard>
            <SmallCard title="Miscellaneous Filters">
                <div>Form content</div>
            </SmallCard>
            <SmallCard title="Sorting Options">
                <div>Form content</div>
            </SmallCard>
        </div>
    );
}