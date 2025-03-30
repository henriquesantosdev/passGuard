export const checkPasswordStrength = (password: string) => {
  let strength = 0;

  if (password.length >= 8) strength++;
  if (password.match(/[a-z]/)) strength++;
  if (password.match(/[A-Z]/)) strength++;
  if (password.match(/[0-9]/)) strength++;
  if (password.match(/[^a-zA-Z0-9]/)) strength++;

  if (strength <= 2) return 'weak'
  if (strength >= 3) return 'strong'
}