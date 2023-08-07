import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
function TestApi(props) {
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [listDatas, setListDatas] = useState();
  const [nameInput, setNameInput] = useState("");
  const [ageInput, setAgeInput] = useState("");
  const [fakeIdUpdate, setFakeIdUpdate] = useState();
  const inputRef = useRef(null);
  ///FETCH API
  const fetchAllUser = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://64c9473cb2980cec85c21b70.mockapi.io/infor"
      );
      const data = res && res.data ? res.data : [];
      setListDatas(data.reverse());
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  ///HANDLE SUBMIT BUTTON
  const handleSubmitBtn = async () => {
    if (!nameInput) {
      alert("empty name");
      return;
    }
    if (!ageInput) {
      alert("empty email");
      return;
    }

    let data = {
      id: uuidv4(),
      name: nameInput,
      email: ageInput,
    };
    let res = await axios.post(
      "https://64c9473cb2980cec85c21b70.mockapi.io/infor",
      data
    );
    if (res && res.data) {
      let newData = res.data;
      setListDatas([newData, ...listDatas]);
    }
    setNameInput("");
    setAgeInput("");
    inputRef.current.focus();
  };

  ///HANDLE EDIT BTN
  const handleEditBtn = (id) => {
    let currentIndex = listDatas.findIndex((e) => e.id === id);
    setNameInput(listDatas[currentIndex].name);
    setAgeInput(listDatas[currentIndex].email);
    setFakeIdUpdate(id);
    setIsEdit(true);
  };
  //handle DELETE BTN
  const handleDelete = async (id) => {
    await axios.delete(
      `https://64c9473cb2980cec85c21b70.mockapi.io/infor/${id}`
    );
    let newData = JSON.parse(JSON.stringify(listDatas));
    newData = newData.filter((item) => item.id != id);
    setListDatas(newData);
  };
  //handle save edit
  const handleSaveEdit = async () => {
    let newData = { id: fakeIdUpdate, name: nameInput, email: ageInput };
    await axios.put(
      `https://64c9473cb2980cec85c21b70.mockapi.io/infor/${fakeIdUpdate}`,
      newData
    );
    let listDataNew = listDatas.map((e) => {
      if (e.id === fakeIdUpdate) {
        return { ...e, name: nameInput, email: ageInput };
      }
      return e;
    });
    setListDatas(listDataNew);
    setNameInput("");
    setAgeInput("");
    setIsEdit(false);
    inputRef.current.focus();
  };
  useEffect(() => {
    fetchAllUser();
  }, []);
  return (
    <>
      {loading ? (
        <h1>Loading.....</h1>
      ) : (
        <>
          <h1>List Data User/Admin</h1>
          <div className="getData">
            <label htmlFor="">Name</label>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              ref={inputRef}
            />
            <label htmlFor="">Email</label>
            <input
              type="email"
              value={ageInput}
              onChange={(e) => setAgeInput(e.target.value)}
            />
            {isEdit ? (
              <button onClick={handleSaveEdit}>SAVE</button>
            ) : (
              <button onClick={handleSubmitBtn}>ADD</button>
            )}
          </div>
          <div>
            {listDatas &&
              listDatas.length > 0 &&
              listDatas.map((data) => {
                return (
                  <div className="per-user" key={data.id}>
                    <span>Name: {data.name}</span>
                    <span>Emai: {data.email}</span>
                    <span
                      className="editBtn"
                      onClick={() => handleEditBtn(data.id)}
                    >
                      Edit
                    </span>
                    <span
                      className="delBtn"
                      onClick={() => handleDelete(data.id)}
                    >
                      Delete
                    </span>
                  </div>
                );
              })}
          </div>
        </>
      )}
    </>
  );
}
export default TestApi;
