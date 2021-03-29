import HouseSchema from '../models/HouseModel';
import UserSchema from '../models/UserModel';

export default {
  async store(req, res) {
    try {
      const { originalname } = req.file;
      const { description, price, location, status } = req.body;
      const { user_id } = req.headers;

      const house = await HouseSchema.create({
        user: user_id,
        thumbnail: originalname,
        description,
        price,
        location,
        status
      });
      return res.json(house);
    } catch (error) {
      return console.log(`House Post error: ${error}`);
    }
  },

  async index(req, res) {
    try {
      const houseData = await HouseSchema.find();
      res.send(houseData);
    } catch (error) {
      return console.log(`House Get error: ${error}`);
    }
  },

  async destroy(req, res) {
    try {
      const { house_id } = req.body;
      const { user_id } = req.headers;

      const user = await UserSchema.findById(user_id);
      const houses = await HouseSchema.findById(house_id);

      if (String(user.id) !== String(houses.user)) {
        return res.status(400).json({ error: 'Nao autorizado!!!' });
      }

      await HouseSchema.findByIdAndDelete({ _id: house_id });

      return res.send('House delete sucessful');
    } catch (error) {
      return console.log(`House Delete error: ${error}`);
    }
  }
};
