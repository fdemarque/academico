import bcrypt from 'bcryptjs';

export async function hashPassword(password: string): Promise<string> {
    const rounds = Number(process.env.BCRYPT_COST || '10');
    const salt = await bcrypt.genSalt(rounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

export async function comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    const result = await bcrypt.compare(password, hashedPassword);
    return result;
}
