const InfoAlert = (props: { note: string }) => {
    return (<div className="alert alert-info" role="alert">{props.note}</div>);
};
export default InfoAlert