import React from "react";
import s from "./index.module.scss";
import { Draggable } from "@hello-pangea/dnd";
import { FiEdit2 } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";

const TaskCard = ({ id, index, title, text, onDelete, onEdit }) => {
  return (
    <Draggable draggableId={String(id)} index={index}>
      {(provided, snapshot) => (
        <div className={`${s.card} ${snapshot.isDragging ? s.dragging : ""}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
          }}
        >
          <div className={s.content}>
    <h4>{title}</h4>
    <p>{text}</p>
  </div>

  <div className={s.actions}>
    <button className={`${s.actionBtn} pressable`} onClick={onEdit}>
      <FiEdit2 size={40} />
    </button>
    <button className={`${s.actionBtn} pressable`} onClick={() => onDelete(id)}>
      <IoCloseOutline size={40} />
    </button>
  </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
