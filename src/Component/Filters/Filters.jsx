import React, { useEffect, useState } from "react";
import { Col, Row, Input, Typography, Radio, Select, Tag } from "antd";
import TodoList from "../TodoList/TodoList";
const { Search } = Input;
function Filters(props) {
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPriorities, setFilterPriorities] = useState([]);
  // handle Search Text Change
  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };
  // handle Status Change
  const handleStatusChange = (e) => {
    setFilterStatus(e.target.value);
  };
  // handle Priority Change
  const handlePriorityChange = (e) => {
    setFilterPriorities(e);
  };
  return (
    <>
      <Row justify="center">
        <Col span={24}>
          <Typography.Paragraph
            style={{ fontWeight: "bold", marginBottom: 3, marginTop: 10 }}
          >
            Search
          </Typography.Paragraph>
          <Search
            placeholder="input search text"
            value={searchText}
            onChange={(e) => handleSearchTextChange(e)}
          />
        </Col>
        <Col sm={24}>
          <Typography.Paragraph
            style={{ fontWeight: "bold", marginBottom: 3, marginTop: 10 }}
          >
            Filter By Status
          </Typography.Paragraph>
          <Radio.Group value={filterStatus} onChange={handleStatusChange}>
            <Radio value="All">All</Radio>
            <Radio value="Completed">Completed</Radio>
            <Radio value="Todo">To do</Radio>
          </Radio.Group>
        </Col>
        <Col sm={24}>
          <Typography.Paragraph
            style={{ fontWeight: "bold", marginBottom: 3, marginTop: 10 }}
          >
            Filter By Priority
          </Typography.Paragraph>
          <Select
            mode="multiple"
            allowClear
            placeholder="Please select"
            style={{ width: "100%" }}
            value={filterPriorities}
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
        </Col>
      </Row>
      <TodoList
        searchText={searchText}
        filterStatus={filterStatus}
        filterPriorities={filterPriorities}
      />
    </>
  );
}

export default Filters;
