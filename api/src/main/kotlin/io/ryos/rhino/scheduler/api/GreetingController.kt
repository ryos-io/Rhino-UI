package io.ryos.rhino.api.api;

import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@Api(value="Greeting API", description = "A sample API", tags = ["/greeting"])
@RestController
class GreetingController {
    @ApiOperation("Greets the user", response = String::class)
    @GetMapping("/greeting", produces = [MediaType.TEXT_PLAIN_VALUE])
    fun hello( @RequestParam("name", defaultValue = "world") name: String): ResponseEntity<String> {
        return ResponseEntity.ok().body("hello $name")
    }
}

