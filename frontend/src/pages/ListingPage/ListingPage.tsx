import { HousingList } from "./HousingList";
import { ListingForm } from "./ListingForm";
import "./ListingPage.css";

export const listingPageRoute = "/listing";

export function ListingPage() {
    return (
        <div className="ListingPageContainer">
            <div className="Filter">
                <ListingForm />
            </div>
            <HousingList />
        </div>
    );
}