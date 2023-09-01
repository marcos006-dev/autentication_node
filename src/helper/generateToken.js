import jwt from 'jsonwebtoken';

export const generateToken = (user) => {

    const payload = {
        id: user.id,
        name: user.name,
    };

    const keyPrivateKey = process.env.SECRET;

    const token = jwt.sign(payload, keyPrivateKey);
    return token;
}