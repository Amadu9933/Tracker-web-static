interface TabSelectorProps {
  selectedTab: string;
  onTabChange: (tab: string) => void;
}

const TabSelector: React.FC<TabSelectorProps> = ({
  selectedTab,
  onTabChange,
}) => {
  return  <div className="text-sm sm:text-base flex flex-col sm:flex-row justify-left gap-4 sm:gap-0 font-inter text-secondary">
    
    <label className="flex pl-2">
      <input
        type="radio"
        value="business"
        checked={selectedTab === "business"}
        onChange={() => onTabChange("business")}
        className={selectedTab === "business" ? "accent-black" : ""}
      />
      <p className="pt-0.5 pl-2 text-sm sm:text-base">Business Owner</p>
    </label>

    <label style={{ marginLeft: "0px" }} className="flex pl-2 sm:ml-5">
      <input
        type="radio"
        value="logistic"
        checked={selectedTab === "logistic"}
        onChange={() => onTabChange("logistic")}
        className="accent-black"
      />
      <p className="pt-0.5 pl-2 text-sm sm:text-base">Logistic Partner</p>
    </label>

  </div>  
};

export default TabSelector;
