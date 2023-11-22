import { FaGithub } from "react-icons/fa";
export default function FooterPage() {
  return (
    <div className="flex justify-center items-center h-20 gap-5">
      <p>Made by Cal</p>
      <a
        href="https://github.com/CalyWorld"
        target="_blank"
        className="cursor-pointer"
      >
        <FaGithub size={24} />
      </a>
    </div>
  );
}
