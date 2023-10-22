export default (sequelize, DataTypes) => {
    const SharedNote = sequelize.define("shared_notes", {
    },{
			underscored: true,
		});
    return SharedNote;
  };