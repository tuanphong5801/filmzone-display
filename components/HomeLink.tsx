import Link from "next/link";

interface HomeLinkProps {
  isActive: boolean;
}

const HomeLink = ({ isActive }: HomeLinkProps) => {
  return (
    <Link
      href="/"
      className={`transition-colors duration-300 ${
        isActive ? "text-white" : "text-gray-400"
      } hover:text-white`}
    >
      Home
    </Link>
  );
};

export default HomeLink;
