import HouseSchema from '../models/HouseModel';

export default {
  async show(req, res) {
    // Get all houses of the logged user
    const { user_id } = req.headers;
    const userHouses = await HouseSchema.find({ user: user_id });
    return res.send(userHouses);
  }
};
