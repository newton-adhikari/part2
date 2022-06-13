const Filter = ({searched, changeHandler}) => {
    return (
        <p>
            filter shown with <input 
                name="searched" 
                type="search" 
                value={searched} 
                onChange={changeHandler} 
            />
            
        </p>

    )
}

export default Filter;