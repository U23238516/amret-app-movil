// =================================================
// =================================================

const TokenKey = 'token'

export async function getToken(storage) {
  return await storage.get(TokenKey);
}

export async function setToken(storage, token) {
  return await storage.set(TokenKey, token)
}

export async function removeToken(storage) {
  return await storage.clear(TokenKey)
}

