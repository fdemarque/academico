import jwt from 'jsonwebtoken';
import { User, UserRole } from './types';

interface TokenPayload {
    id: string;
    role: UserRole;
}

export class Authenticator {
    private static readonly JWT_SECRET: string = process.env.JWT_SECRET || 'your-secret';

    public generateToken(user: User): string {
        const payload: TokenPayload = {
            id: user.id,
            role: user.roleUser
        };
        return jwt.sign(payload, Authenticator.JWT_SECRET, { expiresIn: '1h' });
    }

    public getTokenData(token: string): TokenPayload | null {
        try {
            const decodedToken = jwt.verify(token, Authenticator.JWT_SECRET) as TokenPayload;
            return decodedToken;
        } catch (error) {
            return null;
        }
    }

    public validateToken(token: string, requiredRole: UserRole): boolean {
        const tokenData = this.getTokenData(token);
        return !!tokenData && tokenData.role === requiredRole;
    }
}
