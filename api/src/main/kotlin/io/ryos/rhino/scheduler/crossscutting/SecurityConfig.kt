package io.ryos.rhino.api.crossscutting

import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.env.Environment
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.core.Authentication
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@EnableWebSecurity
@Configuration
class SecurityConfig : WebSecurityConfigurerAdapter() {
    private val log = LoggerFactory.getLogger(SecurityConfig::class.java)

    @Autowired
    private lateinit var environment: Environment

    override fun configure(http: HttpSecurity?) {
        val publicEndpoints = arrayOf(
                // Swagger ui
                "/v2/api-docs",
                "/configuration/ui",
                "/swagger-resources/**",
                "/configuration/**",
                "/swagger-ui.html",
                "/webjars/**",
                "/csrf",

                // root
                "/",

                // Spring Actuators
                "/actuator/**"

                // API here...
        )

        // https://medium.com/@fatihcoskun/kotlin-scoping-functions-apply-vs-with-let-also-run-816e4efb75f5
        http?.run {
            // TODO enable so PUT, POST and DELETE calls are secured
            // needed currently for development since some develop within a VM and use the browser from the host
            csrf().disable()
                    .authorizeRequests()
                    // matcher order matters: first come first serve
                    .antMatchers(*publicEndpoints).permitAll()
                    .anyRequest().authenticated()
                    .and()
                    .logout()
                    .and()
                    .formLogin()
        }
    }

    override fun configure(auth: AuthenticationManagerBuilder?) {
        auth?.run {
            inMemoryAuthentication()
                .withUser("rhino")
                .password("{noop}rhino")
                .roles("USER")
                .and()
                .withUser("admin")
                .password("{noop}admin")
                .roles("USER", "ADMIN");
        }
    }
}
