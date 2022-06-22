import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  getComments as getCommentsApi,
  createComment as createCommentApi,
  deleteComment as deleteCommentApi,
  updateComment as updateCommentApi,
} from "../api";
import Comment from "./comment";
import CommentForm from "./commentForm";

const Comments = ({ currentUserName }) => {
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const rootComments = backendComments.filter(
    (backendComment) => backendComment.parentId === null
  );

  const getReplies = (commentId) => {
    return backendComments
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  };

  const addComment = (text, parentId, targetUser) => {
    createCommentApi(text, parentId).then((comment) => {
      setBackendComments([...backendComments, comment]);
      setActiveComment(null);
    });
  };
  const deleteComment = (commentId) => {
    deleteCommentApi(commentId).then(() => {
      const updatedBackendComments = backendComments.filter(
        (backendComment) => backendComment.id !== commentId
      );
      setBackendComments(updatedBackendComments);
    });
  };

  const updateComment = (text, commentId) => {
    updateCommentApi(text, commentId).then(() => {
      const updatedBackendComments = backendComments.map((backendComment) => {
        if (backendComment.id === commentId) {
          return { ...backendComment, body: text };
        }
        return backendComment;
      });
      setBackendComments(updatedBackendComments);
      setActiveComment(null);
    });
  };
  const updateCommentScore = (score, commentId) => {
    updateCommentApi(score, commentId).then(() => {
      const updatedBackendComments = backendComments.map((backendComment) => {
        if (backendComment.id === commentId) {
          return { ...backendComment, score: score };
        }
        return backendComment;
      });
      setBackendComments(updatedBackendComments);
    });
  };
  useEffect(() => {
    getCommentsApi().then((data) => {
      setBackendComments(data);
    });
  }, []);
  return (
    <React.Fragment>
      <div className="comments-list-container grid">
        {rootComments.map((rootComment) => (
          <Comment
            key={rootComment.id}
            comment={rootComment}
            replies={getReplies(rootComment.id)}
            upvoteScore={rootComment.score}
            currentUserName={currentUserName}
            deleteComment={deleteComment}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            updateComment={updateComment}
            updateCommentScore={updateCommentScore}
          />
        ))}
      </div>
      <div className="comment-container grid send-comment-container">
        <CommentForm submitLabel="Add comment" handleSubmit={addComment} />
      </div>
    </React.Fragment>
  );
};

export default Comments;
