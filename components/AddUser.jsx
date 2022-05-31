import { useState } from "react";
import styles from "../styles/Add.module.css";
import axios from "axios";
import { useRouter } from "next/router";

const AddUser = ({ setClose }) => {

    const [name, setName] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [email, setEmail] = useState(null);
    const [error, setError] = useState(false);


    const handleCreate = async () => {
        setError(validate());
        try {
            if (!error) {
                const newUser = {
                    name,
                    username,
                    password,
                    email,
                };

                await axios.post("http://localhost:3000/api/users", newUser);
                setClose(true);
                window.location.reload();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const validate = () => {
        const nameValidation = validateName();
        if (nameValidation) {
            return nameValidation;
        }

        const usernameValidation = validateUsername();
        if (usernameValidation) {
            return usernameValidation;
        }

        const passwordValidation = validatePassword();
        if (passwordValidation) {
            return passwordValidation;
        }

        const emailValidation = validateEmail();
        if (emailValidation) {
            return emailValidation;
        }
    }

    const validateName = () => {
        if (name === null) {
            return 'Name is required'
        }

        if (name.length < 3) {
            return 'Name must be at least 3 characters'
        }
    }

    const validateUsername = () => {
        if (username === null) {
            return 'Username is required'
        }

        if (username.length < 3) {
            return 'Username must be at least 3 characters'
        }
    }

    const validateEmail = () => {
        if (email === null) {
            return 'Email is required'
        }
        const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegEx.test(email)) {
            return 'Email is not valid'
        }
    }


    const validatePassword = () => {
        if (password === null) {
            return 'Password is required'
        }

        if (password.length < 8) {
            return 'Password must be at least 8 characters'
        }

        if (password.length > 16) {
            return 'Password must be less than 16 characters'
        }
    }


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
                        data-cy="sign-up-name"
                    />
                </div>
                <div className={styles.item}>
                    <label className={styles.label}>Username</label>
                    <input
                        className={styles.input}
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                        data-cy="sign-up-username"
                    />
                </div>
                <div className={styles.item}>
                    <label className={styles.label}>Email</label>
                    <input
                        className={styles.input}
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                        data-cy="sign-up-email"
                    />
                </div>
                <div className={styles.item}>
                    <label className={styles.label}>Password</label>
                    <input
                        className={styles.input}
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        data-cy="sign-up-password"

                    />
                </div>
                {
                    error ?
                        <p>{error}</p> : null
                }
                <button className={styles.addButton} onClick={handleCreate}>
                    Create
                </button>
            </div>
        </div>
    );
};

export default AddUser;
