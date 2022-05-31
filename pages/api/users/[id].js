import dbConnect from "../../../util/mongo";
import User from "../../../models/User";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
    cookies
  } = req;
  const token = cookies.token

  dbConnect();

  if (method === "GET") {
    try {
      const user = await User.findById(id);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "PUT") {
    if(!token || token !== process.env.token){
      return res.status(401).json("Not authenticated!")
    }
    try {
      const user = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "DELETE") {
    if(!token || token !== process.env.token){
      return res.status(401).json("Not authenticated!")
    }
    try {
      await User.findByIdAndDelete(id);
      res.status(200).json("The user has been deleted!");
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
