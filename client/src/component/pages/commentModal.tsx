import { useContext, useState } from "react";
import { IoMdClose } from "react-icons/io";
import CreateCommentModal from "./createCommentModal";
import { UserContext, UserContextType } from "../../context/userContext";
import CommentPage from "./commentPage";
export interface CommentModalType {
  setCommentModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function CommentModal({ setCommentModal }: CommentModalType) {
  const [createCommentModal, setCreateCommentModal] = useState<boolean>(false);
  const { user } = useContext<UserContextType>(UserContext);
  return (
    <div className="comment-modal flex flex-col gap-5 fixed right-0 top-0 w-96 h-screen rounded-md">
      <div className="flex justify-between p-3">
        <h2>Response</h2>
        <div
          className="cursor-pointer"
          onClick={() => {
            setCommentModal(false);
          }}
        >
          <IoMdClose size={24} />
        </div>
      </div>
      {user ? (
        createCommentModal ? (
          <CreateCommentModal setCreateCommentModal={setCreateCommentModal} />
        ) : (
          <div
            className="make-post-container shadow-lg rounded-md cursor-pointer p-2"
            onClick={() => {
              setCreateCommentModal(true);
            }}
          >
            <p className="text-gray-600">What are your thoughts?</p>
          </div>
        )
      ) : (
        ""
      )}
      <CommentPage />
    </div>
  );
}
