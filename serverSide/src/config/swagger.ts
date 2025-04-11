// src/config/swagger.ts
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import path from 'path';
import fs from 'fs';

// Base Swagger options
const swaggerOptions: { definition: object; apis: string[] } = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Your API Documentation',
            version: '1.0.0',
            description: 'API documentation for your application',
            contact: {
                name: 'API Support',
                email: 'support@yourapi.com',
            },
        },
        servers: [
            {
                url: 'http://localhost:8000',
                description: 'Development server',
            },
            {
                url: 'https://api.yourproduction.com',
                description: 'Production server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: [],
};

// Function to recursively find all route files
const findRouteFiles = (dir: string, fileList: string[] = []): string[] => {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);

        if (fs.statSync(filePath).isDirectory()) {
            fileList = findRouteFiles(filePath, fileList);
        } else if (
            (file.endsWith('Routes.ts') || file.endsWith('Routes.js')) ||
            (file.endsWith('.controller.ts') || file.endsWith('.controller.js'))
        ) {
            fileList.push(filePath);
        }
    });

    return fileList;
};

// Setup Swagger
export const setupSwagger = (app: Express): void => {
    // Find all route files for Swagger to document
    const apiPath = path.resolve(__dirname, '../routes');
    const controllersPath = path.resolve(__dirname, '../controllers');
    const modelsPath = path.resolve(__dirname, '../models');

    // Get all route files and controllers
    const routeFiles = findRouteFiles(apiPath);
    const controllerFiles = fs.existsSync(controllersPath) ? findRouteFiles(controllersPath) : [];

    // Get model files for schemas (if using annotations in models)
    const modelFiles = fs.existsSync(modelsPath)
        ? fs.readdirSync(modelsPath)
            .filter(file => file.endsWith('.ts') || file.endsWith('.js'))
            .map(file => path.join(modelsPath, file))
        : [];

    // Add all files to Swagger options
    swaggerOptions.apis = [...routeFiles, ...controllerFiles, ...modelFiles];

    // Initialize Swagger
    // @ts-ignore
    const specs = swaggerJsDoc(swaggerOptions);

    // Serve Swagger UI
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
    console.log('✅ Swagger documentation available at /api-docs');
};