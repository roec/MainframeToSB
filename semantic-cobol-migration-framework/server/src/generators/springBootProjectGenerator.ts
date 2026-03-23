import type { GeneratedProject } from "../models/migration";
import { appJava, customerController, customerDomain, customerEntity, customerRepo, customerRequest, customerResponse, customerService, customerTest, exceptionHandler } from "./javaTemplates";
import { pomTemplate } from "./pomTemplate";
import { generatedReadmeTemplate } from "./readmeTemplate";

export const buildSpringBootProject = (_artifacts: Record<string, unknown>): GeneratedProject => ({
  files: [
    { path: "pom.xml", content: pomTemplate, language: "xml" },
    { path: "README.md", content: generatedReadmeTemplate, language: "markdown" },
    { path: "src/main/resources/application.yml", content: "spring:\n  datasource:\n    url: jdbc:h2:mem:migrationdemo", language: "yaml" },
    { path: "src/main/java/com/example/migrationdemo/MigrationDemoApplication.java", content: appJava, language: "java" },
    { path: "src/main/java/com/example/migrationdemo/controller/CustomerController.java", content: customerController, language: "java" },
    { path: "src/main/java/com/example/migrationdemo/application/CustomerApplicationService.java", content: customerService, language: "java" },
    { path: "src/main/java/com/example/migrationdemo/domain/model/Customer.java", content: customerDomain, language: "java" },
    { path: "src/main/java/com/example/migrationdemo/infrastructure/persistence/entity/CustomerEntity.java", content: customerEntity, language: "java" },
    { path: "src/main/java/com/example/migrationdemo/infrastructure/persistence/repository/CustomerRepository.java", content: customerRepo, language: "java" },
    { path: "src/main/java/com/example/migrationdemo/dto/CustomerRequest.java", content: customerRequest, language: "java" },
    { path: "src/main/java/com/example/migrationdemo/dto/CustomerResponse.java", content: customerResponse, language: "java" },
    { path: "src/main/java/com/example/migrationdemo/exception/GlobalExceptionHandler.java", content: exceptionHandler, language: "java" },
    { path: "src/test/java/com/example/migrationdemo/CustomerControllerTest.java", content: customerTest, language: "java" }
  ]
});
