import cookie from "cookie";
import User from "../../models/User";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { username, password } = req.body;
      if (username == process.env.ADMIN_USERNAME && password == process.env.ADMIN_PASSWORD) {
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("token", process.env.TOKEN, {
            maxAge: 60 * 60,
            sameSite: "strict",
            path: "/",
          })
        );
        res.status(200).json("Succesfull");
      } else {
        const user = await User.findOne({ username });
        if (
          password === user.password
        ) {
          res.setHeader(
            "Set-Cookie",
            cookie.serialize("token", process.env.TOKEN, {
              maxAge: 60 * 60,
              sameSite: "strict",
              path: "/",
            })
          );
          res.status(200).json("Succesfull");
        } else {
          res.status(400).json("Wrong Credentials!");
        }
      }
    } catch (error) {
      res.status(400).json("Wrong Credentials!");
    }
  }
};

export default handler;
