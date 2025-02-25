import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
            if (err) {
                return res.sendStatus(403); // Forbidden
            }
            (req as any).user = user;
            next();
        });
    } else {
        res.sendStatus(401); // Unauthorized
    }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (user && user.is_admin) {
        next();
    } else {
        res.status(403).json({ message: "Admins only" });
    }
};
