import { doc, updateDoc } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { db } from "../../firebase.init";

const OrderDetails = ({ orderDetail, handleUserOrder, order }) => {
  const [viewOrder, setViewOrder] = useState([]);
  useEffect(() => {
    order.map((e) => setViewOrder(e));
  }, [viewOrder, order]);

  const { name, email, userId } = orderDetail;

  const confirmOrder = async (uid, orderId) => {
    await updateDoc(doc(db, `order/${uid}/userOrder`, orderId), {
      status: true,
    });
  };

  const completeOrder = async (uid, orderId) => {
    await updateDoc(doc(db, `order/${uid}/userOrder`, orderId), {
      processing: false,
    });
  };
  return (
    <div className="border  m-3 p-3">
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <div className="ms-4">
            <h3>{name}</h3>
            <h6>E-mail: {email}</h6>
          </div>
        </div>
        <button
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          className="btn btn-success"
          onClick={() => handleUserOrder(userId)}
        >
          View Order
        </button>
      </div>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5 text-success " id="exampleModalLabel">
                Order Details
              </h1>
            </div>
            <div class="modal-body text-dark">
              <div className="row">
                <div className="col-12 col-md-4">
                  <h4 className="text-primary">{viewOrder.name}</h4>
                  <h6>
                    <span className="text-primary">Address:</span>{" "}
                    {viewOrder.address}
                  </h6>
                  <h6>
                    <span className="text-primary">Email:</span>{" "}
                    {viewOrder.email}
                  </h6>
                  <h6>
                    <span className="text-primary">Phone:</span>{" "}
                    {viewOrder.phone}
                  </h6>
                  <h6>
                    <span className="text-primary">Time:</span>{" "}
                    {viewOrder.time?.split(
                      "GMT+0600 (Bangladesh Standard Time)"
                    )}
                  </h6>
                  <h6>
                    <span className="text-primary">Paid:</span> BDT{" "}
                    {viewOrder.paid}
                  </h6>
                  {viewOrder.processing && (
                    <button
                      className={
                        viewOrder.status
                          ? "btn btn-success me-3"
                          : "btn btn-danger me-3"
                      }
                      onClick={() =>
                        confirmOrder(viewOrder.uid, viewOrder.orderId)
                      }
                    >
                      {viewOrder.status ? "Processing" : "Pending"}
                    </button>
                  )}
                  {viewOrder.status && (
                    <button
                      className="btn btn-success"
                      onClick={() =>
                        completeOrder(viewOrder.uid, viewOrder.orderId)
                      }
                    >
                      {viewOrder.status && "Complete"}
                    </button>
                  )}
                </div>
                <div className="col-12 col-md-8">
                  {viewOrder.cart?.map((e) => (
                    <div className="shadow p-3 mb-3 bg-body rounded">
                      <h5 className="text-danger">{e.product.productName}</h5>
                      <h6>Category: {e.product.category}</h6>
                      <h6>Price: BDT {e.product.price}</h6>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
