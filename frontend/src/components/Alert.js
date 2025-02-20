import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faTriangleExclamation, faQuestion } from "@fortawesome/free-solid-svg-icons";

export default function Alert({ severity, text }) {
    const alertStyle = {
        padding: '1em',
        border: `1px solid ${severity === 'danger' ? 'red' : severity === 'warning' ? 'orange' : severity === 'info' ? 'blue' : 'grey'}`,
        backgroundColor: severity === 'danger' ? '#f8d7da' : severity === 'warning' ? '#fff3cd' : severity === 'info' ? '#BBC' : 'black',
        color: severity === 'danger' ? '#721c24' : severity === 'warning' ? '#856404' : severity === 'info' ? '#223' : '#383d41',
    };

    const iconStyle = {
        icon: severity === 'danger' ? faTriangleExclamation : severity === 'warning' ? faTriangleExclamation : severity === 'info' ? faCircleInfo : faQuestion,
        color: severity === 'danger' ? 'text-red-600' : severity === 'warning' ? 'text-orange-500' : 'text-blue-900',
    }

    return (
        <div style={alertStyle} className="flex flex-row gap-4 items-center rounded-full shadow-[0_0_0.5vh_rgba(0,0,0,0.5)]">
            <FontAwesomeIcon icon={iconStyle.icon} width={25} className={iconStyle.color} />
            <h2>{text}</h2>
        </div>
    );
}