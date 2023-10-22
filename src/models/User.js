export default (sequelize, DataTypes) => {
	const User = sequelize.define(
		"users",
		{
			first_name: {
				type: DataTypes.STRING,
			},
			last_name: {
				type: DataTypes.STRING,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					notEmpty: true,
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					notEmpty: true,
				},
			},
			is_active: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
			last_login: {
				type: DataTypes.DATE,
			},
		},
		{
			underscored: true,
		}
	);
	return User;
};
