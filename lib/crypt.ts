import crypto from 'crypto';

const SECRET_KEY = process.env.CRYPTO_KEY
const IV = process.env.CRYPTO_IV;

export function encrypt(content: string): string {
    try {
        const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(SECRET_KEY, 'utf8'), IV);
        let encrypted = cipher.update(content, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    } catch (error) {
        console.error('Encryption error:', error);
        throw new Error('Encryption error');
    }
}

export function decrypt(content: string): string {
    try {
        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(SECRET_KEY, 'utf8'), IV);
        let decrypted = decipher.update(content, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    } catch (error) {
        console.error('Decryption error:', error);
        throw new Error('Decryption error');
    }
}