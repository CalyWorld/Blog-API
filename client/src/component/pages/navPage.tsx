interface NavProps {
  openModal: boolean;
  setModal: (value: boolean) => void;
}

function Nav({ setModal }: NavProps) {
  return (
    <header className="flex p-10 justify-between">
      <h1>Member</h1>
      <ul className="flex gap-5 items-center">
        <li>
          <button onClick={() => setModal(true)}>Sign In</button>
        </li>
        <li>
          <button>Get Started</button>
        </li>
      </ul>
    </header>
  );
}

export default Nav;
