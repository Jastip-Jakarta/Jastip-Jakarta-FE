export type tabType = "wait" | "process";

interface TabProps {
  setTab: (keyword: tabType) => void;
  tab: tabType;
}
const Tab = ({ setTab, tab }: TabProps) => {
  return (
    <div
      className={`relative flex items-center mx-auto max-w-sm bg-slate-100 rounded-md overflow-hidden p-1 font-semibold text-sm `}
    >
      <div
        className={`w-full text-center py-1 cursor-pointer rounded-md ${
          tab === "wait" ? "bg-white" : "bg-transparent text-black/50"
        }`}
        onClick={() => setTab("wait")}
      >
        Menunggu
      </div>
      <div
        className={`w-full text-center py-1 cursor-pointer rounded-md ${
          tab === "process" ? "bg-white" : "bg-transparent text-black/50"
        }`}
        onClick={() => setTab("process")}
      >
        Diproses
      </div>
    </div>
  );
};

export default Tab;
