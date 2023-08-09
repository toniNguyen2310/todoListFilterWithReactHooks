import Table from "react-bootstrap/Table";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "antd";
import ModalGetInfor from "../ModalEdit/ModalGetInfor";
import TableDatas from "../TableDatas/TableDatas";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import ReactPaginate from "react-paginate";

function ApiWithReact(props) {
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [listDatas, setListDatas] = useState();
  const [nameInput, setNameInput] = useState("");
  const [ageInput, setAgeInput] = useState("");
  const [fakeIdUpdate, setFakeIdUpdate] = useState();
  const [selectInput, setSelectInput] = useState("Admin");
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);
  //Pagination
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [listDataPagination, setlistDataPagination] = useState();

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
      setPageCount(Math.ceil(res.data.length / itemsPerPage));
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
      name: nameInput,
      age: ageInput,
      adUser: selectInput,
    };
    let res = await axios.post(
      "https://64c9473cb2980cec85c21b70.mockapi.io/infor",
      data
    );
    if (res && res.data) {
      let newData = res.data;
      setListDatas([newData, ...listDatas]);
      //pagination when post
      setPageCount(Math.ceil([newData, ...listDatas].length / itemsPerPage));
    }
    setNameInput("");
    setAgeInput("");
    setSelectInput("Admin");
    setOpen(false);
  };

  //handle DELETE BTN
  const handleDelete = async (id) => {
    await axios.delete(
      `https://64c9473cb2980cec85c21b70.mockapi.io/infor/${id}`
    );
    let newData = JSON.parse(JSON.stringify(listDatas));
    newData = newData.filter((item) => item.id != id);
    // pagination when delete
    setPageCount(Math.ceil(newData.length / itemsPerPage));
    console.log;
    if (currentPage > Math.ceil(newData.length / itemsPerPage)) {
      setCurrentPage(currentPage - 1);
    }
    setListDatas(newData);
  };

  ///HANDLE EDIT BTN
  const handleEditBtn = (id) => {
    let currentIndex = listDatas.findIndex((e) => e.id === id);
    setNameInput(listDatas[currentIndex].name);
    setAgeInput(listDatas[currentIndex].age);
    setFakeIdUpdate(id);
    setIsEdit(true);
    setOpen(true);
  };

  //handle save edit
  const handleSaveEdit = async () => {
    let newData = {
      id: fakeIdUpdate,
      name: nameInput,
      age: ageInput,
      adUser: selectInput,
    };
    let res = await axios.put(
      `https://64c9473cb2980cec85c21b70.mockapi.io/infor/${fakeIdUpdate}`,
      newData
    );
    let listDataNew = JSON.parse(JSON.stringify(listDatas));
    listDataNew = listDataNew.map((e) => {
      if (e.id === res.data.id) {
        return res.data;
      }
      return e;
    });
    listDataNew = setListDatas(listDataNew);
    setNameInput("");
    setAgeInput("");
    setOpen(false);
    setIsEdit(false);
    setSelectInput("Admin");
    console.log(newData);
  };

  const handleChangeSelect = (value) => {
    setSelectInput(value);
  };

  useEffect(() => {
    fetchAllUser();
  }, []);

  //Handle Pagination
  useEffect(() => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    // const listDataPagination = listDatas?.slice(startIndex, endIndex);
    setlistDataPagination(listDatas?.slice(startIndex, endIndex));
  }, [listDatas, currentPage]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };
  return (
    <>
      {loading ? (
        <h1>Loading.....</h1>
      ) : (
        <>
          <ModalGetInfor
            selectInput={selectInput}
            setSelectInput={setSelectInput}
            nameInput={nameInput}
            setNameInput={setNameInput}
            ageInput={ageInput}
            setAgeInput={setAgeInput}
            handleSubmitBtn={handleSubmitBtn}
            inputRef={inputRef}
            open={open}
            setOpen={setOpen}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            handleSaveEdit={handleSaveEdit}
            handleChangeSelect={handleChangeSelect}
          />
          <TableDatas
            listDatas={listDataPagination}
            handleDelete={handleDelete}
            handleEditBtn={handleEditBtn}
          />

          <ReactPaginate
            nextLabel=">>>"
            onPageChange={handlePageClick}
            pageRangeDisplayed={2}
            pageCount={pageCount}
            previousLabel="<<<"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
          />
        </>
      )}
    </>
  );
}

export default ApiWithReact;
