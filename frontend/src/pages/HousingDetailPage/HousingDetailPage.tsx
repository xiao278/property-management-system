// this page is used to display the details of a housing unit + update & delete housing unit
// it is a pop-up page that is opened when a housing unit is clicked in the housing list or elsewhere

import { FullPagePopup } from "../../components/Template/FullPagePopup/FullPagePopup";

interface HousingDetailPageProps {
    show: boolean;
    setShow: (show: boolean) => void;
}

export function HousingDetailPage(props: HousingDetailPageProps) {
    const {show, setShow} = props;
    return (
        <FullPagePopup {...props}>
            <div>details go here</div>
        </FullPagePopup>
    )
}