/**
 * Renderiza um item de uma tablist. (renderiza apenas um item e deve estar dentro de um {@link: TabList})
 * @category Component
 */
const TabItem = ({
  href,
  className,
  title,
  active,
  children,
  liClassName,
  disabled = false,
  onSelect,
}: {
  href: string;
  className?: string;
  title?: string;
  active: boolean;
  children?: React.ReactNode;
  liClassName?: string;
  disabled?: boolean;
  onSelect?: (selectedTitle: string | React.ReactNode) => void;
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (!disabled) {
      e.preventDefault(); // Evita o redirecionamento automático
      if (onSelect && typeof onSelect === "function") {
        console.log("Active tab: ", title);
        onSelect(href || children);
      }
    }
  };

  return (
    <li role="presentation" className={liClassName}>
      <a
        href={`#${href}`}
        className={`${className} ${
          disabled && active
            ? "disabled data-[te-nav-active]:bg-[#EAEAEA]"
            : disabled
            ? "disabled"
            : active
            ? "active data-[te-nav-active]:bg-[#EAEAEA]"
            : ""
        } `}
        data-te-toggle="pill"
        data-te-target={`#${href}`}
        data-te-nav-active={active}
        role="tab"
        aria-controls={href}
        aria-selected={active || undefined}
        onClick={handleClick}
      >
        {title || children}
      </a>
    </li>
  );
};

export default TabItem;
