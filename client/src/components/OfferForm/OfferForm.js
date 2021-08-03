import React, {useState} from "react";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import CONTANTS from "../../constants";
import { setOffer, clearAddOfferError } from "../../actions/actionCreator";
import Schems from "../../validators/validationSchems";
import ImageUpload from "../InputComponents/ImageUpload/ImageUpload";
import Error from "../../components/Error/Error";
import Input from "../Input";
import styles from "./OfferForm.module.sass";

let contestType;

const OfferForm = (props) => {
    const [file, setFile] = useState(null)
  const validationSchema =
    contestType === CONTANTS.LOGO_CONTEST
      ? Schems.LogoOfferSchema
      : Schems.TextOfferSchema;

  const renderOfferInput = () => {
    if (props.contestType === CONTANTS.LOGO_CONTEST) {
      return (
        <ImageUpload
          name="offerData"
          component={ImageUpload}
          classes={{
            uploadContainer: styles.imageUploadContainer,
            inputContainer: styles.uploadInputContainer,
            imgStyle: styles.imgStyle,
          }}
          setFile={setFile}
        />
      );
    } else {
      return (
        <Input
          name="offerData"
          classes={{
            container: styles.inputContainer,
            input: styles.input,
            warning: styles.fieldWarning,
            notValid: styles.notValid,
          }}
          type="text"
          label="your suggestion"
        />
      );
    }
  };

  const setOffer = (values, formikBag) => {
    props.clearOfferError();
    const data = new FormData();
    const { contestId, contestType, customerId } = props;
    console.log(contestId, contestType, customerId,file )
    data.append("contestId", contestId);
    data.append("contestType", contestType);
    data.append("offerData",  contestType === CONTANTS.LOGO_CONTEST ? file : values.offerData);
    data.append("customerId", customerId);
    console.log(data.get('offerData'));
    props.setNewOffer(data);
    formikBag.resetForm();
  };

  contestType = props.contestType;
  const { addOfferError, clearOfferError } = props;
  return (
    <Formik
      onSubmit={setOffer}
      initialValues={{
        offerData: "",
      }}
      validationSchema={validationSchema}
    >
      <div className={styles.offerContainer}>
        {addOfferError && (
          <Error
            data={addOfferError.data}
            status={addOfferError.status}
            clearError={clearOfferError}
          />
        )}
        <Form className={styles.form}>
          {renderOfferInput()}

          <button type="submit" className={styles.btnOffer}>
            Send Offer
          </button>
        </Form>
      </div>
    </Formik>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNewOffer: (data) => dispatch(setOffer(data)),
    clearOfferError: () => dispatch(clearAddOfferError()),
  };
};

const mapStateToProps = (state) => {
  const { addOfferError } = state.contestByIdStore;
  return { addOfferError };
};

export default connect(mapStateToProps, mapDispatchToProps)(OfferForm);
