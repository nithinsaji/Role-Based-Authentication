package com.role;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.role.jwt.JwtTokenFilter;
import com.role.user.UserRepository;


@EnableWebSecurity(debug = true)
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true, jsr250Enabled = true)
public class ApplicationSecurity extends WebSecurityConfigurerAdapter {

	@Autowired private UserRepository userRepo;
	
	@Autowired private JwtTokenFilter jwtTokenFilter;

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		System.out.println("Inside AuthenticationManagerBuilder");
		auth.userDetailsService(username -> userRepo.findByEmail(username)
				.orElseThrow(() -> new UsernameNotFoundException("User " + username + " not found.")));
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		System.out.println("Inside passwordEncoder Bean");
		return new BCryptPasswordEncoder();
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		System.out.println("inside HttpSecurity");
		http.csrf().disable();
		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		
		http.authorizeRequests()
				.antMatchers("/auth/login","/register").permitAll()
				.anyRequest().authenticated();
		
        http.exceptionHandling()
                .authenticationEntryPoint(
                    (request, response, ex) -> {
                        response.sendError(
                            HttpServletResponse.SC_UNAUTHORIZED,
                            ex.getMessage()
                        );
                    }
                );
        
		http.addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class);
	}

	@Override
	@Bean
	public AuthenticationManager authenticationManagerBean() throws Exception {
		System.out.println("inside authenticationManagerBean");
		return super.authenticationManagerBean();
	}
	
	@Value("${allowed.origin}")
	private String allowedOrigin;
	
	@Bean
	public WebMvcConfigurer getCorsConfiguration() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
				.allowedOrigins(allowedOrigin)
				.allowedMethods("GET","POST","PUT","DELETE","OPTIONS")
				.allowedHeaders("*");
			}
		};
		
	}
	
	@Override
	public void configure(WebSecurity web) throws Exception {
		web.ignoring()
        .antMatchers(HttpMethod.OPTIONS);
	}
}
