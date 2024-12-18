import { ServiceModel } from "../../../api/services/services.model.js";
import { CategoryModel } from '../../../api/categories/categories.model.js'
import { ImagesServiceModel } from '../../../api/imagesServices/imagesServices.model.js'

CategoryModel.hasMany(ServiceModel, {
  foreignKey: 'categoryId',
  as: 'services'
});

ServiceModel.belongsTo(CategoryModel, {
  foreignKey: 'categoryId',
  as: 'category'
});

ServiceModel.hasMany(ImagesServiceModel, {
  foreignKey: 'serviceId',
  as: 'services'
});

ImagesServiceModel.belongsTo(ServiceModel, {
  foreignKey: 'serviceId',
  as: 'images'
});

export { ServiceModel, CategoryModel, ImagesServiceModel };