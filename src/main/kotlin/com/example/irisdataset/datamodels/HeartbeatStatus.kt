package com.example.irisdataset.datamodels

import java.time.ZonedDateTime

data class HeartbeatStatus(
    val appUp: Boolean,
    val redisUp: Boolean,
    val timestamp: ZonedDateTime = ZonedDateTime.now()
)
