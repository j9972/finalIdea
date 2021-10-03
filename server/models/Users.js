module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    identifyString: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Users.associate = models => {
    Users.hasMany(models.Posts, {
      onDelete: 'cascade',
    });
  };
// connect User with posts 

  return Users;
};

// Users 라는 데이터 테이블 username, identifyString, password 라는 column이름에 datatype, allowNull, unique 값은 속성(?)을 부여
