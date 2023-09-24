import ItemListaPaciente from "../ItemListaPaciente";

const TabContents = ({
  tabId,
  className,
  active,
  children,
}: {
  tabId: string;
  className?: string;
  active: boolean;
  children?: any;
}) => {
  return (
    <>
      <div
        className={`${className} hidden opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block`}
        id={tabId}
        role="tabpanel"
        aria-labelledby={`${tabId}-tab`}
        data-te-tab-active={active || undefined}
      >
        {children}
      </div>
    </>
  );
};

export default TabContents;
