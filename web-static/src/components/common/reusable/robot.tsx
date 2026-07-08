import {robot} from '../../../assets/asset';

function Robot({ className }: { className?: string }) {
    return (
        <div className={className}>
            <img src={robot} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
    );
}


export default Robot