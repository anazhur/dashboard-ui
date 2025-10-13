import React, { useState } from "react";
import TaskColumn from "../TaskColumn";
import Modal from "../Modal/index";

const Taskboard = () => {
  const [columns, setColumns] = useState({
    todo: [
      { id: 1, title: "Layout", text: "Create layout" },
      { id: 2, title: "Clock", text: "Add clock" },
    ],
    doing: [{ id: 3, title: "Calendar", text: "Working on calendar" }],
    done: [{ id: 4, title: "Setup", text: "Setup project structure" }],
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
          { id: Date.now(), title, text },
        ],
      }));
    }

    setIsModalOpen(false);
    setEditingTask(null);
    setCurrentColumn(null);
    setFormData({ title: "", text: "" });
  };

  return (
    <>
      <TaskColumn
        title="To Do"
        cards={columns.todo}
        onDelete={handleDelete}
        onAddCard={() => openAddModal("todo")}
        onEditCard={(task) => openEditModal(task, "todo")}
      />
      <TaskColumn
        title="Doing"
        cards={columns.doing}
        onDelete={handleDelete}
        onAddCard={() => openAddModal("doing")}
        onEditCard={(task) => openEditModal(task, "doing")}
      />
      <TaskColumn
        title="Done"
        cards={columns.done}
        onDelete={handleDelete}
        onAddCard={() => openAddModal("done")}
        onEditCard={(task) => openEditModal(task, "done")}
      />

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <form onSubmit={handleSave}>
            <h3>{editingTask ? "Edit Task" : "Add New Task"}</h3>
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <textarea
              placeholder="Description"
              value={formData.text}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
            />
            <button type="submit">{editingTask ? "Save" : "Add"}</button>
          </form>
        </Modal>
      )}
    </>
  );
};

export default Taskboard;