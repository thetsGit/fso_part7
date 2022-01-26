import React from "react";
import { Link } from "react-router-dom";

const Users = ({ users }) => {
  0;
  console.log(users, "______________-");
  return (
    <div className="container">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>name</th>
            <th>num of blogs</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link key={user.id} to={`${user.id}`}>
                  {user.username}
                </Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
