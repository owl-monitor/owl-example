export const bodyParserConfig = {
  extended: true,
  json: {
    limit: '10mb'
  }
};

export const cookieParserConfig = {
  secret: 'secret-owl-secret'
};

export const loggerConfig = {
  format: 'short'
};

export const connectionDatabaseUrl: string = 'mongodb://localhost/owl';
