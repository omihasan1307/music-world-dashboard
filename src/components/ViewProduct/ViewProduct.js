import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase.init";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import noImage from "../../image/noImage.jpg";

const ViewProduct = () => {
  const [view, setView] = useState();
  const [update, setUpdate] = useState({});
  const [loading, setLoading] = useState(false);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productAbout, setProductAbout] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productVideo, setProductVideo] = useState("");
  const [productCategory, setProductCategory] = useState("");

  const handleNameBlur = (event) => {
    setProductName(event.target.value);
  };
  const handlePriceBlur = (event) => {
    setProductPrice(event.target.value);
  };
  const handleAboutBlur = (event) => {
    setProductAbout(event.target.value);
  };
  const handleImageBlur = (event) => {
    setProductImage(event.target.value);
  };
  const handleVideoBlur = (event) => {
    setProductVideo(event.target.value);
  };
  const handleCategoryBlur = (event) => {
    setProductCategory(event.target.value);
  };

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

  const handleEditProduct = async (id) => {
    onSnapshot(
      collection(db, "products"),
      (snapshot) => {
        const getValue = snapshot.docs.map((e) => e.data());
        const selectItem = getValue.find((e) => e.id === id);
        setUpdate(selectItem);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleUpdate = async (id) => {
    if (productName === "" || productPrice === "" || productAbout === "") {
      alert("Please input your field");
    } else {
      await updateDoc(doc(db, "products", id), {
        productName: productName,
        price: productPrice,
        productAbout: productAbout,
      });
      alert("Update Successfull. 😍");
    }
  };

  // console.log(update);

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
                <div className="d-flex w-100">
                  <img
                    src={
                      img.match(
                        /^http[^?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim
                      ) != null
                        ? img
                        : noImage
                    }
                    alt={img}
                    className="w-25"
                  />
                  <div className="ms-4">
                    <h3>{productName}</h3>
                    <h6>Price: {price}</h6>
                    <p>Category: {category}</p>
                  </div>
                </div>

                <AiFillEdit
                  onClick={() => handleEditProduct(id)}
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  className="my-auto delete-btn me-3"
                />

                <AiFillDelete
                  onClick={() => handleRemove(id)}
                  className="my-auto delete-btn me-3"
                />

                <div
                  class="modal fade text-dark"
                  id="exampleModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">
                          Update your product information
                        </h1>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <input
                          onBlur={handleNameBlur}
                          type="text"
                          placeholder={update.productName}
                          className="input-filed border"
                          required
                        />
                        <br />
                        <input
                          onBlur={handlePriceBlur}
                          type="text"
                          placeholder={update.price}
                          className="input-filed border"
                          required
                        />
                        <br />
                        <input
                          onBlur={handleAboutBlur}
                          type="text"
                          placeholder={update.productAbout}
                          className="input-filed border"
                          required
                        />
                        {/* <input
                          onBlur={handleImageBlur}
                          type="text"
                          placeholder={update.img}
                          className="input-filed border"
                        /> */}
                        {/* <br />
                        <input
                          onBlur={handleVideoBlur}
                          type="text"
                          placeholder={update.video}
                          className="input-filed border"
                        /> */}
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-danger"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          onClick={() => handleUpdate(update.id)}
                          type="button"
                          class="btn btn-success"
                          data-bs-dismiss="modal"
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ViewProduct;
