import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase.init";
import { AiFillDelete } from "react-icons/ai";
import noImage from "../../image/noImage.jpg";

const ViewProduct = () => {
  const [view, setView] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onSnapshot(
      collection(db, "products"),
      (snapshot) => {
        const getValue = snapshot.docs.map((e) => e.data());
        setView(getValue);
        setLoading(true);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const handleRemove = async (id) => {
    await deleteDoc(doc(db, "products", id));
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
        view.map((element) => {
          const { productName, price, img, category, id } = element;
          return (
            <div className="border  m-3 p-3">
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <img
                    src={
                      img.match(
                        /^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim
                      ) != null
                        ? img
                        : noImage
                    }
                    alt=""
                    className="w-25"
                  />
                  <div className="ms-4">
                    <h3>{productName}</h3>
                    <h6>Price: {price}</h6>
                    <p>Category: {category}</p>
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

export default ViewProduct;
