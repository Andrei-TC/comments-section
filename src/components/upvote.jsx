import { useState } from "react";
const Upvote = ({ score, updateCommentScore, commentId }) => {
  const [scoreAction, setScoreAction] = useState(score);

  const incrScore = () => {
    score = scoreAction + 1;
    setScoreAction(score);
    updateCommentScore(score, commentId);
  };
  const descScore = () => {
    score = scoreAction - 1;
    setScoreAction(score);
    updateCommentScore(score, commentId);
  };

  return (
    <div className="user-action-rating flex">
      <button className="rating-plus rBtn" onClick={incrScore}>
        +
      </button>

      <p className="rating-points grid">{scoreAction}</p>

      <button className="rating-minus rBtn" onClick={descScore}>
        -
      </button>
    </div>
  );
};

export default Upvote;
