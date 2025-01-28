process.loadEnvFile();
export const {
  DATABASE_NAME = 'australia_wm',
  USERNAME_DB = 'root',
  PASSWORD_DB = 'wmsas2012',
  HOSTNAME_DB = '192.168.0.55',
  PORT_DB = 3306,
  DIALECT_DB = 'mariadb',
  SECRET_JWT_KEY = 'secret',
  PORT = 8080,
  FOLDERID = '1EyfoZhACPERPF4aAVzIHAmx5jJYlWhEU',
  GOOGLE_API_CLIENT_ID = '677838455952-mnud60j5b5m2ve386o9hdne34l863oqt.apps.googleusercontent.com',
  GOOGLE_API_CLIENT_SECRET = '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',
  GOOGLE_API_REDIRECT_URI = 'https://developers.google.com/oauthplayground',
  REFRESH_TOKEN = '1//04A_XmNTh3IkdCgYIARAAGAQSNwF-L9IroSfxRtgKgm3VFshW2WRqnTvIocZvFEBmmoYoWJgiLfmhBWks-ksWCZ0_3FuKu_XhId4'
} = process.env;
