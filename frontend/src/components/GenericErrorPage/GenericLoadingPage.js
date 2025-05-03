import GenericErrorPage from "./GenericErrorPage";
import LoadingIcon from "./LoadingIcon";

export default function GenericLoadingPage() {
    return (
        <GenericErrorPage>
            <LoadingIcon />
        </GenericErrorPage>
    );
}