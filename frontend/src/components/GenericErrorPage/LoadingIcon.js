import "./spinner.css"

export default function LoadingIcon() {
    return (
        <div className="flex items-center justify-center">
            <div id="loader" className="flex w-32 h-32">
                <span id="pip-0" />
                <span id="pip-1" />
                <span id="pip-2" />
                <span id="pip-3" />
                <span id="pip-4" />
                <span id="pip-5" />
            </div>
        </div>
    );
}