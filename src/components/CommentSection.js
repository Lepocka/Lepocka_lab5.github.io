import React, { useState } from 'react';

const CommentSection = function () {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = function (e) {
    e.preventDefault();
    if (name.trim() === "" || comment.trim() === "") {
      alert("Будь ласка, заповніть усі поля!");
      return;
    }
    const newComment = { id: Date.now(), name: name, comment: comment, collapsed: false };
    setComments(comments.concat(newComment));
    setName("");
    setComment("");
  };

  const toggleCollapse = function (id) {
    setComments(
      comments.map(function (c) {
        if (c.id === id) {
          return { ...c, collapsed: !c.collapsed };
        }
        return c;
      })
    );
  };

  const deleteComment = function (id) {
    setComments(comments.filter(function (c) {
      return c.id !== id;
    }));
  };

  return React.createElement(
    "div",
    { className: "comments-section" },
    React.createElement("h2", null, "Коментарі інших гравців"),
    React.createElement(
      "form",
      { id: "comment-form", onSubmit: handleSubmit },
      React.createElement("input", {
        type: "text",
        placeholder: "Ваше ім’я (гравець)",
        value: name,
        onChange: function (e) { setName(e.target.value); }
      }),
      React.createElement("textarea", {
        placeholder: "Залиште свій коментар про цього гравця",
        value: comment,
        onChange: function (e) { setComment(e.target.value); }
      }),
      React.createElement("button", { type: "submit" }, "Додати коментар")
    ),
    React.createElement(
      "div",
      { id: "comments-list" },
      comments.map(function (c) {
        return React.createElement(
          "div",
          { key: c.id, className: "comment-block" },
          React.createElement("strong", {
            className: "comment-name",
            onClick: function () { toggleCollapse(c.id); }
          }, c.name),
          React.createElement("p", { className: c.collapsed ? "comment-text hidden" : "comment-text" }, c.comment),
          React.createElement("button", {
            className: "delete-btn",
            onClick: function () { deleteComment(c.id); }
          }, "Видалити")
        );
      })
    )
  );
};

export default CommentSection;
