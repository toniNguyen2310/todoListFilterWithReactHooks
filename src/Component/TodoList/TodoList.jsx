import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Col, Row, Input, Button, Select, Tag, Space } from "antd";
import Todo from "../Todo/Todo";
import Filters from "../Filters/Filters";

function TodoList(props) {
  const { searchText, filterStatus, filterPriorities } = props;
  const [todoName, setTodoName] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [todos, setTodos] = useState([
    { id: 1, name: "Learn React", priority: "High", completed: true },
    { id: 2, name: "Learn English", priority: "Medium", completed: false },
    { id: 3, name: "Learn Yoga", priority: "Low", completed: true },
  ]);
  // handle add todos
  const handleInputChange = (e) => {
    setTodoName(e.target.value);
  };
  const handlePriorityChange = (value) => {
    setPriority(value);
  };
  const handleButtonAdd = () => {
    setTodos([
      ...todos,
      {
        id: uuidv4(),
        name: todoName,
        priority: priority,
        completed: false,
      },
    ]);
    setTodoName("");
    setPriority("Medium");
  };
  return (
    <>
      <Row style={{ height: "calc(100% - 40px)" }}>
        <Col
          span={24}
          style={{ height: "calc(100% - 40px)", overflowY: "auto" }}
        >
          {todos
            .filter((todo) => {
              if (filterStatus === "All") {
                return filterPriorities.length
                  ? todo.name.toLowerCase().includes(searchText) &&
                      todo.priority.includes(filterPriorities)
                  : todo.name.toLowerCase().includes(searchText);
              }
              return (
                todo.name.toLowerCase().includes(searchText) &&
                (filterStatus === "Completed"
                  ? todo.completed
                  : !todo.completed) &&
                (filterPriorities.length
                  ? todo.priority.includes(filterPriorities)
                  : true)
              );
            })
            .map((todo) => {
              return (
                <Todo
                  key={todo.id}
                  name={todo.name}
                  id={todo.id}
                  priority={todo.priority}
                  completed={todo.completed}
                  todos={todos}
                  setTodos={setTodos}
                />
              );
            })}
        </Col>
        <Col span={24}>
          <Space style={{ display: "flex" }} compact="true">
            <Input
              id="inputAdd"
              value={todoName}
              onChange={handleInputChange}
            />
            <Select
              defaultValue="Medium"
              value={priority}
              onChange={handlePriorityChange}
            >
              <Select.Option value="High" label="High">
                <Tag color="red">High</Tag>
              </Select.Option>
              <Select.Option value="Medium" label="Medium">
                <Tag color="blue">Medium</Tag>
              </Select.Option>
              <Select.Option value="Low" label="Low">
                <Tag color="gray">Low</Tag>
              </Select.Option>
            </Select>
            <Button type="primary" onClick={handleButtonAdd}>
              Add
            </Button>
          </Space>
        </Col>
      </Row>
    </>
  );
}

export default TodoList;
