import { useState } from "react";
import styles from "../styles/OrderDetail.module.css";

const OrderDetail = ({ total, createOrder }) => {
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(false);

  const handleClick = () => {
    if (!phone || !address) {
      setError(true);
      return;
    }

    createOrder({ customer, address, total, method: 0 });

  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>You will pay $12 after delivery.</h1>
        <div className={styles.item}>
          <label className={styles.label}>Name Surname</label>
          <input
            placeholder="John Doe"
            type="text"
            className={styles.input}
            onChange={(e) => setCustomer(e.target.value)}
            data-cy='order-detail-name'
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Phone Number</label>
          <input
            type="text"
            placeholder="+1 234 567 89"
            className={styles.input}
            data-cy='order-detail-phone'
            onChange={(e) => setPhone(e.target.value)}

          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Address</label>
          <textarea
            rows={5}
            placeholder="Elton St. 505 NY"
            type="text"
            className={styles.textarea}
            onChange={(e) => setAddress(e.target.value)}
            data-cy='order-detail-address'
          />
        </div>
        {
          error ? <div className={styles.error} data-cy="order-error-text">{"Please enter a valid phone number and address"}</div> : null
        }
        <button className={styles.button} onClick={handleClick}
          data-cy='order-detail-submit'

        >
          Order
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;
