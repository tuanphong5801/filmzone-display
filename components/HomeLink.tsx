interface HomeLinkProps {
  isActive: boolean;
}

const HomeLink = ({ isActive }: HomeLinkProps) => {
  return (
    <a
      href="/"
      className={`transition-colors duration-300 ${
        isActive ? "text-white" : "text-gray-400"
      } hover:text-white`}
    >
      Home
    </a>
  );
};

export default HomeLink;
