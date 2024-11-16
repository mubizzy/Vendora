// module.exports = (obj, keysToExclude) => {
//   return Object.fromEntries(
//     Object.entries(obj).filter(([key]) => !keysToExclude.includes(key)),
//   );
// };

module.exports = (obj, keysToExclude) => {
  const excludeSet = new Set(keysToExclude);
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !excludeSet.has(key)),
  );
};
