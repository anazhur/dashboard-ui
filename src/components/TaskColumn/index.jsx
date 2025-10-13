import React from "react";
import s from "./index.module.scss";
import TaskCard from "../TaskCard/index";

const TaskColumn = ({ title, cards, onDelete, onAddCard, onEditCard }) => {
  return (
    <div style={{ flex: 1, marginRight: "10px" }}>
      <h3>{title}</h3>
      <button onClick={onAddCard}>+ Add task</button>
      <div>
        {cards.map((card) => (
          <TaskCard
            key={card.id}
            id={card.id}
            title={card.title}
            text={card.text}
            onDelete={onDelete}
            onEdit={() => onEditCard(card)}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;
