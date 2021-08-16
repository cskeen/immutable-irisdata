package com.example.irisdataset.controllers

import com.example.irisdataset.datamodels.Iris
import com.example.irisdataset.services.IrisDataService
import org.springframework.web.bind.annotation.*
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.util.*

@RestController
@RequestMapping("/api/v1/irisdata")
class IrisDataController(val irisDataService: IrisDataService) {

    @GetMapping("helloflowers")
    fun getHelloFlowers(): Mono<String> {
        return Mono.just("Hello, Flowers")
    }

    @GetMapping("all")
    fun getAllIrises(): Flux<Iris> {
        return irisDataService.getAllIrises()
    }

    @GetMapping("single")
    fun getOneIris(@RequestParam id: String): Mono<Iris> {
        return irisDataService.getSingleIris(id)
    }

    @PutMapping("single")
    fun addNewIris(@RequestBody newIris: Iris): Mono<Iris> {
        return irisDataService.saveSingleIris(newIris)
    }

    @PutMapping("multiple")
    fun addMultipleNewIrises(@RequestBody newIrises: List<Iris>): Flux<Iris> {
        return irisDataService.saveMultipleIrises(newIrises)
    }

    @GetMapping("training")
    fun getTrainingDataSet(): Flux<Iris> {
        return irisDataService.getTrainingSet()
    }

    @GetMapping("validation")
    fun getValidationDataSet(): Flux<Iris> {
        return irisDataService.getValidationSet()
    }

}