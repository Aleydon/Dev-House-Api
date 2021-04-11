import HouseSchema from '../models/HouseModel';
import ReserveSchema from '../models/HouseReserveModel';
import UserSchema from '../models/UserModel';

export default {
  async store(req, res) {
    // Get user id, house id and create reserve
    const { house_id } = req.params;
    const { user_id } = req.headers;
    const { data } = req.body;

    const reserve = await ReserveSchema.create({
      user: user_id,
      house: house_id,
      data
    });
    await reserve.populate('house').populate('user').execPopulate();

    return res.json(reserve);
  }
};
