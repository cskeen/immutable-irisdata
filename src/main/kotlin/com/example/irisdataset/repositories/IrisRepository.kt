package com.example.irisdataset.repositories

import com.example.irisdataset.datamodels.Iris
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface IrisRepository : CrudRepository<Iris, String>