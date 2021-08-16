package com.example.irisdataset.services

import com.example.irisdataset.datamodels.Iris
import com.example.irisdataset.repositories.IrisRepository
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Service
class IrisDataService(val repository: IrisRepository) {
    fun isValidationSet(): Boolean {
        if ((0..100).random() < 30) {
            return true
        }
        return false
    }

    fun getAllIrises(): Flux<Iris> {
        return Flux.fromIterable(repository.findAll())
    }

    fun saveSingleIris(iris: Iris): Mono<Iris> {
        if (isValidationSet()) {
            iris.trainingData = false
        }
        return Mono.justOrEmpty(repository.save(iris))
    }

    fun saveMultipleIrises(irisList: List<Iris>): Flux<Iris> {
        val partitionedList = irisList.map {
            if (isValidationSet()) {
                it.trainingData = false
            }
            it
        }
        return Flux.fromIterable(repository.saveAll(partitionedList))
    }

    fun getSingleIris(id: String): Mono<Iris> {
        return Mono.justOrEmpty(repository.findById(id))
    }

    fun getPartition(training: Boolean): Flux<Iris> {
        return Flux.fromIterable(repository.findAll().filter { it.trainingData == training})
    }

    fun getTrainingSet(): Flux<Iris> {
        return getPartition(true)
    }

    fun getValidationSet(): Flux<Iris> {
        return getPartition(false)
    }
}