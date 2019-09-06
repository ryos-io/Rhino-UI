# Rhino Scheduler

Task api of the Rhino Load Testing Platform.

Used technologies:

- Spring
- Kotlin

## Build Management

- `./gradlew tasks`: Show available tasks
- `./gradlew bootRun`: Start Spring-Boot server
- `./gradlew clean build`: compile
- `./gradlew test`: test

## Development

For local development activate the Spring `local` profile via JVM parameter:

`-Dspring.profiles.active=local`

This allows you to access protected APIs with preconfigured users
via [Basic Auth](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication):
`curl -v --user "rhino:rhino" http://localhost:8080/greeting`

## Documentation

- [Swagger REST-API documentation](http://localhost:8080/swagger-ui.html)
  - Server needs to be running
