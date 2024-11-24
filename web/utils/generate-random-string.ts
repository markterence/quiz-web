export function generateRandomString(lengthBytes = 6) {
  let text = '';
  const possible
      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < lengthBytes; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
