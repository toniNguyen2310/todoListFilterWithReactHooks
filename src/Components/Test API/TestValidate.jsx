import React from "react";
import { Button, Modal, Input } from "antd";
function TestValidate(props) {
  console.log(">Hello new commit");
  return (
    <div>
      <>
        <div>
          <h3>ĐĂNG NHẬP</h3>
          <label htmlFor="email">Email</label>
          <Input id="email" placeholder="Nhập email" />

          <label htmlFor="ageValue">Mật khẩu</label>
          <Input.Password placeholder="Nhập mật khẩu" />
          <button>SUBMIT</button>
        </div>
        <br />
        <br />
        <br />
        <br />
      </>
      <>
        <div>
          <h3>ĐĂNG KÝ</h3>
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
          <button>Đăng Ký</button>
        </div>
      </>
    </div>
  );
}

export default TestValidate;
