export function isValidEmail(email: string): boolean {
  // Basic RFC 5322 email regex (good balance of accuracy and readability)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

export function isValidPhone(phone: string): boolean {
  // Accepts numbers, optional country code, spaces, dashes, parentheses
  const phoneRegex = /^\+?[\d\s\-().]{7,}$/;
  return phoneRegex.test(phone.trim());
}
