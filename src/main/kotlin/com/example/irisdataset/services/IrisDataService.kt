package com.example.irisdataset.services

import com.example.irisdataset.datamodels.Iris
import com.example.irisdataset.repositories.IrisRepository
import org.springframework.beans.factory.annotation.Value
import org.springframework.core.io.Resource
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.io.File

@Service
class IrisDataService(val repository: IrisRepository) {
    @Value("classpath:iris.data")
    lateinit var classicIrisData: Resource

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

    fun parseClassicIrisDataRecord(record: String): Iris {
        val recordList: List<String> = record.split(",").map {
            it.trim()
        }
        return Iris(
                sepalLength = recordList[0].toFloat(),
                sepalWidth = recordList[1].toFloat(),
                petalLength = recordList[2].toFloat(),
                petalWidth = recordList[3].toFloat(),
                irisClass = recordList[4]
            )
    }

    fun parseClassicIrisDataFile(): Flux<Iris> {
        val irisRecords: MutableList<Iris> = mutableListOf()
        classicIrisData.file.forEachLine {
            if (it.isNotBlank()) {
                println(it)
                irisRecords.add(parseClassicIrisDataRecord(it))
            }
        }
        println(irisRecords.toString())
        saveMultipleIrises(irisRecords)
        return getAllIrises()
    }
}