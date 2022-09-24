import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../firebase.init";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productAbout, setProductAbout] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productImage, setProductImage] = useState("");
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
  const handleQuantityBlur = (event) => {
    setProductQuantity(event.target.value);
  };
  const handleImageBlur = (event) => {
    setProductImage(event.target.value);
  };
  const handleCatagoryBlur = (event) => {
    setProductCategory(event.target.value);
  };

  const handleAddProduct = async (event) => {
    event.preventDefault();
    const docRef = await addDoc(collection(db, "products"), {
      productName: productName,
      price: productPrice,
      productAbout: productAbout,
      category: productCategory,
      quantity: productQuantity,
      img: productImage,
    });

    await updateDoc(doc(db, "products", docRef.id), {
      id: docRef.id,
    });

    alert("Product add successfully", window.location.reload());
    setProductName("");
    setProductPrice("");
    setProductAbout("");
    setProductQuantity("");
    setProductCategory("");
    setProductImage("");
  };

  return (
    <div className="common-line">
      <div className="add-product d-flex justify-content-center">
        <div className="p-3 w-75">
          <h1 className="text-center">Add Product</h1>
          <form onSubmit={handleAddProduct}>
            <label htmlFor="text">Name</label>
            <br />
            <input
              onBlur={handleNameBlur}
              type="text"
              placeholder="Product name"
              className="input-filed"
              required
            />
            <br />

            <label htmlFor="text">Price</label>
            <br />
            <input
              onBlur={handlePriceBlur}
              type="text"
              placeholder="Product name"
              className="input-filed"
              required
            />
            <br />

            <label htmlFor="text">About</label>
            <br />
            <input
              onBlur={handleAboutBlur}
              type="text"
              placeholder="Product about"
              className="input-filed"
              required
            />
            <br />

            <label htmlFor="text">Quantity</label>
            <br />
            <input
              onBlur={handleQuantityBlur}
              type="text"
              placeholder="Product quantity"
              className="input-filed"
              required
            />
            <br />

            <label htmlFor="text">Image</label>
            <br />
            <input
              onBlur={handleImageBlur}
              type="text"
              placeholder="Product Image Url"
              className="input-filed"
              required
            />

            <br />

            <label htmlFor="text">Category</label>
            <br />
            <select onBlur={handleCatagoryBlur} className="input-filed">
              <option value="Instrument">Instrument</option>
              <option value="Course">Course</option>
            </select>

            <br />
            <br />
            <input type="submit" value="Add Product" className="input-filed" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
