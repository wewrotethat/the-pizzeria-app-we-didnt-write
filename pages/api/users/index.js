import dbConnect from "../../../util/mongo";
import User from "../../../models/User";

export default async function handler(req, res) {
  const { method, cookies } = req;

  const token = cookies.token

  dbConnect();

  if (method === "GET") {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "POST") {
    if(!token || token !== process.env.token){
      return res.status(401).json("Not authenticated!")
    }
    try {
      
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
