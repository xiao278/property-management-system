import "./AddressDisplay.css";
import { HousingQueryAddress } from "../../../../../interface/HousingQuery";

interface AddressDisplayProps {
    address: HousingQueryAddress;
    unit?: string | null;
}

interface AddressSectionDisplayProps {
    prefix?: string | null;
    locale: string;
    postfix?: string | null;
}

function AddressSectionDisplay(props: AddressSectionDisplayProps) {
    const { prefix, locale, postfix } = props;
    return (
        <div className="AddressSectionDisplayContainer">
            <span className="PrefixSpan">{prefix ? `${prefix} ` : ""}</span>
            {locale}
            <span>{postfix ? ` ${postfix}` : ""}</span>
        </div>
    );

}

export function AddressDisplay(props: AddressDisplayProps) {
    const { address, unit } = props;
    //TODO add a copy paste button
    return (
        <div className="AddressDisplayWrapper">
            <div className="AddressDisplayContainer">
                {address.building_name ? <AddressSectionDisplay prefix={unit} locale={address.building_name} /> : <></>} 
                <AddressSectionDisplay prefix={address.street_number} locale={address.street_name} />
                <AddressSectionDisplay locale={address.city} />
                <AddressSectionDisplay locale={address.state} postfix={address.postal_code} />
                <AddressSectionDisplay locale={address.country} />
            </div>
        </div>
    )
}