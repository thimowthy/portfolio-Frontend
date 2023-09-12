const TabItem = ({ href, className, title }: any) => {
  return (
    <li role="presentation" className="bg-[#DADADA]">
      <a
        href={href}
        className={className}
        data-te-toggle="pill"
        data-te-target={href}
        data-te-nav-active
        role="tab"
        aria-controls={href}
        aria-selected="true"
      >
        {title}
      </a>
    </li>
  );
};

export default TabItem;
