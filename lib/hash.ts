import crypto from 'crypto';

export function hashing(content: string): string {
    return crypto.createHash('sha256').update(content).digest('hex');
}
