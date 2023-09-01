import bcrypt from 'bcrypt';
import { generateToken } from '../helper/generateToken.js';

import User from '../models/User.js';

const auntenticateController = {};

auntenticateController.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = generateToken(user);

    res.status(200).json({ message: 'Usuario logueado correctamente', token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al loguear el usuario' });
  }
};

export default auntenticateController;
