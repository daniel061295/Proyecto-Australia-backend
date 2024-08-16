import cors from 'cors';

const ACCEPTED_ORIGINS = [
  '*'
];

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
  origin: (origin, callback) => {
    // console.log(origin);
    if (acceptedOrigins.includes(origin) || acceptedOrigins.includes('*')) {
      return callback(null, true);
    }

    if (!origin) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  }
});
