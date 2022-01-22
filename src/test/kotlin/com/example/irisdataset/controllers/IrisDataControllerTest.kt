package com.example.irisdataset.irisdataset

import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.web.reactive.server.WebTestClient;
import com.example.irisdataset.datamodels.Iris
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebFlux;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.junit.jupiter.api.extension.ExtendWith;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureWebTestClient
class IrisDataControllerTest() {

    @Autowired
    lateinit var testClient: WebTestClient

	@Test
    fun testHeartbeatEndpoint() {

        testClient.get()
            .uri("/api/v1/irisdata/heartbeat/")
            .exchange()
            .expectStatus().isOk()
            .expectBody()
            .jsonPath("$.appUp").isEqualTo(true)

    }

    @Test
    fun test

}