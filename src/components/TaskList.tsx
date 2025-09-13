import "./TaskList.css";
import { useState } from "react";
import type { Task, FilterType, Priority, Category, TaskUpdate, EditForm } from "../types";
import { PRIORITY_LABELS, CATEGORY_LABELS } from "../types";

interface TaskListProps {
  taskList: Task[];
  handleRemoveTask: (id: number) => void;
  handleClearAllTasks: () => void;
  handleChangeTask: (id: number, updatedTask: TaskUpdate) => void;
  filter: FilterType;
}

export const TaskList = ({ taskList, handleRemoveTask, handleClearAllTasks, handleChangeTask, filter }: TaskListProps) => {
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<EditForm>({
    title: '',
    priority: 'medium',
    category: 'work'
  });
  const displayTasks = taskList.filter(({ completed }) => {
    if (filter === 'ALL') return true;
    if (filter === 'TODO') return !completed;
    if (filter === 'DONE') return completed;
  });

  const handleEditStart = (task: Task) => {
    setEditingTaskId(task.id);
    setEditForm({
      title: task.title,
      priority: task.priority,
      category: task.category
    });
  };

  const handleEditSave = (taskId: number) => {
    handleChangeTask(taskId, {
      title: editForm.title,
      priority: editForm.priority,
      category: editForm.category
    });
    setEditingTaskId(null);
  };

  const handleEditCancel = () => {
    setEditingTaskId(null);
    setEditForm({
      title: '',
      priority: 'medium',
      category: 'work'
    });
  };
  // Sort tasks to put medium priority (中) and work category (仕事) at the bottom
  const sortedTasks = [...displayTasks].sort((a, b) => {
    const aIsBottom = a.priority === 'medium' || a.category === 'work';
    const bIsBottom = b.priority === 'medium' || b.category === 'work';
    
    if (aIsBottom && !bIsBottom) return 1;
    if (!aIsBottom && bIsBottom) return -1;
    return 0;
  });
  return (
    <div className="task-list">
      <ul className="todolist">
        {sortedTasks.map((task) => (
          <li key={task.id} className={filter === 'ALL' ? '' : task.completed ? 'completed' : ''}>
            {editingTaskId === task.id ? (
              <div className="edit-form">
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="edit-input"
                />
                <select
                  value={editForm.priority}
                  onChange={(e) => setEditForm({ ...editForm, priority: e.target.value as Priority })}
                  className="edit-select"
                >
                  <option value="low">低</option>
                  <option value="medium">中</option>
                  <option value="high">高</option>
                </select>
                <select
                  value={editForm.category}
                  onChange={(e) => setEditForm({ ...editForm, category: e.target.value as Category })}
                  className="edit-select"
                >
                  <option value="work">仕事</option>
                  <option value="shopping">買い物</option>
                  <option value="individually">個人</option>
                  <option value="other">その他</option>
                </select>
                <button className="save-button" onClick={() => handleEditSave(task.id)}>保存</button>
                <button className="cancel-button" onClick={handleEditCancel}>キャンセル</button>
              </div>
            ) : (
              <>
                <span>{task.title}</span>
                <button 
                  className={`completion-button ${task.completed ? 'completed' : 'incomplete'}`}
                  onClick={() => handleChangeTask(task.id, { completed: !task.completed })}
                >
                  {task.completed ? '完了' : '未完了'}
                </button>
                <span className={`category ${task.category}`}>{CATEGORY_LABELS[task.category]}</span>
                <span className={`priority ${task.priority}`}>{PRIORITY_LABELS[task.priority]}</span>
                <button className="edit-button" onClick={() => handleEditStart(task)}>編集</button>
                <button className="Danger" onClick={() => handleRemoveTask(task.id)}>X</button>
              </>
            )}
          </li>
        ))}
      </ul>
      {sortedTasks.length > 0 && (
        <div className="clear-all-container">
          <button className="clear-all-button" onClick={handleClearAllTasks}>
            全部消す
          </button>
        </div>
      )}
    </div>
  );
};
