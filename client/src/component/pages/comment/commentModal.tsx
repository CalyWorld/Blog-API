import { useContext, useState } from "react";
import { IoMdClose } from "react-icons/io";
import CreateCommentModal from "./createCommentModal";
import { UserContext, UserContextType } from "../../../context/userContext";
import CommentPage from "./commentPage";
import { CommentModalType } from "../../../interface/commentModalProps";

export function CommentModal({ setCommentModal, comments }: CommentModalType) {
  const [createCommentModal, setCreateCommentModal] = useState<boolean>(false);
  const { user } = useContext<UserContextType>(UserContext);

  return (
    <div className="comment-modal flex flex-col gap-5 fixed right-0 top-0 w-2/5 h-screen rounded-md overflow-y-scroll">
      <div className="flex justify-between p-2">
        <div className="flex gap-2">
          <h2 className="font-bold">Response</h2>
          <span>{`(${comments?.length})`}</span>
        </div>
        <div
          className="cursor-pointer"
          onClick={() => {
            setCommentModal(false);
          }}
        >
          <IoMdClose size={24} />
        </div>
      </div>
      <div className="transition-opacity duration-1000 ease-in-out">
        {user ? (
          createCommentModal ? (
            <CreateCommentModal setCreateCommentModal={setCreateCommentModal} />
          ) : (
            <div
              className="make-post-container shadow-lg rounded-md cursor-pointer"
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
      </div>
      <CommentPage comments={comments} />
    </div>
  );
}
