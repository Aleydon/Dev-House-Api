import * as yup from 'yup';

import HouseSchema from '../models/HouseModel';
import UserSchema from '../models/UserModel';

export default {
  // Set validation
  async store(req, res) {
    const schema = yup.object().shape({
      description: yup.string().required(),
      price: yup.number().required(),
      location: yup.string().required(),
      status: yup.boolean().required()
    });

    try {
      const { originalname } = req.file;
      const { description, price, location, status } = req.body;
      const { user_id } = req.headers;

      // Check if all fields are valid
      if (!(await schema.isValid(req.body))) {
        console.log(req.body);
        return res.status(400).json({ error: 'House Validation failed' });
      }

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

  // Get houses with filter true or false
  async index(req, res) {
    try {
      const { status } = req.headers;
      const houseData = await HouseSchema.find({ status });
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
        return res.status(400).json({ error: 'Unauthorized acess!!!' });
      }

      await HouseSchema.findByIdAndDelete({ _id: house_id });

      return res.send('House delete sucessful');
    } catch (error) {
      return console.log(`House Delete error: ${error}`);
    }
  },

  async update(req, res) {
    const schema = yup.object().shape({
      thumbnail: yup.string().required(),
      description: yup.string().required(),
      price: yup.number().required(),
      location: yup.string().required(),
      status: yup.boolean().required()
    });

    try {
      const { house_id } = req.params;
      const { originalname } = req.file;
      const { description, price, location, status } = req.body;
      const { user_id } = req.headers;

      // Check if all fields are valid
      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation failed' });
      }

      const user = await UserSchema.findById(user_id);
      const houses = await HouseSchema.findById(house_id);

      if (String(user.id) !== String(houses.user)) {
        return res.status(400).json({ error: 'Unauthorized acess!!!' });
      }

      const houseUpdate = await HouseSchema.updateOne(
        { _id: house_id },
        {
          user: user_id,
          description,
          price,
          location,
          status,
          thumbnail: originalname
        }
      );
      return res.send(`House Updated ${houseUpdate}`);
    } catch (error) {
      return console.log(`Update error ${error}`);
    }
  }
};
