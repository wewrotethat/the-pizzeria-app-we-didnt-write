import { useState } from "react";
import styles from "../styles/Add.module.css";
import axios from "axios";
import { useRouter } from "next/router";

const AddUser = ({ setClose }) => {

    const [name, setName] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [email, setEmail] = useState(null);


    const handleCreate = async () => {
        console.log('add called')
        try {
            const newUser = {
                name,
                username,
                password,
                email,
            };

            await axios.post("http://localhost:3000/api/users", newUser);
            setClose(true);
            window.location.reload();
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
                <h1>Add a new user</h1>
                <div className={styles.item}>
                    <label className={styles.label}>Name</label>
                    <input
                        className={styles.input}
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className={styles.item}>
                    <label className={styles.label}>Username</label>
                    <input
                        className={styles.input}
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className={styles.item}>
                    <label className={styles.label}>Email</label>
                    <input
                        className={styles.input}
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className={styles.item}>
                    <label className={styles.label}>Password</label>
                    <input
                        className={styles.input}
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}

                    />
                </div>
                <button className={styles.addButton} onClick={handleCreate}>
                    Create
                </button>
            </div>
        </div>
    );
};

export default AddUser;
