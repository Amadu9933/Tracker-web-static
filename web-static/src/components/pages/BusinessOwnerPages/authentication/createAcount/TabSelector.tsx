



interface TabSelectorProps {
    selectedTab: string;
    onTabChange: (tab: string) => void;
}

const TabSelector: React.FC<TabSelectorProps> = ({ selectedTab, onTabChange }) => {
    return (
        <div>
            <label>
                <input
                    type="radio"
                    value="business "
                    checked={selectedTab === 'business'}
                    onChange={() => onTabChange('business')}
                />
                Business Owner
            </label>

            <label style={{ marginLeft: '20px' }}>
                <input
                    type="radio"
                    value="logistic"
                    checked={selectedTab === 'logistic'}
                    onChange={() => onTabChange('logistic')}
                />
                Logistic Partner
            </label>
        </div>
    );
};

export default TabSelector;
