import React, { useEffect, useState } from "react";
import TaskColumn from "../TaskColumn";
import Modal from "../Modal/index";
import { DragDropContext } from "@hello-pangea/dnd";
import s from "./index.module.scss";

const STORAGE_KEY = "kanbanColumns_v1";

const defaultColumns = {
  todo: [],
  doing: [],
  done: [],
};

const Taskboard = () => {
  const [columns, setColumns] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultColumns;
      const parsed = JSON.parse(raw);
      return parsed;
    } catch {
      return defaultColumns;
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentColumn, setCurrentColumn] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({ title: "", text: "" });

  const handleDelete = (id) => {
    setColumns((prev) => {
      const updated = { ...prev };
      for (let key in updated) {
        updated[key] = updated[key].filter((card) => card.id !== id);
      }
      return updated;
    });
  };

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(columns));
    } catch {}
  }, [columns]);

  const openAddModal = (columnKey) => {
    setCurrentColumn(columnKey);
    setEditingTask(null);
    setFormData({ title: "", text: "" });
    setIsModalOpen(true);
  };

  const openEditModal = (task, columnKey) => {
    setEditingTask({ ...task, columnKey });
    setFormData({ title: task.title, text: task.text });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const { title, text } = formData;
    if (!title.trim() || !text.trim()) return;

    if (editingTask) {
      setColumns((prev) => {
        const updated = { ...prev };
        const col = editingTask.columnKey;
        updated[col] = updated[col].map((task) =>
          task.id === editingTask.id ? { ...task, title, text } : task
        );
        return updated;
      });
    } else {
      setColumns((prev) => ({
        ...prev,
        [currentColumn]: [
          ...prev[currentColumn],
          { id: Date.now(), title, text},
        ],
      }));
    }

    setIsModalOpen(false);
    setEditingTask(null);
    setCurrentColumn(null);
    setFormData({ title: "", text: "" });
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const startCol = source.droppableId;
    const finishCol = destination.droppableId;

    if (startCol === finishCol) {
      setColumns((prev) => {
        const items = Array.from(prev[startCol]);
        const [moved] = items.splice(source.index, 1);
        items.splice(destination.index, 0, moved);
        return { ...prev, [startCol]: items };
      });
      return;
    }

    setColumns((prev) => {
      const startItems = Array.from(prev[startCol]);
      const finishItems = Array.from(prev[finishCol]);
      const [moved] = startItems.splice(source.index, 1);
      finishItems.splice(destination.index, 0, moved);

      return {
        ...prev,
        [startCol]: startItems,
        [finishCol]: finishItems,
      };
    });
  };

  return (
    <div className={s.board}>
      <DragDropContext onDragEnd={onDragEnd}>
        <TaskColumn
          columnId="todo"
          title="To Do"
          cards={columns.todo}
          onDelete={handleDelete}
          onAddCard={() => openAddModal("todo")}
          onEditCard={(task) => openEditModal(task, "todo")}
        />
        <TaskColumn
          columnId="doing"
          title="Doing"
          cards={columns.doing}
          onDelete={handleDelete}
          onAddCard={() => openAddModal("doing")}
          onEditCard={(task) => openEditModal(task, "doing")}
        />
        <TaskColumn
          columnId="done"
          title="Done"
          cards={columns.done}
          onDelete={handleDelete}
          onAddCard={() => openAddModal("done")}
          onEditCard={(task) => openEditModal(task, "done")}
        />
      </DragDropContext>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <form onSubmit={handleSave}>
            <h3>{editingTask ? "Edit Task" : "Add New Task"}</h3>
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <textarea
              placeholder="Description"
              value={formData.text}
              onChange={(e) =>
                setFormData({ ...formData, text: e.target.value })
              }
            />
            <button type="submit">{editingTask ? "Save" : "Add"}</button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Taskboard;
