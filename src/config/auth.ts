export const tokenSecret = process.env.TOKEN_SECRET;
export const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
export const tokenExpiresIn = '1m';
export const refreshTokenExpiresIn = '1d';

export const auth = {
  tokenSecret,
  refreshTokenSecret,
  tokenExpiresIn,
  refreshTokenExpiresIn,
};
