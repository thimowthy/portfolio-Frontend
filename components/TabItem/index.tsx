interface TabItemProps {
  href: string;
  tooltiptext?: string;
  showTooltip?: boolean;
  className?: string;
  title?: string;
  selected: boolean;
  children?: React.ReactNode;
  liClassName?: string;
  disabled?: boolean;
  ref?: any;
  onSelect?: (selectedTitle: string | React.ReactNode) => void;
}

/**
 * Renderiza um item de uma tablist. (renderiza apenas um item e deve estar dentro de um {@link: TabList})
 * @category Component
 */

const TabItem = ({
  href,
  tooltiptext,
  showTooltip,
  className,
  title,
  selected: selected,
  children,
  liClassName,
  disabled = false,
  onSelect,
  ref,
}: TabItemProps) => {
  const handleClick = (e: React.MouseEvent) => {
    if (!disabled) {
      e.preventDefault(); // Evita o redirecionamento automático
      if (onSelect && typeof onSelect === "function") {
        onSelect(href || children);
      }
    }
  };

  return (
    <li role="presentation" className={liClassName}>
      <a
        href={`#${href}`}
        className={`${className} ${disabled ? "disabled" : ""} ${
          selected ? "data-[te-nav-active]:bg-[#EAEAEA]" : ""
        } `}
        data-te-toggle="pill"
        data-te-target={`#${href}`}
        data-te-nav-active={selected}
        role="tab"
        ref={ref}
        aria-controls={href}
        data-twe-toggle={showTooltip ? "tooltip" : ""}
        title={tooltiptext}
        aria-selected={selected || undefined}
        onClick={handleClick}
      >
        {title || children}
      </a>
    </li>
  );
};

export default TabItem;
