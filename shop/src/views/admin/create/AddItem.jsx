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
  InputAdornment,
  OutlinedInput,
  InputLabel,
  FormControl,
} from '@mui/material'
import { Formik, Form } from 'formik'
import CreatableSelect from 'react-select/creatable'
import axios from 'axios'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'

export default function AddItem() {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedTags, setSelectedTags] = useState('')
  const [upload, setUpload] = useState('')
  const [tags, setTags] = useState([])
  const [category, setCategory] = useState([])
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
      setCategory(response.data)
    }
    getTags()
  }, [])

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

    let list = []
    newValue.map((tag) => (list = [...list, tag.value]))
    setSelectedTags(list)
  }

  const handleCategory = (newValue, actionMeta) => {
    console.group('Value Changed')
    console.log(newValue)
    console.log(`new: ${newValue.label}`)
    console.log(`action: ${actionMeta.action}`)
    console.groupEnd()

    setSelectedCategory(newValue.value)
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
    setUpload(URL.createObjectURL(image))
    console.log(URL.createObjectURL(image))
    handleOpen()
  }

  async function addItem(values) {
    console.log('Values: ' + selectedCategory)
    const response = await axios({
      method: 'POST',
      url: 'http://localhost:8080/add/product',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        name: values.name,
        description: values.description,
        price: values.price,
        category: selectedCategory,
        image: croppedImg,
        tags: selectedTags,
      },
    })
    console.log(response)
  }

  return (
    <Container component="main" className="content">
      <CssBaseline />
      {/** //TODO: Make this a component
       * //TODO: Allow user to edit cropped file, and reupload the same file again
       */}
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
        </Box>
      </Modal>

      <div className="paper">
        <Typography component="h1" variant="h5">
          Add New Product
        </Typography>
        <Formik
          initialValues={{
            name: '',
            price: '',
            description: '',
            categories: [],
          }}
          onSubmit={(values) => {
            console.log(values)
            addItem(values)
          }}
        >
          {({ errors, handleChange, touched }) => (
            <Form className="form">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    error={errors.name && touched.name}
                    autoComplete="name"
                    name="name"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    id="name"
                    label="Name"
                    autoFocus
                    helperText={
                      errors.name && touched.name ? errors.name : null
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="price">Amount</InputLabel>
                    <OutlinedInput
                      name="price"
                      id="price"
                      onChange={handleChange}
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      label="Amount"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="description"
                    fullWidth
                    onChange={handleChange}
                    name="description"
                    id="description"
                    label="Description"
                    multiline
                    rows={4}
                    placeholder="Describe your product"
                  />
                </Grid>
                <Grid item xs={12} sm={6} container spacing={2}>
                  <Grid item xs={12}>
                    <label htmlFor="category">Category:</label>
                    <CreatableSelect
                      name="categories"
                      id="categories"
                      onChange={handleCategory}
                      options={category.map((tag) => {
                        return {
                          value: tag.tag,
                          label: tag.tag,
                        }
                      })}
                    />
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
                </Grid>
                <Grid item xs={12} sm={6} container spacing={2}>
                  <Grid item xs={12} sm={5}>
                    <Button
                      variant="contained"
                      component="label"
                      fullWidth
                      className="uploadBtn"
                    >
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
                  <Grid item xs={12} sm={6}>
                    <img
                      src={croppedImg}
                      style={{ maxHeight: 400, maxWidth: 300 }}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className="submitBtn"
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
