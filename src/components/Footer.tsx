const Footer = () => {
  return (
    <footer className="flex h-16 max-w-[90rem] px-4">
      <ul className="flex w-[100%] items-end justify-center gap-10 pb-2.5 text-primary">
        <li>
          <a href="" className="text-sm text-primary md:hover:underline">
            Terms
          </a>
        </li>
        <li>
          <a href="" className="text-sm text-primary md:hover:underline">
            About
          </a>
        </li>
        <li>
          <a href="" className="text-sm text-primary md:hover:underline">
            Contact
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
