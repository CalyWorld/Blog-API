import { IoMdClose } from "react-icons/io";
export interface CommentModal {
  setCommentModal: React.Dispatch<React.SetStateAction<Boolean>>;
}
export default function CommentModal({ setCommentModal }: CommentModal) {
  return (
    <div className="comment-modal flex flex-col gap-5 fixed right-0 top-0 w-96 h-screen rounded-md">
      <div className="flex justify-end">
        <div
          className="cursor-pointer"
          onClick={() => {
            setCommentModal(false);
          }}
        >
          <IoMdClose size={24} />
        </div>
      </div>
      comment modal
    </div>
  );
}
