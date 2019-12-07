import 'react-toastify/dist/ReactToastify.min.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import * as Yup from 'yup';
import React from 'react';

import './add-seller.component.scss';
import sellerService from './../../../../api/sellers/sellers.service';

class AddSeller extends React.Component {
  history;
  seller;
  sellersSchema;

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      roles: [],
      editState: null
    };

    this.history = this.props.history;
  }

  componentDidMount() {
    if (
      this.history &&
      this.history.location &&
      this.history.location.state
    ) {
      this.setState({
        editState: this.history.location.state,
        isEditMode: true
      });
    }

    this.getRoles();
  }

  createSeller(values, setSubmitting) {
    sellerService.addSeller(values)
      .then(({ data }) => {
        console.log(data);
        toast.success("Seller was created successfully !", {
          position: toast.POSITION.BOTTOM_RIGHT
        });
        this.goBack(3001);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Oh no, an error ocurred creating the seller !", {
          position: toast.POSITION.BOTTOM_RIGHT
        });
        this.goBack(3001);
      })
      .finally(() => {
        setSubmitting(true);
      });
  }

  getRoles() {
    sellerService.getRoles()
      .then(res => {
        this.setInitialvalues();
        this.setState({
          roles: res.data,
          isLoading: false
        });
      })
      .catch(err => console.log(err));
  };

  goBack() {
    this.history.push('/');
  }

  setInitialvalues() {
    const seller = this.state.editState || null;

    this.setState({
      initialValues: {
        nit: seller && seller.nit || '',
        name: seller && seller.name || '',
        lastname: seller && seller.lastname || '',
        phone: seller && seller.phone || '',
        address: seller && seller.address || '',
        role: seller && seller.roles || '',
      }
    });

    this.setSchema();
  }

  setSchema() {
    this.sellersSchema = Yup.object().shape({
      nit: Yup.string()
        .required('Nit is Required')
        .max(15),
      name: Yup.string()
        .required('Name is Required'),
      lastname: Yup.string()
        .required('Lastname is Required'),
      phone: Yup.number('Phone must be a number')
        .required('Phonne is Required')
        .positive('Phone number must be a positive number')
        .max(9999999999),
      address: Yup.string()
        .required('Address is Required'),
      role: Yup.string()
    });

    if (!this.state.isEditMode) {
      this.sellersSchema = Yup.object().shape({
        role: Yup.string().required('Role is required')
      });
    }
  }

  submit(values, { setSubmitting }) {
    if (this.state.isEditMode) {
      this.updateSeller(values, setSubmitting);
    } else {
      this.createSeller(values, setSubmitting);
    }
  }

  updateSeller(values, setSubmitting) {
    delete values.role;

    sellerService.updateSeller(values, this.state.editState.id)
      .then(({ data }) => {
        console.log(data);
        toast.success("Seller was updated successfully !", {
          position: toast.POSITION.BOTTOM_RIGHT
        });
        this.goBack();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Oh no, an error ocurred creating the seller !", {
          position: toast.POSITION.BOTTOM_RIGHT
        });
        this.goBack();
      })
      .finally(() => {
        setSubmitting(true);
      });
  }

  render() {
    return (
      <section className="add-seller content">
        <div className=" header">
          <button
            className="back-link"
            onClick={() => this.goBack()}>
            {`<-`}Go Back
          </button>
          <h1 className="title">
            Create Form
          </h1>
        </div>

        {
          !this.state.isLoading ?
            (
              <div className="form">
                <Formik
                  initialValues={{ ...this.state.initialValues }}
                  validationSchema={this.sellersSchema}
                  onSubmit={(values, { setSubmitting }) => this.submit(values, { setSubmitting })}>
                  {({ errors, isSubmitting }) => (
                    <Form>
                      {
                        !this.state.isEditMode ?
                          (
                            <div className="field">
                              <label htmlFor="role">Role:</label>
                              <div className="input-container">
                                <Field as="select" name="role" placeholder="role" >
                                  <option>Select an Role</option>
                                  {this.state.roles.map((role) => <option value={role._id}>{role.name}</option>)}
                                </Field>
                                <ErrorMessage className="error" name="role" component="div" />
                              </div>
                            </div>
                          ) : ''
                      }
                      <div className="field">
                        <label htmlFor="Nit">Nit:</label>
                        <div className="input-container">
                          <Field type="nit" name="nit" placeholder="nit" />
                          <ErrorMessage className="error" name="nit" component="div" />
                        </div>
                      </div>

                      <div className="field">
                        <label htmlFor="name">Name:</label>
                        <div className="input-container">
                          <Field type="name" name="name" placeholder="name" />
                          <ErrorMessage className="error" name="name" component="div" />
                        </div>
                      </div>

                      <div className="field">
                        <label htmlFor="lastname">Lastname:</label>
                        <div className="input-container">
                          <Field type="lastname" name="lastname" placeholder="lastname" />
                          <ErrorMessage className="error" name="lastname" component="div" />
                        </div>
                      </div>

                      <div className="field">
                        <label htmlFor="phone">Phone:</label>
                        <div className="input-container">
                          <Field type="phone" name="phone" placeholder="phone" />
                          <ErrorMessage className="error" name="phone" component="div" />
                        </div>
                      </div>

                      <div className="field">
                        <label htmlFor="address">Address:</label>
                        <div className="input-container">
                          <Field type="address" name="address" placeholder="address" />
                          <ErrorMessage className="error" name="address" component="div" />
                        </div>
                      </div>

                      <button
                        className="submit-button"
                        type="submit"
                        disabled={isSubmitting || !(Object.keys(errors).length === 0)}>
                        Submit
                    </button>
                    </Form>
                  )}
                </Formik>
              </div>
            ) :
            (
              <div>Loading... </div>
            )
        }
      </section>
    );
  }
};

export default withRouter(AddSeller);
