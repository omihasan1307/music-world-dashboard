import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";

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

  const handleRemove = async (id) => {
    await deleteDoc(doc(db, "users", id));
  };

  return (
    <div className="common-line">
      {loading === false ? (
        <div className="d-flex justify-content-center align-items-center h-100">
          <div class="spinner-grow" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        ""
      )}
      {loading === true &&
        users.map((elements) => {
          const { name, email, id } = elements;

          return (
            <div className="border  m-3 p-3">
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <div className="ms-4">
                    <h3>{name}</h3>
                    <h6> {email}</h6>
                  </div>
                </div>
                <AiFillDelete
                  onClick={() => handleRemove(id)}
                  className="my-auto delete-btn me-3"
                />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Users;
