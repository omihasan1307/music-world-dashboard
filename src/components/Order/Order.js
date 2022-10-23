import React, { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase.init";
import { AiFillDelete } from "react-icons/ai";

const Order = () => {
  const [order, setOrder] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onSnapshot(
      collection(db, "order"),
      (snapshot) => {
        const getValue = snapshot.docs.map((e) => e.data());
        setOrder(getValue);
        setLoading(true);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const handleRemove = async (id) => {
    await deleteDoc(doc(db, "order", id));
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
        order.map((element) => {
          const { name, email, address, phone, cart, id } = element;

          return (
            <div className="border  m-3 p-3">
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <div className="ms-4">
                    <h3>{name}</h3>
                    <h6>E-mail: {email}</h6>
                    <h6>Phone: {phone}</h6>
                    <p>Address: {address}</p>
                  </div>
                </div>
                <div>
                  {cart.map((item) => {
                    const { id, productName, price } = item.product;
                    return (
                      <div
                        key={item.pId}
                        className="order-item border mb-2 p-2"
                      >
                        <h6>
                          <span className="text-warning">PID:</span> {id}
                        </h6>
                        <p>
                          <span className="text-warning">Name:</span>{" "}
                          {productName}
                        </p>
                        <p>
                          <span className="text-warning">Price:</span> BDT{" "}
                          {price}
                        </p>
                      </div>
                    );
                  })}
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

export default Order;
