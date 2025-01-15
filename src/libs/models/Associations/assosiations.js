import { ServiceModel } from "../../../api/services/services.model.js";
import { CategoryModel } from '../../../api/categories/categories.model.js'
import { ImagesServiceModel } from '../../../api/imagesServices/imagesServices.model.js'
import { MeetingModel } from "../../../api/meetings/meetings.model.js";
import { ClientModel } from "../../../api/clients/clients.model.js";
import { DateModel } from '../../../api/dates/dates.model.js'
import { ScheduleModel } from "../../../api/schedules/schedules.model.js";

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

MeetingModel.belongsTo(ClientModel, {
  foreignKey: 'clientId',
  as: 'client'
});
ClientModel.hasMany(MeetingModel, {
  foreignKey: 'clientId',
  // as: 'clients'
});

DateModel.hasMany(ScheduleModel, {
  foreignKey: 'idDate',
  onDelete: 'CASCADE'
});
ScheduleModel.belongsTo(DateModel, {
  foreignKey: 'idDate',
  as: 'date',
});

export { ServiceModel, CategoryModel, ImagesServiceModel, MeetingModel, ClientModel, DateModel, ScheduleModel };