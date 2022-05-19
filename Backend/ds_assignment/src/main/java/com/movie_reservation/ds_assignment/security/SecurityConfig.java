package com.movie_reservation.ds_assignment.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.oauth2.core.DelegatingOAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtDecoders;
import org.springframework.security.oauth2.jwt.JwtValidators;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    public void configure(HttpSecurity  http) throws Exception {
        http.authorizeRequests()
                .mvcMatchers("/api/public").permitAll()
                .mvcMatchers("/manager/token").permitAll()
                .mvcMatchers("/manager/login").permitAll()
                .mvcMatchers("/api/private").authenticated()
                .mvcMatchers("/manager/*").authenticated()
                .mvcMatchers("/movie/").permitAll()
                .and().cors()
                .and().oauth2ResourceServer().jwt();
    }

    @Override
    public void configure(WebSecurity web) {
                web.ignoring()
                .antMatchers("/manager/login")
                .antMatchers("/manager/token");
//                .antMatchers(HttpMethod.GET,"/movie/*");
    }

}
