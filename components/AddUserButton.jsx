import styles from "../styles/Add.module.css";

const AddUserButton = ({ setClose }) => {
  return (
    <div onClick={() => setClose(false)} className={styles.mainAddButton}>
      Add New User
    </div>
  );
};

export default AddUserButton;
