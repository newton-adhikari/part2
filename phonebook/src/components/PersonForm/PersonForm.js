const PersonForm = ({newName, changeHandler, newNumber, nameSubmitHandler}) => {
    return (
        <>
            <h2>Add a new</h2>
            <form>
                <div>
                name: <input 
                type="text"
                name="name"
                value={newName} 
                onChange={changeHandler}
                />
                </div>
                <div>
                number: <input 
                    type="text"
                    name="number"
                    value={newNumber} 
                    onChange={changeHandler}
                />
                </div>
                <div>
                <button 
                type="submit"
                onClick={nameSubmitHandler}
                > add
                </button>
                </div>
            </form>
        </>
    )
}

export default PersonForm;