function Robot({ className }: { className?: string }) {
    return (
        <div className={className}>
            <img src="/src/assets/robot.png" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
    );
}


export default Robot