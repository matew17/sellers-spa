import { sellers_constants } from './../../utils/constants/sellers.constants';
import api from './../axios/axios.config';

export default class SellersService {

  static addSeller(data) {
    return api.post(
      sellers_constants.baseUrl,
      data
    );
  }

  static deleteSeller(id, data) {
    return api.delete(`${sellers_constants.baseUrl}${id}`, {
      data
    });
  }

  /**
   * Get all roles to display drop down
   */
  static getRoles() {
    return api.get(sellers_constants.rolesApi);
  }

  static getSellers() {
    return api.get(sellers_constants.baseUrl);
  }

  static updateSeller(data, id) {
    return api.put(
      `${sellers_constants.baseUrl}${id}`,
      data
    );
  }
}
