import * as yup from 'yup';

import UserSchema from '../models/UserModel';

export default {
  // Get users
  async index(req, res) {
    const users = await UserSchema.find();
    return res.send(users);
  },

  // Create User
  async store(req, res) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required()
    });

    try {
      const { name, email } = req.body;

      // Check if all fields are valid
      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Email invalid' });
      }
      // Check if user already
      const user = await UserSchema.findOne({ email });

      if (!user) {
        const newUser = await UserSchema.create({
          name,
          email
        });
        return res.send(newUser);
      }
      return res.send(user);
    } catch (err) {
      console.log(err);
    }
    return console.log('Okay');
  },

  // Delete user
  async destroy(req, res) {
    try {
      const { id } = req.params;
      await UserSchema.findByIdAndDelete({ _id: id });
      return res.send('User deleted');
    } catch (error) {
      return console.log(`User delete error ${error}`);
    }
  },

  // Update user
  async update(req, res) {
    try {
      const { name, email } = req.body;
      const { id } = req.params;
      await UserSchema.findOneAndUpdate(
        { _id: id },
        {
          name,
          email
        }
      );
      return res.send({
        user: 'updated'
      });
    } catch (error) {
      return console.log(`User delete error: ${error}`);
    }
  }
};
