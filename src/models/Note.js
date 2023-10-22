export default (sequelize, DataTypes) => {
	const Note = sequelize.define(
		"notes",
		{
			title: {
				type: DataTypes.STRING,
			},
			content: {
				type: DataTypes.STRING,
			},
			user_id: {
				type: DataTypes.INTEGER,
				references: {
					model: "users",
					key: "id",
				},
			},
		},
		{
			underscored: true,
		}
	);
	return Note;
};
