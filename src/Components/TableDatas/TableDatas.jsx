import React from "react";
import { Button } from "antd";

function TableDatas(props) {
  const { listDatas, handleDelete, handleEditBtn } = props;
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>User/Admin</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {listDatas &&
          listDatas.length > 0 &&
          listDatas.map((data) => {
            return (
              <tr key={data.id}>
                <td>{data.name}</td>
                <td>{data.age}</td>
                <td>{data.adUser}</td>
                {data.adUser === "Admin" ? (
                  <>
                    <td>
                      <Button
                        type="primary"
                        onClick={() => handleEditBtn(data.id)}
                      >
                        Edit
                      </Button>
                    </td>
                    <td>
                      <Button
                        type="primary"
                        onClick={() => handleDelete(data.id)}
                        danger
                      >
                        Delete
                      </Button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>
                      <Button type="primary" disabled>
                        Edit
                      </Button>
                    </td>
                    <td>
                      <Button type="primary" disabled>
                        Delete
                      </Button>
                    </td>
                  </>
                )}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}

export default TableDatas;
