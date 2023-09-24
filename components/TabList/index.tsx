export default function TabList(props: any) {
  return (
    <ul className={props?.className || ""} role="tablist" data-te-nav-ref>
      {props.children}
    </ul>
  );
}
