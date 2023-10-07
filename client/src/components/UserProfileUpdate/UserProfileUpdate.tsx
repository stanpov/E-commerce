import React, { useState } from "react";
import { motion } from "framer-motion";
import { CLable } from "../common/CLabel/CLabel";
import { CInput } from "../common/CInput/CInput";
import { CInputImage } from "../common/CInputImage/CInputImage";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { userInfo } from "../../Redux/User/UserSlice";
import { getUserId } from "../../Redux/Auth/AuthSlice";
import { useNavigate } from "react-router-dom";
import { UpdateUserProfile } from "../../interfaces/interfaces";
import { updateProfile } from "../../Redux/User/UserActions";
import "./UserProfileUpdate.scss";
import { uploadToCloudinary } from "../../Utils/Utils";

interface UserProfileUpdateProps {
  setIsUpdate: (updata: boolean) => void;
}

export const UserProfileUpdate: React.FC<UserProfileUpdateProps> = ({
  setIsUpdate,
}) => {
  const [isUsernameValid, setIsUsernameValid] = useState({
    isValid: true,
    message: "",
  });
  const [isPhoneValid, setIsPhoneValid] = useState({
    isValid: true,
    message: "",
  });
  const [isAddressValid, setIsAddressValid] = useState({
    isValid: true,
    message: "",
  });
  const [image, setImage] = useState<any>();
  const user = useAppSelector(userInfo);
  const userId = useAppSelector(getUserId);
  const [username, setUsername] = useState(user.userName);
  const [phone, setPhone] = useState(user.phoneNumber);
  const [address, setAddress] = useState(user.deliveryAddress);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const saveHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const dataFile = new FormData();
    dataFile.append("file", image);
    dataFile.append("upload_preset", "unsigned_upload");
    dataFile.append("cloud_name", "doyrxbbu7");
    uploadToCloudinary(dataFile)
      .then((response) => {
        const data: UpdateUserProfile = {
          userId: userId,
          userData: {
            userImage: response.data.secure_url,
            userName: username,
            phoneNumber: phone,
            deliveryAddress: address,
          },
        };
        dispatch(updateProfile(data));
        setIsUpdate(false);
        navigate("/");
      })
      .catch((e) => {
        setIsUpdate(false);
      });
  };

  const imageChangeHandler = (e: React.ChangeEvent): void => {
    e.preventDefault();
    const input = e.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }
    const file = input.files[0];
    setImage(file);
  };

  const onChangeUsernameHandler = (e: React.ChangeEvent): void => {
    const target = e.target as HTMLInputElement;
    setUsername(target.value);
  };

  const onChangePhoneHandler = (e: React.ChangeEvent): void => {
    const target = e.target as HTMLInputElement;
    setPhone(target.value);
  };
  const onChangeAddressHandler = (e: React.ChangeEvent): void => {
    const target = e.target as HTMLInputElement;
    setAddress(target.value);
  };

  const onBlurHandlerUsername = (
    e: React.FocusEvent<HTMLInputElement>
  ): void => {
    if (e.target.value === "") {
      setIsUsernameValid({ isValid: false, message: "Username is required!" });
    } else if (e.target.value.length < 5) {
      setIsUsernameValid({
        isValid: false,
        message: "Username needs to be at least 5 characters long!",
      });
    } else {
      setIsUsernameValid({ isValid: true, message: "" });
    }
  };

  const onBlurHandlerPhone = (e: React.FocusEvent<HTMLInputElement>): void => {
    if (e.target.value === "") {
      setIsPhoneValid({ isValid: false, message: "Phone is required!" });
    } else if (e.target.value.length < 10 && e.target.value) {
      setIsPhoneValid({ isValid: false, message: "Invalid phone number!" });
    } else {
      setIsPhoneValid({ isValid: true, message: "" });
    }
  };

  const onBlurHandlerAddress = (
    e: React.FocusEvent<HTMLInputElement>
  ): void => {
    if (e.target.value === "") {
      setIsAddressValid({ isValid: false, message: "Address is required!" });
    } else {
      setIsAddressValid({ isValid: true, message: "" });
    }
  };

  return (
    <motion.article
      variants={{
        start: { opacity: 0, scale: 0.8 },
        end: { opacity: 1, scale: 1 },
      }}
      initial="start"
      animate="end"
      transition={{ duration: 1.3, delay: 0.2 }}
      className="update__card"
    >
      <h2 className="update__card__title">update your profile</h2>
      <section className="update__card__content">
        <form
          onSubmit={saveHandler}
          className="update__card__content__information"
        >
          <section className="update__card__content__image">
            <div className="update__card__content__image__wrapper">
              <div className="update__card__content__image__inside">
                {user.userImage ? (
                  <img src={user.userImage} alt="" />
                ) : (
                  <img
                    src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png"
                    alt=""
                  />
                )}
              </div>
              <CInputImage onChange={(e) => imageChangeHandler(e)} />
            </div>
          </section>
          <ul className="update__card__content__information__list">
            <li className="update__card__content__information__list__item">
              <CLable inputId={"username"} title={"Username"} />
              <CInput
                type={"text"}
                name={"username"}
                id={"username"}
                value={username}
                placeholder="john-green"
                onBlur={onBlurHandlerUsername}
                onChange={onChangeUsernameHandler}
                required
              />
              {isUsernameValid ? (
                <p
                  className="update__card__error__message"
                  data-testid="validation-message"
                >
                  {isUsernameValid.message}
                </p>
              ) : null}
            </li>
            <li className="update__card__content__information__list__item">
              <CLable inputId={"phone"} title={"Phone number"} />
              <CInput
                type={"number"}
                name={"phone"}
                id={"phone"}
                value={phone}
                placeholder="8474341122"
                onBlur={onBlurHandlerPhone}
                onChange={onChangePhoneHandler}
                required
              />
              {isPhoneValid ? (
                <p
                  className="update__card__error__message"
                  data-testid="validation-message"
                >
                  {isPhoneValid.message}
                </p>
              ) : null}
            </li>
            <li className="update__card__content__information__list__item">
              <CLable inputId={"address"} title={"Delivery address"} />
              <CInput
                type={"text"}
                name={"address"}
                id={"address"}
                value={address}
                placeholder="332, My Street, Kingston"
                onBlur={onBlurHandlerAddress}
                onChange={onChangeAddressHandler}
                required
              />
              {isAddressValid ? (
                <p
                  className="update__card__error__message"
                  data-testid="validation-message"
                >
                  {isAddressValid.message}
                </p>
              ) : null}
            </li>
            <input type="submit" className="save__button" value={"Save"} />
          </ul>
        </form>
      </section>
      {/* <button onClick={saveHandler} className='save__button'>save</button> */}
    </motion.article>
  );
};
