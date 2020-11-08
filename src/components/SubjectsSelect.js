import react from "react";
import { Select } from "@vkontakte/vkui";

const SubjectsSelect = ({ id, onChange }) => {
  return (
    <Select id={id} onChange={onChange} placeholder="Выберете тематику">
      <option value="Новости">Новости</option>
      <option value="Образование">Образование</option>
      <option value="Общение">Общение (Флудилка)</option>
      <option value="Кино">Кино</option>
    </Select>
  );
};

export default SubjectsSelect;
