interface TabSelectorProps {
  selectedTab: string;
  onTabChange: (tab: string) => void;
}

const TabSelector: React.FC<TabSelectorProps> = ({
  selectedTab,
  onTabChange,
}) => {
  return (
    <div className="text-base  flex justify-left  font-inter text-secondary">

      <label className="flex pl-2 ">
        <input
          type="radio"
          value="business "
          checked={selectedTab === 'business'}
          onChange={() => onTabChange('business')}
          className={selectedTab === 'business' ? 'accent-black' : ''}

        />
        <p className="pt-0.5 pl-2">Business Owner</p>
      </label>

      <label style={{ marginLeft: '20px' }} className="flex pl-2 ">
        <input
          type="radio"
          value="logistic"
          checked={selectedTab === 'logistic'}
          onChange={() => onTabChange('logistic')}
          className="accent-black"
        />
        <p className="pt-0.5 pl-2">Logistic Partner</p>
      </label>
    </div>
  );
};

export default TabSelector;
