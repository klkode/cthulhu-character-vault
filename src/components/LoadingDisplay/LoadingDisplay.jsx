import './LoadingDisplay.scss';

function LoadingDisplay({message}) {
    
    return (
        <section className="loading">
            <p className="loading__message">{message}</p>
        </section>
    );
}

export default LoadingDisplay;