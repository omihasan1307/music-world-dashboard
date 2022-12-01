import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase.init";

const Users = () => {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        const getValue = snapshot.docs.map((e) => e.data());
        setUsers(getValue);
        setLoading(true);
      },
      (error) => {
        alert(error);
      }
    );
  }, []);

  return (
    <div className="common-line">
      {loading === false ? (
        <div className="d-flex justify-content-center align-items-center h-100">
          <div className="spinner-grow" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        ""
      )}
      {loading === true &&
        users.map((elements) => {
          const { name, email } = elements;

          return (
            <div key={elements.id} className="border  m-3 p-3">
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <div className="ms-4">
                    <h3>{name}</h3>
                    <h6> {email}</h6>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Users;
