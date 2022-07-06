import React, { useState, useRef, useEffect } from 'react'
import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Container,
  Modal,
  Box,
} from '@mui/material'
import { Formik, Form } from 'formik'
import CreatableSelect, { useCreatable } from 'react-select/creatable'
import Select from 'react-select'
import axios from 'axios'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'

export default function AddItem() {
  const [upload, setUpload] = useState('')
  const [tags, setTags] = useState([])
  const [open, setOpen] = useState(false)
  const cropperRef = useRef(null)
  const [croppedImg, setCroppedImg] = useState('')

  useEffect(() => {
    async function getTags() {
      const response = await axios({
        method: 'GET',
        url: 'http://localhost:8080/tags',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      setTags(response.data)
      console.log(tags)
      console.log(colourOptions)
    }
    getTags()
  }, [])

  useEffect(() => {
    console.log('LOADING TAGS')
    let list = []
    tags.map((tag) => {
      list = [...list, { value: tag.tag, label: tag.tag }]
    })
    tagList = list
    console.log('LOADED')
    console.log(list)
    console.log(tagList)
  }, [tags])

  let tagList = []

  const onCrop = () => {
    const imageElement = cropperRef?.current
    const cropper = imageElement?.cropper
    setCroppedImg(cropper.getCroppedCanvas().toDataURL())
    handleClose()
  }

  const handleTags = (newValue, actionMeta) => {
    console.group('Value Changed')
    console.log(newValue)
    console.log(`new: ${newValue[newValue.length - 1].label}`)
    console.log(`action: ${actionMeta.action}`)
    console.groupEnd()
  }

  const handleOpen = () => {
    setOpen(true)
    console.log('open')
  }
  const handleClose = () => {
    setOpen(false)
    console.log('close')
  }

  function cropImage(image) {
    //TODO: This needs to bring up the crop modal
    setUpload(URL.createObjectURL(image))
    console.log(URL.createObjectURL(image))
    handleOpen()
  }

  //TODO: Replace this with a table in the database of all the tags ever made
  const colourOptions = [
    { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
    { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
    { value: 'purple', label: 'Purple', color: '#5243AA' },
    { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
    { value: 'orange', label: 'Orange', color: '#FF8B00' },
    { value: 'yellow', label: 'Yellow', color: '#FFC400' },
    { value: 'green', label: 'Green', color: '#36B37E' },
    { value: 'forest', label: 'Forest', color: '#00875A' },
    { value: 'slate', label: 'Slate', color: '#253858' },
    { value: 'silver', label: 'Silver', color: '#666666' },
  ]

  return (
    <Container component="main" className="content">
      <CssBaseline />

      <Modal open={open} onClose={handleClose}>
        <Box className="modal">
          <Cropper
            className="cropper"
            src={upload}
            style={{ maxHeight: 600, maxWidth: 800 }}
            guides={false}
            ref={cropperRef}
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            responsive={true}
            autoCropArea={1}
            aspectRatio={4 / 3}
            checkOrientation={false}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className="cropper"
            onClick={() => onCrop()}
          >
            Crop
          </Button>
          <img src={croppedImg} style={{ maxHeight: 400, maxWidth: 300 }} />
        </Box>
      </Modal>

      <div className="paper">
        <Typography component="h1" variant="h5">
          Add New Product
        </Typography>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
          }}
          onSubmit={(values) => {
            console.log(values)
          }}
        >
          {({ errors, handleChange, touched }) => (
            <Form className="form">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    error={errors.firstName && touched.firstName}
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    id="firstName"
                    label="First Name"
                    autoFocus
                    helperText={
                      errors.firstName && touched.firstName
                        ? errors.firstName
                        : null
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    error={errors.lastName && touched.lastName}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    helperText={
                      errors.lastName && touched.lastName
                        ? errors.lastName
                        : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={errors.email && touched.email}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    helperText={
                      errors.email && touched.email ? errors.email : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={errors.password && touched.password}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    helperText={
                      errors.password && touched.password
                        ? errors.password
                        : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <label htmlFor="parent">Parent:</label>
                  <Select options={colourOptions} />
                </Grid>
                <Grid item xs={12}>
                  <label htmlFor="category">Category:</label>
                  <CreatableSelect options={colourOptions} />
                </Grid>
                <Grid item xs={12}>
                  <label htmlFor="tags">Tags:</label>
                  <CreatableSelect
                    isMulti
                    onChange={handleTags}
                    options={tags.map((tag) => {
                      return {
                        value: tag.tag,
                        label: tag.tag,
                      }
                    })}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button variant="contained" component="label">
                    Upload File
                    <input
                      type="file"
                      onChange={(e) => {
                        cropImage(e.target.files[0])
                      }}
                      hidden
                    />
                  </Button>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <img
                    src={croppedImg}
                    style={{ maxHeight: 400, maxWidth: 300 }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className="submitBtn"
                    onClick={() => handleOpen()}
                  >
                    Add Item
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  )
}
