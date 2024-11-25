const dbConfig = {
    HOST: 'localhost',
    USER: 'root',
    // PASSWORD: 'Nesh@123',
    //DB: 'dms_new_master',
    PASSWORD: 'Appadmin@123',
    DB: 'test',
    dialect: 'mysql',
  
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  };

  export default dbConfig;