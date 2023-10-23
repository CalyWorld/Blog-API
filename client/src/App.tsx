import Nav from "./component/pages/navPage";
import SignInForm from "./component/form/signInForm";
import { useState } from "react";
function App() {
  const [openModal, setModal] = useState<boolean>(false);
  return (
    <>
      <div className={`app-container ${openModal ? "blur-lg" : ""}`}>
        <Nav openModal={openModal} setModal={setModal} />
      </div>
      {openModal && <SignInForm />}
    </>
  );
}

export default App;
