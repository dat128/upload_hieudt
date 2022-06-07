const Image = (sequelize, Sequelize) => {
	const ImageSchema = sequelize.define(
		'image',
		{
			id: {
				type: Sequelize.BIGINT(20),
				primaryKey: true,
				allowNull: false,
				autoIncrement: true,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			url: {
				type: Sequelize.TEXT,
				allowNull: false,
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
			del_flag: {
				type: Sequelize.TINYINT(1),
				allowNull: false,
				defaultValue: 0,
			},
		},
		{
			paranoid: true,
			underscored: true,
			underscoredAll: true,
			timestamps: false,
			tableName: 'product',
			freezeTableName: true,
		}
	);
	return ImageSchema;
};
export default Image;
