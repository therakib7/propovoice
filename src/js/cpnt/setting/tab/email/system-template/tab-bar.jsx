function TabBar({ tabs = [], currentTab = "", setCurrentTab = () => {} }) {
  return (
    <ul className="pv-horizontal-tab">
      {tabs.map((tab, index) => (
        <li
          key={index}
          className={"pv-tab " + (tab.id == currentTab ? "pv-active" : "")}
          onClick={(_e) => setCurrentTab(tab.id)}
        >
          {tab.text} {tab.id == "estimate"}
        </li>
      ))}
    </ul>
  );
}
export default TabBar;
