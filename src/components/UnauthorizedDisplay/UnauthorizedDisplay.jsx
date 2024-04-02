import './UnauthorizedDisplay.scss';

function UnauthorizedDisplay({message}) {
    
    return (
        <section className="unauthorized">
            <p className="unauthorized__message">{message}</p>
        </section>
    );
}

export default UnauthorizedDisplay;