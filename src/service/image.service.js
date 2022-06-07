import database from '../model/index';

const Image = database.image;

const create = async (data, transaction = null) => {
	const image = await Image.create(data, { transaction });
	return image;
};

// eslint-disable-next-line import/prefer-default-export
export default { create };
