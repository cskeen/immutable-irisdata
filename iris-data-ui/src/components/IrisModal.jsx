import React from "react";
import { Modal, TextField, Button, Box, Stack, Typography, Grid, Switch } from "@mui/material";
import { useForm, Controller } from "react-hook-form";

const IrisModal = ( {openModal, handleModalState, mutation} ) => {

   const {
      control,
      handleSubmit,
      formState: { errors }
   } = useForm();

   const onSubmit = (data) => {
      mutation.mutate(data)
      handleModalState(false)
   }

   const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
   };

   return (
      <Modal
         open={openModal}
      >
         <Box sx={style}>
            <Typography variant={'h3'}>Iris Data</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={1}>
               <Controller
                  name="irisClass"
                  control={control}
                  render={({ field }) =>
                  <TextField
                     {...field}
                     variant="outlined" 
                     errors={errors}
                     label={"Iris Class"}
                     name={"irisClass"}
                     />}
                  />
                  <Controller
                     name="petalLength"
                     control={control}
                     render={({ field }) =>
                        <TextField
                           {...field}
                           variant="outlined" 
                           errors={errors}
                           label={"Petal Length"}
                           name={"petalLength"}
                        />}
                  />
                  <Controller
                     name="petalWidth"
                     control={control}
                     render={({ field }) =>
                        <TextField
                           {...field}
                           variant="outlined" 
                           errors={errors}
                           label={"Petal Width"}
                           name={"petalWidth"}
                        />}
                  />
                  <Controller
                     name="sepalLength"
                     control={control}
                     render={({ field }) =>
                        <TextField
                           {...field}
                           variant="outlined" 
                           errors={errors}
                           label={"Sepal Length"}
                           name={"sepalLength"}
                        />}
                  />
                  <Controller
                     name="sepalWidth"
                     control={control}
                     render={({ field }) =>
                        <TextField 
                           {...field}
                           variant="outlined" 
                           errors={errors}
                           label={"Sepal Width"}
                           name={"sepalWidth"}
                        />}
                  />
                  <Grid component="label" container alignItems="center" spacing={1}>
                     <Grid item>Validation</Grid>
                     <Grid item>
                     <Controller
                        name="trainingData"
                        control={control}
                        render={({ field }) =>
                        <Switch
                           {...field}
                        />}
                        />
                     </Grid>
                     <Grid item>Trainning</Grid>
                  </Grid>
               </Stack>
               <Stack direction={"row"} justifyContent={"flex-end"}>
                  <Button as="button" type="submit">
                     Save
                  </Button>
                  <Button onClick={() => handleModalState(false)}>
                     Cancel
                  </Button>
               </Stack>
            </form>
         </Box>
      </Modal>
   )
}

export default IrisModal;