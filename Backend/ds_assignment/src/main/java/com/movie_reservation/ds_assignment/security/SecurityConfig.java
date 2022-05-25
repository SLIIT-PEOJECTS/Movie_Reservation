package com.movie_reservation.ds_assignment.security;

import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    public void configure(HttpSecurity  http) throws Exception {
        http.authorizeRequests()
                .mvcMatchers("/api/public").permitAll()
                .mvcMatchers("/manager/token").permitAll()
                .mvcMatchers("/manager/login").permitAll()
                .mvcMatchers(HttpMethod.GET,"/movie/*").authenticated()
                .mvcMatchers("/api/private").authenticated()
                .mvcMatchers("/manager/*").authenticated()
                .mvcMatchers(HttpMethod.POST,"/movie/").authenticated()
                .mvcMatchers(HttpMethod.PUT,"/movie/").authenticated()
                .mvcMatchers(HttpMethod.POST,"/theater/").authenticated()
                .mvcMatchers(HttpMethod.PUT,"/theater/").authenticated()
                .and().cors()
                .and().oauth2ResourceServer().jwt();
    }

    @Override
    public void configure(WebSecurity web) {
                web.ignoring()
                .antMatchers("/manager/login")
                .antMatchers("/manager/token")
                .antMatchers(HttpMethod.GET,"/movie/*")
                .antMatchers(HttpMethod.GET,"/theater/*")
                        .antMatchers(HttpMethod.POST,"/cart/*")
                        .antMatchers("/user/*");
    }

}
