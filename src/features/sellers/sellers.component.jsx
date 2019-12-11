import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer, toast } from 'react-toastify';
import React from 'react';
import { withRouter } from 'react-router-dom';

import './sellers.component.scss';
import sellerService from './../../api/sellers/sellers.service';
import SellersList from './components/SellersList/sellers-list.component';

class Sellers extends React.Component {
  history;

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      sellers: []
    };

    this.history = this.props.history;
  }

  componentDidMount() {
    this.getSellers();
  }

  deleteSeller(data) {
    let seller = {
      penalty: data.penalty,
      role: data.roleID,
      active: !data.activeToggle
    };

    sellerService.deleteSeller(data.id, seller)
      .then((res) => {
        toast.success("Seller was deactivated successfully !", {
          position: toast.POSITION.BOTTOM_RIGHT
        });
        setTimeout(() => {
          this.getSellers();
        }, 3000);
      })
      .catch((err) => {
        toast.error("Oh no, an error ocurred deactivatings the seller !", {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      });
  }

  getSellers() {
    this.setState({
      isLoading: true
    });

    sellerService.getSellers()
      .then(res => {
        this.setState({
          isLoading: false,
          sellers: res.data
        });
      })
      .catch(err => {
        toast.error("Oh no, an error ocurred loading sellers !", {
          position: toast.POSITION.BOTTOM_RIGHT
        });
        this.setState({
          isLoading: false
        });
      });
  };

  goToCreate() {
    this.history.push('/add-seller');
  }

  render() {
    return (
      <section className="sellers">
        <h1 className="title">Sellers</h1>
        {this.state.isLoading ?
          (
            <div>loading</div>
          ) :
          (
            <div>
              <button className="add-button" onClick={() => this.goToCreate()}>
                <i className="material-icons add-icon">add</i>
              </button>
              <div className="list-container">
                {this.state.sellers.length >= 1 ?
                  (
                    <SellersList sellers={this.state.sellers} deleteSeller={(id) => this.deleteSeller(id)} />
                  ) :
                  (
                    <div className="no-sellers">
                      There are not Sellers to display
                  </div>
                  )
                }
              </div>
            </div>
          )
        }
        <ToastContainer />
      </section>
    );
  }
};

export default withRouter(Sellers);
