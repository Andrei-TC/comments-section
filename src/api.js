export const getComments = async () => {
  return [
    {
      id: "1",
      body: "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      username: "amyrobson",
      image: "./images/image-amyrobson.png",
      score: 12,
      parentId: null,
      replyingTo: null,
      createdAt: "1 month ago",
    },
    {
      id: "2",
      body: "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
      username: "maxblagun",
      image: "./images/image-maxblagun.png",
      score: 5,
      parentId: null,
      replyingTo: null,
      createdAt: "2 weeks ago",
    },
    {
      id: "3",
      body: "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
      username: "ramsesmiron",
      image: "./images/image-ramsesmiron.png",
      score: 4,
      parentId: "2",
      replyingTo: "maxblagun",
      createdAt: "1 week ago",
    },
    {
      id: "4",
      body: "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
      username: "juliusomo",
      image: "./images/image-juliusomo.png",
      score: 2,
      parentId: "2",
      replyingTo: "ramsesmiron",
      createdAt: "2 days ago",
    },
  ];
};

export const createComment = async (
  text,
  parentId = null,
  targetUser = null
) => {
  return {
    id: Math.random().toString(36).substr(2, 9),
    body: text,
    username: "juliusomo",
    image: "./images/image-juliusomo.png",
    score: 0,
    parentId: parentId,
    replyingTo: targetUser,
    createdAt: new Date().toISOString(),
  };
};

export const updateComment = async (text) => {
  return { text };
};
export const updateScore = async (score) => {
  return { score };
};

export const deleteComment = async () => {
  return {};
};
