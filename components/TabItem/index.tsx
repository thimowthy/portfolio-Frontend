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
  active,
  children,
  liClassName,
  disabled,
}: {
  href: string;
  tooltiptext?: string;
  showTooltip?: boolean;
  className?: string;
  title?: string;
  active?: boolean;
  children?: any;
  liClassName?: string;
  disabled?: boolean;
}) => {
  return (
    <li role="presentation" className={liClassName}>
      <a
        href={`#${href}`}
        className={`${className} ${disabled ? "disabled" : ""}`}
        data-te-toggle="pill"
        data-te-target={`#${href}`}
        data-te-nav-active={active}
        role="tab"
        aria-controls={href}
        aria-selected={active || undefined}
        data-twe-toggle={showTooltip ? "tooltip" : ""}
        title={tooltiptext}
      >
        {title || children}
      </a>
    </li>
  );
};

export default TabItem;
