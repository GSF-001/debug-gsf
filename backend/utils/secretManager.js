export async function getPeppers() {
  const peppers = [];

  if (process.env.PEPPER_PRIMARY) {
    peppers.push(process.env.PEPPER_PRIMARY);
  }

  if (process.env.PEPPER_FALLBACK) {
    peppers.push(process.env.PEPPER_FALLBACK);
  }

  return peppers;
}
