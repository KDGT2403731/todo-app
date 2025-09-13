import { useState } from 'react';
import './InputForm.css';
import type { Task, Priority, Category } from '../types';

interface InputFormProps {
  onAddTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  priority: Priority;
  category: Category;
}

export const InputForm = ({ onAddTask, priority: initialPriority, category: initialCategory }: InputFormProps) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>(initialPriority);
  const [category, setCategory] = useState<Category>(initialCategory);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask({
        title: title.trim(),
        completed: false,
        priority,
        category
      });
      setTitle('');
    }
  };

  return (
    <form className="input-form" onSubmit={handleSubmit}>
      <div className="input-row">
        <input 
          type="text" 
          placeholder="タスクを入力してください" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit" className="add-button">追加</button>
      </div>
      <div className="dropdown-row">
        <select value={priority} onChange={(e) => setPriority(e.target.value as any)}>
          <option value="low">低</option>
          <option value="medium">中</option>
          <option value="high">高</option>
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value as any)}>
          <option value="work">仕事</option>
          <option value="shopping">買い物</option>
          <option value="individually">個人</option>
          <option value="other">その他</option>
        </select>
      </div>
    </form>
  );
};
