import React, { useEffect, useState } from "react";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase.init";

const Contact = () => {
  const [contact, setContact] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onSnapshot(
      collection(db, "contact"),
      (snapshot) => {
        const getValue = snapshot.docs.map((e) => e.data());
        setContact(getValue);
        setLoading(true);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

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
        contact.map((element) => {
          const { name, email, message, time, userId } = element;
          return (
            <div className="border m-3 p-3">
              <h1>{name}</h1>
              <h6>{email}</h6>
              <p>{message}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Contact;
