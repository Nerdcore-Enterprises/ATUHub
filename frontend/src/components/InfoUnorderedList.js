export default function InfoUnorderedList({title, data}){
    return (
        <>
            <p className="text-3xl font-semibold mb-3">{title}</p>
            <ul>
                {
                    data.map((value, index) => (
                        <li key={index}>&bull; {value}</li>
                    ))
                }
            </ul>
        </>
    );
}