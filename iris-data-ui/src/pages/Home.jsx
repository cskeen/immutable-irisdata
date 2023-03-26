import React, {useCallback} from 'react';
import {useFetchAllIrisData, seedData} from "../data/services/iris-service";
import {Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useQueryClient} from "@tanstack/react-query";


const Home = () => {
    const queryClient = useQueryClient()
    const fetchedDataObject = useFetchAllIrisData()

    console.log(fetchedDataObject.data)

    const seedIrisData = useCallback(() => {
        seedData()
        queryClient.invalidateQueries({ queryKey: ['AllIrisData'] })

    }, [queryClient])

    if (fetchedDataObject.isError){
        return (
                <div>
                    Error Loading Data
                </div>
        )
    }

   return (
      <div>
         <h1>Iris ML data</h1>
          <Stack direction={"row"}>
              <Button variant="contained" onClick={seedIrisData}>Seed</Button>
          </Stack>
          <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="iris table">
                  <TableHead>
                      <TableRow>
                          <TableCell>id</TableCell>
                          <TableCell align="right">Iris Class</TableCell>
                          <TableCell align="right">Petal Length</TableCell>
                          <TableCell align="right">Petal Width</TableCell>
                          <TableCell align="right">Sepal Length</TableCell>
                          <TableCell align="right">Sepal Width</TableCell>
                          <TableCell align="right">Data Type</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {fetchedDataObject.data?.map((row) => (
                              <TableRow
                                  key={row.id}
                                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                  >
                                  <TableCell component="th" scope="row">
                                      {row.id}
                                  </TableCell>
                                  <TableCell align="right">{row.irisClass}</TableCell>
                                  <TableCell align="right">{row.petalLength}</TableCell>
                                  <TableCell align="right">{row.petalWidth}</TableCell>
                                  <TableCell align="right">{row.sepalLength}</TableCell>
                                  <TableCell align="right">{row.sepalWidth}</TableCell>
                                  <TableCell align="right">{row.trainingData ? "Training" : "Validation"}</TableCell>
                              </TableRow>
                              ))}
                  </TableBody>
              </Table>
          </TableContainer>
      </div>
   )
}

export default Home;