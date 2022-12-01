import React, { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase.init";
import OrderDetails from "../OrderDetails/OrderDetails";

const Order = () => {
  const [users, setUsers] = useState();
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onSnapshot(
      collection(db, "userList"),
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
    await deleteDoc(doc(db, "order", id));
    await deleteDoc(doc(db, "paymentInfo", id));
  };

  const handleUserOrder = async (userId) => {
    onSnapshot(
      collection(db, `order/${userId}/userOrder`),
      (snapshot) => {
        const getValue = snapshot.docs.map((e) => e.data());
        setOrder(getValue);
      },
      (error) => {
        console.log(error);
      }
    );
  };

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
        users.map((element) => (
          <OrderDetails
            orderDetail={element}
            handleUserOrder={handleUserOrder}
            order={order}
          />
        ))}
    </div>
  );
};

export default Order;
