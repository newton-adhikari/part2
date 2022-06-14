const Notification = ({message, error}) => {
    if(message === null) return null;
    let style = error ? "error" : "success";
    return (
        <div className={style}>
            {message}
        </div>
    )
}

export default Notification;