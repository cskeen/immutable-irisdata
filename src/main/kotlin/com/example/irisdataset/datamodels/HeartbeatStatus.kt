package com.example.irisdataset.datamodels

import java.time.ZonedDateTime

data class HeartbeatStatus(
    val appUp: Boolean = true,
    val timestamp: ZonedDateTime = ZonedDateTime.now()
)
