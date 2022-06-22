import React from "react";
import UpVote from "./upvote";
import moment from "moment";
import CommentForm from "./commentForm";

const Comment = ({
  comment,
  currentUserName,
  replies,
  addComment,
  deleteComment,
  updateComment,
  activeComment,
  setActiveComment,
  parentId = null,
  updateCommentScore,
}) => {
  const canReply = currentUserName !== comment.username;
  const canEdit = currentUserName === comment.username;
  const canDelete = currentUserName === comment.username;
  const isUserName = currentUserName === comment.username;
  const isReplying =
    activeComment &&
    activeComment.type === "replying" &&
    activeComment.id === comment.id;

  const isEditing =
    activeComment &&
    activeComment.type === "editing" &&
    activeComment.id === comment.id;

  const replyId = parentId ? parentId : comment.id;

  return (
    <React.Fragment>
      <div className="comment-container grid">
        <div className="user-info flex">
          <img className="user-avatar" src={comment.image} alt="avatar"></img>
          <p className="user-name">
            {comment.username}{" "}
            {isUserName && <span className="userBadge">you</span>}
          </p>
          <p className="created-at">{moment().fromNow()}</p>
        </div>
        {!isEditing && (
          <p className="comment-text">
            {comment.replyingTo !== null && (
              <span className="replyingTo">
                {"@" + comment.replyingTo + " "}
              </span>
            )}
            {comment.body}
          </p>
        )}
        {isEditing && (
          <CommentForm
            submitLabel="Update"
            hasCancelButton
            initialText={comment.body}
            handleSubmit={(text) => updateComment(text, comment.id)}
            handleCancel={() => setActiveComment(null)}
          />
        )}
        {!isEditing && (
          <div className="user-action flex">
            <UpVote
              score={comment.score}
              updateCommentScore={updateCommentScore}
              commentId={comment.id}
            />
            <div className="user-action-buttons flex">
              {canReply && (
                <button
                  className="comment-button send"
                  onClick={() =>
                    setActiveComment({ id: comment.id, type: "replying" })
                  }
                >
                  Reply
                </button>
              )}
              {canEdit && (
                <button
                  className="comment-button edit"
                  onClick={() =>
                    setActiveComment({ id: comment.id, type: "editing" })
                  }
                >
                  Edit
                </button>
              )}
              {canDelete && (
                <button
                  className="comment-button delete"
                  onClick={() => deleteComment(comment.id)}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      {isReplying && (
        <CommentForm
          submitLabel="Reply"
          handleSubmit={(text) => addComment(text, replyId)}
        />
      )}
      {replies.length > 0 && (
        <div className="comment-container grid reply-c ">
          {replies.map((reply) => (
            <Comment
              comment={reply}
              key={reply.id}
              currentUserName={currentUserName}
              replies={[]}
              deleteComment={deleteComment}
              updateComment={updateComment}
              parentId={comment.id}
              addComment={addComment}
              activeComment={activeComment}
              setActiveComment={setActiveComment}
              updateCommentScore={updateCommentScore}
            />
          ))}
        </div>
      )}
    </React.Fragment>
  );
};

export default Comment;
