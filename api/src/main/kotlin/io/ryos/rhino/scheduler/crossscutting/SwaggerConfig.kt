package io.ryos.rhino.api.crossscutting

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.core.Authentication
import springfox.documentation.builders.ApiInfoBuilder
import springfox.documentation.builders.PathSelectors
import springfox.documentation.builders.RequestHandlerSelectors
import springfox.documentation.service.ApiInfo
import springfox.documentation.spi.DocumentationType
import springfox.documentation.spring.web.plugins.Docket
import springfox.documentation.swagger2.annotations.EnableSwagger2

@Configuration
@EnableSwagger2
class SwaggerConfig {
    @Bean
    fun api(): Docket {
        return Docket(DocumentationType.SWAGGER_2)
                .ignoredParameterTypes(Authentication::class.java)
                .select()
                .apis(RequestHandlerSelectors.any())
                .apis(RequestHandlerSelectors.basePackage("io.ryos.rhino.api"))
                .paths(PathSelectors.any())
                .build().apiInfo(apiEndPointsInfo());
    }

    fun apiEndPointsInfo(): ApiInfo {
        return ApiInfoBuilder().title("Rhino Scheduler API")
            .description("Rhino Scheduler API")
            .license("Apache 2.0")
            .version("0.0.1")
            .build()
    }
}

