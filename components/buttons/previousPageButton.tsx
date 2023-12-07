import Link from "next/link";
import BackIcon from "./backIcon";

const PreviousPageButton = ({
  href,
  title,
  className,
}: {
  href: string;
  title: string;
  className?: string;
}) => {
  return (
    <Link href={href} className={`flex items-center ${className}`}>
      <BackIcon width={30} height={30} color="#333" />
      <h1>{title}</h1>
    </Link>
  );
};

export default PreviousPageButton;
