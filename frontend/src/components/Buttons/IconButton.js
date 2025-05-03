import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function IconButton({icon, onClick = () => {}}){
    return (
        <div className='content-center cursor-pointer' onClick={onClick}>
            <FontAwesomeIcon
                icon={icon}
                size='lg'
            />
        </div>
    );
}