import './ServerErrorDisplay.scss';

function ServerErrorDisplay({message}) {
    
    return (
        <section className="server-error-display">
            <h3 className="server-error-display__heading">Server Error</h3>
            <p className="server-error-display__message">{message}</p>
        </section>
    );
}

export default ServerErrorDisplay;