import { withRouter } from 'react-router-dom';
import MaterialTable from 'material-table'
import React from 'react';

import './sellers-list.component.scss';

class SellersList extends React.Component {
  history;

  constructor(props) {
    super(props);
    this.state = {};

    this.history = this.props.history;
  }

  componentDidMount() {
    this.formatSellers();
  }

  editSeller(e, data) {
    this.history.push(`/add-seller`, data);
  }

  formatSellers() {
    const sellersListFormated = [];

    this.props.sellers.forEach(element => {
      sellersListFormated.push({
        nit: element.nit,
        name: element.name,
        lastname: element.lastname,
        phone: element.phone,
        address: element.address,
        role: element.role.name,
        comission: this.getComission(element.comission),
        active: element.active ? 'Active' : 'Inactive',
        activeToggle: element.active,
        id: element._id,
        roleID: element.role._id,
        penalty: element.penalty
      });
    });

    this.setState({
      sellers: sellersListFormated
    });
  }

  getComission(comission) {
    let percentage = comission * 100;

    return `${percentage}%`;
  }

  render() {
    return (
      <section className="sellers-list content">
        <MaterialTable
          className="table"
          columns={[
            { title: "Nit", field: "nit" },
            { title: "Name", field: "name" },
            { title: "Lastname", field: "lastname" },
            { title: "Phone", field: "phone", type: "numeric" },
            { title: "Address", field: "address" },
            { title: "Role", field: "role" },
            { title: "Comission", field: "comission" },
            { title: "State", field: "active" }
          ]}
          data={this.state.sellers}
          actions={[
            rowData => ({
              icon: rowData.activeToggle ? 'delete' : 'update',
              tooltip: rowData.activeToggle ? 'Delete seller' : 'Activate seller',
              onClick: (e, data) => this.props.deleteSeller(data)
            }),
            {
              icon: 'edit',
              tooltip: 'Edit User',
              onClick: (e, data) => this.editSeller(e, data)
            }
          ]} />
      </section>
    );
  }
}

export default withRouter(SellersList);
