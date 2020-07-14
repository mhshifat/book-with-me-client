import { ErrorMessage } from "@hookform/error-message";
import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Rental } from "../../../../../api/rentals";
import ApiErrors from "../../../../common/ApiErrors";

interface IRentalFormData {
  title: string;
  city: string;
  street: string;
  category: string;
  image: string;
  rooms: string;
  description: string;
  dailyPrice: string;
  phone: string;
  shared: string;
}

const RentalForm = () => {
  const [apiErrors, setApiErrors] = useState<any[] | null>(null);
  const { register, handleSubmit, errors } = useForm<IRentalFormData>();
  const [imageId, setImageId] = useState<string | null>(null);
  const history = useHistory();

  const handleNewRentalFormSubmit = (formData: IRentalFormData) => {
    imageId &&
      Rental.createRental({ ...formData, image: imageId })
        .then(() => {
          history.push("/");
        })
        .catch((errors) => {
          setApiErrors(errors);
        });
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const image = e.target?.files?.[0];
    if (image) {
      const formData = new FormData();
      formData.append("image", image);
      Rental.uploadImage(formData)
        .then((file) => setImageId(file._id))
        .catch((err) =>
          toast.error(
            err[0].message || "Something went wrong, please try again later!"
          )
        );
    }
  };

  return (
    <React.Fragment>
      <form noValidate onSubmit={handleSubmit(handleNewRentalFormSubmit)}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            ref={register({
              required: "Title field is required!",
            })}
          />
          <ErrorMessage
            errors={errors}
            name="title"
            render={({ message }) => (
              <div className="alert alert-danger">
                <div>{message}</div>
              </div>
            )}
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            className="form-control"
            id="city"
            name="city"
            ref={register({
              required: "City field is required!",
            })}
          />
          <ErrorMessage
            errors={errors}
            name="city"
            render={({ message }) => (
              <div className="alert alert-danger">
                <div>{message}</div>
              </div>
            )}
          />
        </div>

        <div className="form-group">
          <label htmlFor="street">Street</label>
          <input
            type="text"
            className="form-control"
            id="street"
            name="street"
            ref={register({
              required: "Street field is required!",
            })}
          />
          <ErrorMessage
            errors={errors}
            name="street"
            render={({ message }) => (
              <div className="alert alert-danger">
                <div>{message}</div>
              </div>
            )}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>

          <select
            className="form-control"
            id="category"
            name="category"
            ref={register({
              required: "Category field is required!",
            })}
          >
            <option value="apartment">Apartment</option>
            <option value="condo">Condo</option>
            <option value="house">House</option>
          </select>
          <ErrorMessage
            errors={errors}
            name="category"
            render={({ message }) => (
              <div className="alert alert-danger">
                <div>{message}</div>
              </div>
            )}
          />
        </div>

        <div className="form-group">
          <label htmlFor="bedrooms">Image</label>
          <input
            type="file"
            className="form-control"
            id="image"
            name="image"
            onChange={handleFileUpload}
            accept=".jpg, .png, .jpeg"
          />
          <ErrorMessage
            errors={errors}
            name="image"
            render={({ message }) => (
              <div className="alert alert-danger">
                <div>{message}</div>
              </div>
            )}
          />
        </div>

        <div className="form-group">
          <label htmlFor="bedrooms">Rooms</label>
          <input
            type="number"
            className="form-control"
            id="numOfRooms"
            name="numOfRooms"
            ref={register({
              required: "Rooms field is required!",
            })}
          />
          <ErrorMessage
            errors={errors}
            name="numOfRooms"
            render={({ message }) => (
              <div className="alert alert-danger">
                <div>{message}</div>
              </div>
            )}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            rows={5}
            className="form-control"
            id="description"
            name="description"
            ref={register({
              required: "Description field is required!",
            })}
          ></textarea>
          <ErrorMessage
            errors={errors}
            name="description"
            render={({ message }) => (
              <div className="alert alert-danger">
                <div>{message}</div>
              </div>
            )}
          />
        </div>

        <div className="form-group">
          <label htmlFor="dailyRate">Daily Price</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <div className="input-group-text">$</div>
            </div>
            <input
              type="number"
              className="form-control"
              id="dailyPrice"
              name="dailyPrice"
              ref={register({
                required: "Price field is required!",
              })}
            />
          </div>
          <ErrorMessage
            errors={errors}
            name="dailyPrice"
            render={({ message }) => (
              <div className="alert alert-danger">
                <div>{message}</div>
              </div>
            )}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            ref={register({
              required: "Phone field is required!",
            })}
          />
          <ErrorMessage
            errors={errors}
            name="phone"
            render={({ message }) => (
              <div className="alert alert-danger">
                <div>{message}</div>
              </div>
            )}
          />
        </div>

        <div className="form-group">
          <label htmlFor="shared">Shared</label>
          <input
            type="checkbox"
            className="d-block"
            id="shared"
            name="shared"
            ref={register()}
          />
        </div>
        <button type="submit" className="btn btn-bwm-main">
          Create
        </button>
      </form>
      <ApiErrors errors={apiErrors || []} />
    </React.Fragment>
  );
};

export default RentalForm;
