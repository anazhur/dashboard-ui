import React from "react";
import s from "./index.module.scss";
import TaskCard from "../TaskCard/index";
import { Droppable } from "@hello-pangea/dnd";

const TaskColumn = ({
  title,
  cards,
  onDelete,
  onAddCard,
  onEditCard,
  columnId,
}) => {
  return (
    <div className={s.column}>
      <div className={s.columnTitle}>
        <h3>{title}</h3>
      <button className={`${s.addBtn} pressable`} onClick={onAddCard}>+</button>
      </div>
      <Droppable droppableId={columnId}>
        {(provided) => (
          <div className={s.cards} ref={provided.innerRef} {...provided.droppableProps}>
            {cards.map((card, index) => (
              <TaskCard
                key={card.id}
                id={card.id}
                index={index}
                title={card.title}
                text={card.text}
                onDelete={onDelete}
                onEdit={() => onEditCard(card)}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskColumn;
