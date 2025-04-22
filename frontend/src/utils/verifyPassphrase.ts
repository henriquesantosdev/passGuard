import { decryptPassword } from "./crypto"

export const verifyPassphrase = async (passphraseEncrypted: string, passphrase: string) => {
  try {
    const passphraseVeryfied = await decryptPassword(passphraseEncrypted, passphrase)
    if(passphraseVeryfied) {
      return true
    }
    return false
  } catch {
    return false
  }
}