import Widget from "./BaseWidgets/Widget";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFilter } from "@fortawesome/free-solid-svg-icons";
import Input from "./Input";
import IconButton from "./Buttons/IconButton";

export default function SearchBar({query, setQuery}){
    return (
        <Widget>
            <div className='flex px-5 justify-center'>
                <IconButton
                    icon={faSearch}
                />
                <Input
                    className='py-2 px-4 flex-1 text-lg'
                    type='input'
                    placeholder='Search'
                    onChange={(e) => {setQuery(e.target.value)}}
                />
                <IconButton
                    icon={faFilter}
                    onClick={() => {console.log("filter code here")}}  
                />
            </div>
        </Widget>
    );
}