interface TabSelectorProps {
  selectedTab: string;
  onTabChange: (tab: string) => void;
}

const TabSelector: React.FC<TabSelectorProps> = ({
  selectedTab,
  onTabChange,
}) => {
  return (
    <div className="text-sm sm:text-base flex flex-col sm:flex-row justify-left gap-4 sm:gap-0 font-inter text-secondary\">\n      <label className=\"flex pl-2\">\n        <input\n          type=\"radio\"\n          value=\"business\"\n          checked={selectedTab === 'business'}\n          onChange={() => onTabChange('business')}\n          className={selectedTab === 'business' ? 'accent-black' : ''}\n        />\n        <p className=\"pt-0.5 pl-2 text-sm sm:text-base\">Business Owner</p>\n      </label >\n\n < label style = {{ marginLeft: '0px' }
} className =\"flex pl-2 sm:ml-5\">\n        <input\n          type=\"radio\"\n          value=\"logistic\"\n          checked={selectedTab === 'logistic'}\n          onChange={() => onTabChange('logistic')}\n          className=\"accent-black\"\n        />\n        <p className=\"pt-0.5 pl-2 text-sm sm:text-base\">Logistic Partner</p>\n      </label>\n    </div>\n  );
};

export default TabSelector;
