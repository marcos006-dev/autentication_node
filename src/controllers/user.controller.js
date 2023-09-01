import User from '../models/User.js';
import bcrypt from "bcrypt";

const userController = {};

userController.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
  }
};

userController.postUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password:passwordHash,
    });
    res
      .status(200)
      .json({ message: 'Usuario creado correctamente', data: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al crear el usuario' });
  }
};

userController.putUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const user = await User.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    await user.update({
      name,
      email,
      password,
    });

    res
      .status(200)
      .json({ message: 'Usuario actualizado correctamente', data: user });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: 'Error al actualizar el usuario' });
  }
};

userController.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await User.destroy({
      where: {
        id,
      },
    });

    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al eliminar el usuario' });
  }
};

export default userController;
