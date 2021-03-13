import UserSchema from '../models/User.model';

export default {
  async index(req, res) {
    const users = await UserSchema.find();
    return res.send(users);
  },

  async store(req, res) {
    try {
      const { name, email } = req.body;
      const user = await UserSchema.findOne({ email });

      if (!user) {
        const newUser = await UserSchema.create({
          name,
          email,
        });
        return res.send(newUser);
      }
      return res.send(user);
    } catch (err) {
      console.log(err);
    }
    return console.log('Okay');
  },

  async destroy(req, res) {
    try {
      const { id } = req.params;
      await UserSchema.findByIdAndDelete({ _id: id });
      return res.send('User deleted');
    } catch (error) {
      return console.log(`User delete error ${error}`);
    }
  },
};
