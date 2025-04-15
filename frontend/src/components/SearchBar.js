import Widget from "./BaseWidgets/Widget";
import { faSearch, faFilter } from "@fortawesome/free-solid-svg-icons";
import Input from "./Input";
import IconButton from "./Buttons/IconButton";

export default function SearchBar({query, setQuery, onFilterClick}){
    return (
        <Widget>
            <div className='flex px-5 justify-center'>
                <IconButton
                    icon={faSearch}
                />
                <Input
                    className='py-2 px-4 flex-1 text-lg active:*:outline-none focus:outline-none'
                    type='input'
                    placeholder='Search'
                    onChange={(e) => {setQuery(e.target.value)}}
                />
                {onFilterClick &&
                    <IconButton
                        icon={faFilter}
                        onClick={onFilterClick}  
                    />
                }
            </div>
        </Widget>
    );
}