import React, { useState, useRef, useEffect } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Gender } from '../types/enum';
import { get, post } from '../request/axios';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import toast from 'react-hot-toast';
import AvatarCrop from '../components/avatarCrop';
import { useDispatch } from 'react-redux';
import { reSetAvatar } from '../store/authSlice';
import { ensureTrailingSlash, imageHttpUrlToBase64, isBase64DataURL } from '../utils/stringUtil';
//import 'cropperjs/dist/cropper.min.css';

// Form Validation Rules
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email address cannot be empty'),
  address: Yup.string()
    .max(100, 'The address cannot exceed 100 characters'),
});

// Form data type
interface FormValues {
  id: number;
  userName: string;
  avatar?: string | null;
  email: string;
  phone: string;
  age: number;
  address: string;
  gender: Gender
}




// const validationSchema = Yup.object({
//     userName: Yup.string().required('Username is required'),
//     email: Yup.string().required('Email is required').email('Invalid email'),
//     password: isEdit
//         ? Yup.string() : Yup.string().required('Password is required').min(6, 'Password must be at least 8 characters'),
//     confirmPassword: isEdit
//         ? Yup.string() : Yup.string().required('Confirm Password is required').oneOf([Yup.ref('password')], 'Passwords must match'),
//     age: Yup.number().required('Age is required').positive('Age must be positive').integer('Age must be an integer'),
//     address: Yup.string(),
//     gender: Yup.number().required('Gender is required').oneOf([Gender.other, Gender.male, Gender.female], 'Invalid gender'),
//     //phone: Yup.string().required('Phone is required').matches(/^\d{11}$/, 'Phone must be 11 digits')
// });



const ProfileForm = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [savePreview, setSavePreview] = useState<string | null>(null);


  const [initialValues, setInitialValues] = useState<FormValues>({
    id: 0,
    userName: '',
    avatar: '',
    email: '',
    phone: '',
    age: 0,
    address: '',
    gender: Gender.other
  });


  let user = useSelector((state: RootState) => state.auth.user);

  const dispatch = useDispatch();

  return (
    <Box sx={{ padding: 3 }}>
      <Card>
        <CardHeader title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            {/* Avatar upload area */}
            <Grid item xs={12} md={4}>
              <AvatarCrop imageData={preview || ''} imageDataCallBack={setSavePreview} />
            </Grid>

            {/* form field */}
            <Grid item xs={12} md={8}>
              <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {

        
                  setSubmitting(false);
                }}
              >
                {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => (
                  <Form>
                    <Grid container spacing={2}>

                      <Grid item xs={12}>
                        <TextField
                          name="userName"
                          label="userName"
                          value={values.userName}
                          disabled
                          fullWidth
                          margin="normal"
                          variant="outlined"

                        />

                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          name="email"
                          label="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          error={touched.email && Boolean(errors.email)}
                          helperText={touched.email && errors.email}
                        />

                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          name="phone"
                          label="phone"
                          value={values.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          error={touched.phone && Boolean(errors.phone)}
                          helperText={touched.phone && errors.phone}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          name="age"
                          label="age"
                          value={values.age}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type="number"
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          error={touched.age && Boolean(errors.age)}
                          helperText={touched.age && errors.age}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          name="address"
                          label="address"
                          value={values.address}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          error={touched.address && Boolean(errors.address)}
                          helperText={touched.address && errors.address}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Select
                          name="gender"
                          value={values.gender}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          fullWidth
                          label="Gender"
                        >
                          <MenuItem value={0}>other</MenuItem>
                          <MenuItem value={1}>male</MenuItem>
                          <MenuItem value={2}>female</MenuItem>

                        </Select>
                        {touched.gender && errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
                      </Grid>

                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          disabled={isSubmitting}
                          sx={{ width: '100%', mt: 2 }}
                        >
                          Save
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfileForm;