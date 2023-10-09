export default function TabList(props: any) {
  /**
   * Renderiza o container da lista de itens do tab.
   * @category Component
   */
  return (
    <ul className={props?.className || ""} role="tablist" data-te-nav-ref>
      {props.children}
    </ul>
  );
}
