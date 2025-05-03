import { Request, Response } from 'express';
import { db } from '../../../src/app/shared/components/mysql/mysql.service';

export default class UserController {
  public static async login(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;

    try {
      const [rows] = await db.query(
        'SELECT * FROM usuarios WHERE username = ? AND password = ?',
        [username, password]
      );

      if ((rows as any[]).length > 0) {
        res.status(200).send('Login exitoso');
      } else {
        res.status(401).send('Credenciales incorrectas');
      }
    } catch (error) {
      res.status(500).send('Error al consultar la base de datos');
    }
  }
}



