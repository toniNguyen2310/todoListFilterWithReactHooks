import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Modal, Input } from "antd";
function PagiApi(props) {
  const [loading, setLoading] = useState(false);
  const [listData, setListData] = useState();
  const [isLogin, setIslogin] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  // OPEN MODAL
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
    setIslogin(true);
  };

  //FORM LOGIN
  const handleLogin = () => {
    alert("dang nhap");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const changeToRegister = () => {
    setIslogin(false);
  };
  //FORM REGISTER
  const changeToLogin = () => {
    setIslogin(true);
  };
  const handleRegister = () => {
    alert("dang ky thanh cong");
  };
  //FETCH API
  const fetchApi = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://64c9473cb2980cec85c21b70.mockapi.io/infor"
      );
      setListData(response.data);
      setPageCount(Math.ceil(response.data.length / itemsPerPage));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchApi();
  }, []);

  //PAGINATION
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const subset = listData?.slice(startIndex, endIndex);
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <>
      <>
        <Button type="primary" onClick={showModal}>
          Vui lòng đăng nhập
        </Button>
        {isLogin ? (
          <Modal
            title="ĐĂNG NHẬP"
            open={isModalOpen}
            // onOk={handleLogin}
            onCancel={handleCancel}
            footer={[
              <Button key="back" onClick={handleCancel}>
                Quay lại trang chủ
              </Button>,
              <Button key="submit" type="primary" onClick={handleLogin}>
                Đăng nhập
              </Button>,
              <Button
                type="primary"
                key={"register"}
                onClick={changeToRegister}
                danger
              >
                Đăng ký Ngay!!!
              </Button>,
            ]}
          >
            <div>
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                placeholder="Nhập email"
                // value={nameInput}
                // onChange={(e) => setNameInput(e.target.value)}
              />

              <label htmlFor="ageValue">Mật khẩu</label>
              <Input.Password placeholder="Nhập mật khẩu" />
              {/* <Input
                id="password"
                placeholder="Nhập mật khẩu"
                type="password"
              /> */}
            </div>
          </Modal>
        ) : (
          <Modal
            title="ĐĂNG KÝ"
            open={isModalOpen}
            // onOk={handleLogin}
            onCancel={handleCancel}
            footer={[
              <Button key="back" onClick={changeToLogin}>
                Quay lại đăng nhập
              </Button>,
              <Button key="submit" type="primary" onClick={handleRegister}>
                Đăng Ký
              </Button>,
            ]}
          >
            <div>
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                placeholder="Nhập email"
                // value={nameInput}
                // onChange={(e) => setNameInput(e.target.value)}
              />
              <label htmlFor="ageValue">Mật khẩu</label>
              <Input.Password placeholder="Nhập mật khẩu" />
              <label htmlFor="ageValue">Nhập lại mật khẩu</label>
              <Input.Password placeholder="Nhập lại mật khẩu" />
            </div>
          </Modal>
        )}
      </>
      {/* <>
        {loading ? (
          <div>Loading....</div>
        ) : (
          <>
            {subset?.map((data) => {
              return (
                <div key={data.id}>
                  <div>Name: {data.name}</div>
                  <div>Age: {data.age}</div>
                </div>
              );
            })}
            <ReactPaginate
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={2}
              pageCount={pageCount}
              // forcePage={currentPage}
              previousLabel="< previous"
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
      </> */}
    </>
  );
}

export default PagiApi;
