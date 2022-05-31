import styles from "../styles/Add.module.css";

const AddUserButton = ({ setClose }) => {
  return (
    <div
      onClick={() => setClose(false)}
      className={styles.mainAddButton}
      data-cy="add-user-button"
    >
      Add New User
    </div>
  );
};

export default AddUserButton;
