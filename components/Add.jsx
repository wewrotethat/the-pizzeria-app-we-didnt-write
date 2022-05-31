import { useState } from "react";
import styles from "../styles/Add.module.css";
import axios from "axios";
import { useRouter } from "next/router";

const Add = ({ setClose, existingProduct }) => {

  const [file, setFile] = useState(existingProduct.img);
  const [title, setTitle] = useState(existingProduct.title);
  const [desc, setDesc] = useState(existingProduct.desc);
  const [prices, setPrices] = useState(existingProduct.prices ?? []);
  const [extraOptions, setExtraOptions] = useState(existingProduct.extraOptions ?? []);
  const [extra, setExtra] = useState(null);

  const changePrice = (e, index) => {
    const currentPrices = prices;
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  };

  const handleExtraInput = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };

  const handleExtra = (e) => {
    setExtraOptions((prev) => [...prev, extra]);
  };

  const handleCreate = async () => {
    console.log('add called')
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "c5jzgilk");
    try {
      if (!existingProduct) {

        const uploadRes = await axios.post(
          `https://api.cloudinary.com/v1_1/yabsra/image/upload`,
          data
        );

        const { url } = uploadRes.data;
        const newProduct = {
          title,
          desc,
          prices,
          extraOptions,
          img: url
        };

        await axios.post("http://localhost:3000/api/products", newProduct);
        setClose(true);
        window.location.reload();
      } else {
        const updatedProduct = {
          title,
          desc,
          prices,
          extraOptions,
          img: file,
        };

        await axios.put(`http://localhost:3000/api/products/${existingProduct._id}`, updatedProduct);
        setClose(true);
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span onClick={() => setClose(true)} className={styles.close}>
          X
        </span>
        {
          existingProduct ?
            <h1>Edit Product</h1> :
            <h1>Add a new Pizza</h1>
        }
        {
          !existingProduct ?
            <div className={styles.item}>
              <label className={styles.label}>Choose an image</label>
              <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            </div> : null
        }
        <div className={styles.item}>
          <label className={styles.label}>Title</label>
          <input
            className={styles.input}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            defaultValue={title}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Desc</label>
          <textarea
            rows={4}
            type="text"
            onChange={(e) => setDesc(e.target.value)}
            defaultValue={desc}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Prices</label>
          <div className={styles.priceContainer}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Small"
              onChange={(e) => changePrice(e, 0)}
              defaultValue={prices[0]}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Medium"
              onChange={(e) => changePrice(e, 1)}
              defaultValue={prices[1]}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Large"
              onChange={(e) => changePrice(e, 2)}
              defaultValue={prices[2]}
            />
          </div>
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Extra</label>
          <div className={styles.extra}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="text"
              placeholder="Item"
              name="text"
              onChange={handleExtraInput}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Price"
              name="price"
              onChange={handleExtraInput}
            />
            <button className={styles.extraButton} onClick={handleExtra}>
              Add
            </button>
          </div>
          <div className={styles.extraItems}>
            {extraOptions.map((option) => (
              <span key={option.text} className={styles.extraItem}>
                {option.text}
              </span>
            ))}
          </div>
        </div>
        <button className={styles.addButton} onClick={handleCreate}>
          {existingProduct ? 'Update' : 'Create'}
        </button>
      </div>
    </div>
  );
};

export default Add;
