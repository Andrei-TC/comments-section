import { useState } from "react";
const CommentForm = ({
  handleSubmit,
  submitLabel,
  handleCancel,
  initialText = "",
  hasCancelButton = false,
}) => {
  const [text, setText] = useState(initialText);
  const isTextareaDisable = text.length === 0;
  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text);
    setText("");
  };

  return (
    <form className="grid" onSubmit={onSubmit}>
      <textarea
        name="replyCommentArea"
        id="replyCommentArea"
        placeholder="Add a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <div className="replyCommentAction flex">
        <img src="./images/image-juliusomo.png" alt="avatar" />
        <div className="action-container">
          <button className="replyBtn" disabled={isTextareaDisable}>
            {submitLabel}
          </button>
          {hasCancelButton && (
            <button
              type="button"
              className="replyBtn cancelBtn"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
