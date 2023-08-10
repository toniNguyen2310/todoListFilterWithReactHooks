import React, { useState } from "react";
import { Button, Modal, Input, Select, Tag } from "antd";

const ModalGetInfor = (props) => {
  const {
    nameInput,
    setNameInput,
    ageInput,
    setAgeInput,
    selectInput,
    setSelectInput,
    handleSubmitBtn,
    inputRef,
    open,
    setOpen,
    isEdit,
    setIsEdit,
    handleSaveEdit,
    handleChangeSelect,
  } = props;

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    setIsEdit(false);
    setNameInput("");
    setAgeInput("");
  };

  return (
    <>
      <Button type="primary" onClick={() => showModal()}>
        Add user
      </Button>
      <Modal
        open={open}
        title="Information Customer"
        onOk={handleSubmitBtn}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          isEdit ? (
            <Button key="update" type="primary" onClick={handleSaveEdit}>
              Update
            </Button>
          ) : (
            <Button key="submit" type="primary" onClick={handleSubmitBtn}>
              Submit
            </Button>
          ),
        ]}
      >
        <div className="inputValue">
          <label htmlFor="nameValue">Name</label>
          <Input
            id="nameValue"
            placeholder="Enter Name"
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            ref={inputRef}
          />
          <label htmlFor="ageValue">Age</label>
          <Input
            id="ageValue"
            placeholder="Enter age"
            type="number"
            value={ageInput}
            onChange={(e) => setAgeInput(e.target.value)}
          />
        </div>
        <div className="selectValue" style={{ marginTop: 10 }}>
          <Select
            defaultValue="Admin"
            value={selectInput}
            onChange={handleChangeSelect}
          >
            <Select.Option value="Admin" label="Admin">
              <Tag color="red">Admin</Tag>
            </Select.Option>
            <Select.Option value="User" label="User">
              <Tag color="blue">User</Tag>
            </Select.Option>
          </Select>
        </div>
      </Modal>
    </>
  );
};
export default ModalGetInfor;
