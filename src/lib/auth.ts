// src/lib/auth.ts (Node environment usage, do NOT import in the middleware)
import { createSessionInDB, findSessionInDB, deleteSessionInDB } from "./sessionDb";
import { serializeSessionCookie } from "./cookieUtils";

/**
 * Generate a random hex token using the Web Crypto API.
 * e.g. 30 bytes => 60 hex characters.
 */
function generateToken(lengthInBytes: number): string {
  const randomBytes = new Uint8Array(lengthInBytes);
  crypto.getRandomValues(randomBytes);
  return Array.from(randomBytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

/** 
 * Create a session doc in the DB for the userId, returning the random token.
 */
export async function createSession(userId: string): Promise<string> {
  const token = generateToken(30);
  await createSessionInDB(userId, token);
  return token;
}

/** 
 * For verifying the token -> userId, used in server components or route handlers.
 */
export async function getUserIdByToken(token: string): Promise<string | null> {
  const session = await findSessionInDB(token);
  return session ? session.userId : null;
}

/** 
 * For sign-out: remove the session doc from the DB.
 */
export async function destroySession(token: string): Promise<void> {
  await deleteSessionInDB(token);
}

/** 
 * Export the cookie serialization from cookieUtils. 
 */
export { serializeSessionCookie };
