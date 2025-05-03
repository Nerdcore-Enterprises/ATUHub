export default function InfoUnorderedList({title, data, className = ""}){
    return (
        <>
            <p className="text-3xl font-semibold mb-3">{title}</p>
            <ul>
                {
                    data.map((value, index) => (
                        <li key={index} className={className}>&bull; {value}</li>
                    ))
                }
            </ul>
        </>
    );
}