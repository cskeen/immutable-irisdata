import React, {useCallback, useState} from 'react';
import {useFetchAllIrisData, seedData, useFetchValidationData, useFetchTrainningData} from "../data/services/iris-service";
import {Button, Container, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useQueryClient} from "@tanstack/react-query";
import IrisModal from '../components/IrisModal';
import { CSVLink } from 'react-csv';


const Home = () => {
    const queryClient = useQueryClient()
    const fetchedDataObject = useFetchAllIrisData()
    const [openModal, setOpenModal] = useState(false)
    const [downloadData, setDownloadData] = useState('')
    const fetchedValidationData = useFetchValidationData()
    const fetchedTrainningData = useFetchTrainningData()

    const seedIrisData = useCallback(() => {
        seedData()
        queryClient.invalidateQueries({ queryKey: ['AllIrisData'] })
    }, [queryClient])

    const downloadValidationData = useCallback(() => {
        fetchedValidationData.refetch()
        const download = fetchedValidationData.data
        setDownloadData(download)
    },[fetchedValidationData])

    const downloadTrainningData = useCallback(() => {
        fetchedTrainningData.refetch()
        const download = fetchedTrainningData.data
        setDownloadData(download)
    },[fetchedTrainningData])

    if (fetchedDataObject.isError){
        return (
            <div>
                Error Loading Data
            </div>
        )
    }

    const headers = [
        { label: "Id", key: "id" },
        { label: "Iris Class", key: "irisClass" },
        { label: "Petal Length", key: "petalLength" },
        { label: "Petal Width", key: "petalWidth" },
        { label: "Sepal Length", key: "sepalLength" },
        { label: "Sepal Width", key: "sepalWidth" },
        { label: "Trainning Data", key: "trainingData" }
    ];

    // console.log(fetchedTrainningData.data)

    return (
        <div>
            <Container maxWidth={'lg'}>
                <IrisModal openModal={openModal} handleModalState={setOpenModal}/>
                <h1>Iris ML data</h1>
                <Stack direction={"row"} spacing={2} justifyContent={"space-around"} sx={{marginBottom:'2rem'}}>
                    <Button variant="contained" onClick={seedIrisData}>Seed Iris Data</Button>
                    <Button variant="contained" onClick={() => setOpenModal(!openModal)}>Add Iris Data</Button>
                    <CSVLink data={downloadData} headers={headers} filename='trainningIrisData.csv' style={{'textDecoration': 'none'}}>
                        <Button variant='contained' onClick={downloadTrainningData}>Extract Trainning Data</Button>
                    </CSVLink>
                    <CSVLink data={downloadData} headers={headers} filename='validationIrisData.csv' style={{'textDecoration': 'none'}}>
                        <Button variant='contained' onClick={downloadValidationData}>Extract Validation Data</Button>
                    </CSVLink>
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
            </Container>
        </div>
    )
}

export default Home;