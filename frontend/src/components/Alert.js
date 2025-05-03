import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faTriangleExclamation, faQuestion, faCheck } from "@fortawesome/free-solid-svg-icons";

export default function Alert({ severity, text }) {
    const alertStyle = {
        padding: '1em',
        border: `1px solid ${severity === 'danger' ? 'red' : severity === 'warning' ? 'orange' : severity === 'info' ? 'blue' : severity === 'success' ? 'green' : 'grey'}`,
        backgroundColor: severity === 'danger' ? '#FBB' : severity === 'warning' ? '#fff3cd' : severity === 'info' ? '#BBF' : severity === 'success' ? '#BFB' : '#F00',
        color: severity === 'danger' ? '#300' : severity === 'warning' ? '#330' : severity === 'info' ? "#333" : severity === 'success' ? '#030' : '#999',
    };

    const iconStyle = {
        icon: severity === 'danger' ? faTriangleExclamation : severity === 'warning' ? faTriangleExclamation : severity === 'info' ? faCircleInfo : severity === 'success' ? faCheck : faQuestion,
        color: severity === 'danger' ? 'text-red-600' : severity === 'warning' ? 'text-orange-500' : severity === 'info' ? 'text-blue-800' : severity === 'success' ? 'text-green-800' : 'text-gray-800',
    }

    return (
        <div style={alertStyle} className="flex flex-row gap-4 items-center rounded-full shadow-[0_0_0.5vh_rgba(0,0,0,0.5)]">
            <FontAwesomeIcon icon={iconStyle.icon} width={25} className={iconStyle.color} />
            <h2>{text}</h2>
        </div>
    );
}