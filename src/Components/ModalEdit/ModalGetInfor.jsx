import React, { useState } from "react";
import { Button, Modal, Input, Select } from "antd";

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
      <Button onClick={() => showModal()}>Add user</Button>
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
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            ref={inputRef}
          />
          <label htmlFor="ageValue">Age</label>
          <Input
            id="ageValue"
            placeholder="Enter age"
            value={ageInput}
            onChange={(e) => setAgeInput(e.target.value)}
          />
        </div>
        <div className="selectValue" style={{ marginTop: 10 }}>
          <label htmlFor="">User/Admin</label>
          <Select
            defaultValue={selectInput}
            style={{
              width: 120,
              marginLeft: 10,
            }}
            onChange={handleChangeSelect}
            options={[
              {
                value: "Admin",
                label: "Admin",
              },
              {
                value: "User",
                label: "User",
              },
            ]}
          />
        </div>
      </Modal>
    </>
  );
};
export default ModalGetInfor;
