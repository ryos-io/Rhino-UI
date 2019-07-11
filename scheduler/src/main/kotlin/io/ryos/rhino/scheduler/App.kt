package io.ryos.rhino.scheduler

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.data.rest.RepositoryRestMvcAutoConfiguration
import org.springframework.boot.runApplication

// exclude RepositoryRestMvcAutoConfiguration to disable registration of default RestController (e.g. ProfileController)
@SpringBootApplication(exclude = [RepositoryRestMvcAutoConfiguration::class])
class BorrowApplication

fun main(args: Array<String>) {
    runApplication<BorrowApplication>(*args)
}
