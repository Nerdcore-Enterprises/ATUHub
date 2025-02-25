import GenericPage from "../genericPage"

export default function GenericErrorPage({children}){
    return (
        <GenericPage>
            <div className="text-center text-3xl font-semibold mt-10 text-gray-500">
                {children}
            </div>
        </GenericPage>
    )
}