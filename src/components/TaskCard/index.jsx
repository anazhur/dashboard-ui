import React from "react";
import s from "./index.module.scss";

const TaskCard = ({ id, title, text, onDelete, onEdit }) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "5px" }}>
      <h4>{title}</h4>
      <p>{text}</p>
      <button onClick={() => onEdit()}>Edit</button>
      <button onClick={() => onDelete(id)}>✕</button>
    </div>
  );
};

export default TaskCard;
