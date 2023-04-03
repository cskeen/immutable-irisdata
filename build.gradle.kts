import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
	id("org.springframework.boot") version "2.5.9"
	id("io.spring.dependency-management") version "1.0.11.RELEASE"
	kotlin("jvm") version "1.6.10"
	kotlin("plugin.spring") version "1.6.10"
	id("com.google.cloud.tools.jib") version "3.1.3"
}

group = "com.example.irisdataset"
version = "1.0.0"
java.sourceCompatibility = JavaVersion.VERSION_17

repositories {
	mavenCentral()
}

extra["springCloudVersion"] = "2020.0.3"

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-data-redis")
	implementation("io.netty:netty-resolver-dns-native-macos:4.1.72.Final:osx-aarch_64")
	implementation("org.springframework.boot:spring-boot-starter-data-redis-reactive")
	implementation("org.springframework.boot:spring-boot-starter-webflux")
	implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
	implementation("io.projectreactor.kotlin:reactor-kotlin-extensions")
	implementation("org.jetbrains.kotlin:kotlin-reflect")
	implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
	implementation("org.jetbrains.kotlinx:kotlinx-coroutines-reactor")
	implementation("org.springframework.cloud:spring-cloud-function-web")
	implementation("org.springdoc:springdoc-openapi-webflux-ui:1.6.4")
	implementation("org.springdoc:springdoc-openapi-kotlin:1.6.4")
	developmentOnly("org.springframework.boot:spring-boot-devtools")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testImplementation("io.projectreactor:reactor-test")
}

dependencyManagement {
	imports {
		mavenBom("org.springframework.cloud:spring-cloud-dependencies:${property("springCloudVersion")}")
	}
}

tasks.withType<KotlinCompile> {
	kotlinOptions {
		freeCompilerArgs = listOf("-Xjsr305=strict")
		jvmTarget = "11"
	}
}

tasks.withType<Test> {
	useJUnitPlatform()
}
