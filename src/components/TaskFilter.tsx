import "./TaskFilter.css";
import type { FilterType } from "../types";

type TaskFilterProps = {
  onChange: (value: FilterType) => void;
  value: FilterType;
}

export const TaskFilter = ({ onChange, value }: TaskFilterProps) => {
  const handleClick = (key: FilterType) => {onChange(key)};
  return (
    <>
      <div className="todo-filter">
        <label><input type="radio" name="filter" defaultChecked className={value === 'ALL' ? 'is-active' : ''} onClick={() => handleClick('ALL')} />All</label>
        <label><input type="radio" name="filter" className={value === 'TODO' ? 'is-active' : ''} onClick={() => handleClick('TODO')} />ToDo</label>
        <label><input type="radio" name="filter" className={value === 'DONE' ? 'is-active' : ''} onClick={() => handleClick('DONE')}/>Done</label>
      </div>
    </>
  );
};
