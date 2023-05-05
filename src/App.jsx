import  React, { useEffect, useRef, useState } from "react";

const App = () => {
  const [users, setUsers] = useState([]);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const formRef = useRef(null);
  useEffect(() => {
    fetch("http://localhost:3000/user")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const user = { name, email };

    fetch("http://localhost:3000/user", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const newUsers = [...users, data];
        setUsers(newUsers);
        formRef.current.reset();
      });
  };
  return (
    <div>
      <h1>Users Management System</h1>
      <h3>Numbers of Users: {users.length}</h3>
      <form ref={formRef} onSubmit={handleSubmit}>
        <input type="text" ref={nameRef} id="" placeholder="name" required />
        <br />
        <br />
        <input type="email" ref={emailRef} placeholder="email" />
        <br />
        <br />
        <input type="submit" value="Add User" />
      </form>
      {users.map((user) => (
        <p key={user.id}>
          {user.id} : {user.name} : {user.email}
        </p>
      ))}
    </div>
  );
};

export default App;
