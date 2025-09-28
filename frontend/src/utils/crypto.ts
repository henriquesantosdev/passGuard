const base64Encode = (buffer: ArrayBuffer) => {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
}

const base64Decode = (base64: string) => {
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for(let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes.buffer
}

async function deriveKey(masterPassword: string, salt: Uint8Array): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(masterPassword),
    'PBKDF2',
    false,
    ['deriveKey']
  );

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

export async function encryptPassword(password: string, masterPassword: string): Promise<string> {
  const encoder = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const key = await deriveKey(masterPassword, salt);
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoder.encode(password)
  );

  const encryptedData = base64Encode(encrypted);
  const ivBase64 = base64Encode(iv.buffer);
  const saltBase64 = base64Encode(salt.buffer);

  return `${saltBase64}:${ivBase64}:${encryptedData}`;
}

export async function decryptPassword(encryptedString: string, masterPassword: string): Promise<string> {
  const [saltB64, ivB64, dataB64] = encryptedString.split(':');
  const salt = new Uint8Array(base64Decode(saltB64));
  const iv = new Uint8Array(base64Decode(ivB64));
  const encryptedData = base64Decode(dataB64);

  const key = await deriveKey(masterPassword, salt);
  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    encryptedData
  );

  return new TextDecoder().decode(decrypted);
}
