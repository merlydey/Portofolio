// firebase helper removed — kept as placeholder to avoid import errors if referenced accidentally.
export const REMOVED_FIREBASE_HELPER = true;

export async function logout() {
  await fbSignOut(auth);
}

export { auth };
