import React from "react";
const User = ({ user }) => {
  console.log(user);
  return (
    user && (
      <div className="container">
        <h2 className="fs-3 text-capitalize mb-3">{user.username}</h2>
        <ul className="list-group text-white">
          <li className="list-group-item active">blogs</li>

          {user.blogs.map((blog) => (
            <li className="list-group-item text-white" key={blog.id}>
              {blog.title}
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default User;
