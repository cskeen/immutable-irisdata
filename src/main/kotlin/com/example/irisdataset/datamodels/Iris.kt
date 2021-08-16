package com.example.irisdataset.datamodels

import org.springframework.data.annotation.Id
import org.springframework.data.redis.core.RedisHash
import java.util.*

@RedisHash("Iris")
data class Iris(
    @Id
    val id: UUID = UUID.randomUUID(),
    val sepalLength: Float,
    val sepalWidth: Float,
    val petalLength: Float,
    val petalWidth: Float,
    val irisClass: String,
    var trainingData: Boolean = true
)
