import axios from "axios";
import { useState } from "react";
import styles from "../../styles/Admin.module.css";
import AddUserButton from "../../components/AddUserButton";
import AddUser from "../../components/AddUser";


const Users = ({ users }) => {
    const [close, setClose] = useState(true);
    const [userList, setUserList] = useState(users);
    const handleDelete = async (id) => {
        console.log(id);
        try {
            const res = await axios.delete(
                "http://localhost:3000/api/users/" + id
            );
            setUserList(pizzaList.filter((pizza) => pizza._id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>

            <div className={styles.item}>
                <h1 className={styles.title}>Users</h1>
                <table className={styles.table}>
                    <tbody>
                        <tr className={styles.trTitle}>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Username</th>
                        </tr>
                    </tbody>
                    {userList.map((user) => (
                        <tbody key={user._id}>
                            <tr className={styles.trTitle}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>
                                    <button
                                        className={styles.button}
                                        onClick={() => handleDelete(user._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>
            {<AddUserButton setClose={setClose} />}
            {!close && <AddUser setClose={setClose} />}
        </div>
    );
};

export const getServerSideProps = async (ctx) => {
    const myCookie = ctx.req?.cookies || "";

    if (myCookie.token !== process.env.TOKEN) {
        return {
            redirect: {
                destination: "/admin/login",
                permanent: false,
            },
        };
    }

    const users = await axios.get("http://localhost:3000/api/users");

    return {
        props: {
            users: users.data,
        },
    };
};

export default Users;
