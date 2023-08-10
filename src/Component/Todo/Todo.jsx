import React, { useState } from "react";
import { Row, Tag, Checkbox } from "antd";
const priorityColorMapping = {
  High: "red",
  Medium: "blue",
  Low: "gray",
};
function Todo(props) {
  const { name, priority, id, completed, todos, setTodos } = props;
  const [checked, setChecked] = useState(completed);
  const toggleCheckbox = (id) => {
    setChecked(!checked);
    let newTodos = JSON.parse(JSON.stringify(todos));
    newTodos = newTodos.map((e) => {
      if (e.id === id) {
        return { ...e, completed: !completed };
      }
      return e;
    });
    setTodos(newTodos);
  };
  return (
    <Row
      justify="space-between"
      style={{
        marginBottom: 3,
        ...(checked ? { opacity: 0.5, textDecoration: "line-through" } : {}),
      }}
    >
      <Checkbox checked={checked} onChange={() => toggleCheckbox(id)}>
        {name}
      </Checkbox>
      <Tag color={priorityColorMapping[priority]} style={{ margin: 0 }}>
        {priority}
      </Tag>
    </Row>
  );
}

export default Todo;
