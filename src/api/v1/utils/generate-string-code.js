module.exports = (length = 8) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let couponCode = '';

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < length; i++) {
    couponCode += characters.charAt(
      Math.floor(Math.random() * characters.length),
    );
  }
  return couponCode;
};
