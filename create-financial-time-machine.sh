#!/bin/bash

# Create Financial Time Machine Project Structure
# This script creates the entire folder structure and empty files for the project

# Root directory name
PROJECT_NAME="serverSide"

# Check if the directory already exists
if [ -d "$PROJECT_NAME" ]; then
  echo "Directory $PROJECT_NAME already exists. Please remove it or choose another name."
  exit 1
fi

# Create the root directory
mkdir -p $PROJECT_NAME
cd $PROJECT_NAME

# Create src directory and its subdirectories
mkdir -p src/{models/{base,interfaces},controllers/{base,interfaces},views/{base,interfaces},services/{database/repositories,auth,simulation,analytics,advisor,historical},routes/{v1,middleware},utils/{errors,validators,calculators},config,types/express}

# Create models
touch src/models/base/BaseModel.ts
touch src/models/interfaces/{UserInterface.ts,FinancialProfileInterface.ts,TransactionInterface.ts,GoalInterface.ts,ScenarioInterface.ts,SimulationInterface.ts}
touch src/models/{UserModel.ts,FinancialProfileModel.ts,TransactionModel.ts,GoalModel.ts,ScenarioModel.ts,SimulationModel.ts}

# Create controllers
touch src/controllers/base/BaseController.ts
touch src/controllers/interfaces/ControllerInterface.ts
touch src/controllers/{UserController.ts,ProfileController.ts,TransactionController.ts,GoalController.ts,ScenarioController.ts,SimulationController.ts,AnalyticsController.ts,AdvisorController.ts,HistoricalAnalysisController.ts}

# Create views
touch src/views/base/BaseView.ts
touch src/views/interfaces/ViewInterface.ts
touch src/views/{UserView.ts,ProfileView.ts,TransactionView.ts,GoalView.ts,ScenarioView.ts,SimulationView.ts,AnalyticsView.ts,AdvisorView.ts,HistoricalView.ts}

# Create database services
touch src/services/database/DatabaseService.ts
touch src/services/database/repositories/{UserRepository.ts,ProfileRepository.ts,TransactionRepository.ts,GoalRepository.ts,ScenarioRepository.ts,SimulationRepository.ts}

# Create auth services
touch src/services/auth/{AuthService.ts,EncryptionService.ts}

# Create simulation services
touch src/services/simulation/{SimulationEngine.ts,TaxCalculator.ts,InvestmentCalculator.ts,InflationAdjuster.ts,RiskAssessor.ts}

# Create analytics services
touch src/services/analytics/{BehaviorAnalytics.ts,CategoryAnalyzer.ts,TrendDetector.ts}

# Create advisor services
touch src/services/advisor/{AIAdvisorService.ts,OptimizationEngine.ts,SuggestionGenerator.ts}

# Create historical services
touch src/services/historical/HistoricalAnalysisService.ts

# Create routes
touch src/routes/v1/{userRoutes.ts,profileRoutes.ts,transactionRoutes.ts,goalRoutes.ts,scenarioRoutes.ts,simulationRoutes.ts,analyticsRoutes.ts,advisorRoutes.ts,historicalRoutes.ts}
touch src/routes/middleware/{auth.middleware.ts,validate.middleware.ts,rate-limit.middleware.ts,privacy.middleware.ts}
touch src/routes/index.ts

# Create utils
touch src/utils/errors/{AppError.ts,errorHandler.ts}
touch src/utils/validators/{userValidators.ts,financialValidators.ts,scenarioValidators.ts}
touch src/utils/calculators/{compoundInterest.ts,mortgageCalculator.ts,retirementCalculator.ts,debtPayoff.ts}
touch src/utils/{logger.ts,helpers.ts}

# Create config
touch src/config/{database.ts,app.ts,security.ts,env.ts}

# Create types
touch src/types/express/index.d.ts
touch src/types/{financial.d.ts,global.d.ts}

# Create app and server files
touch src/{app.ts,server.ts}

# Create test directories
mkdir -p tests/{unit/{models,controllers,services/{simulation,analytics,advisor},utils/calculators},integration,e2e}

# Create scripts directory
mkdir -p scripts/{seed,migrations}
touch scripts/seed/{generateUsers.ts,generateTransactions.ts,generateScenarios.ts}

# Create docs directory
mkdir -p docs/{api,architecture,algorithms}

# Create root files
touch {.env,.env.example,.gitignore,package.json,tsconfig.json,jest.config.js,README.md}

# Basic content for package.json
cat > package.json << EOF
{
  "name": "financial-time-machine",
  "version": "1.0.0",
  "description": "A personal finance tool that visualizes alternate financial futures",
  "main": "dist/server.js",
  "scripts": {
    "start": "node dist/server.js",
    "dev": "ts-node-dev --respawn src/server.ts",
    "build": "tsc",
    "test": "jest",
    "lint": "eslint . --ext .ts"
  },
  "keywords": [
    "finance",
    "simulation",
    "typescript",
    "express"
  ],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "bcrypt": "^5.1.0",
    "compression": "^1.7.4",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "helmet": "^6.0.1",
    "jsonwebtoken": "^9.0.0",
    "mongoose": "^7.0.3",
    "morgan": "^1.10.0",
    "winston": "^3.8.2",
    "zod": "^3.21.4"
  },
  "devDependencies": {
    "@types/bcrypt": "^5.0.0",
    "@types/compression": "^1.7.2",
    "@types/cors": "^2.8.13",
    "@types/express": "^4.17.17",
    "@types/jest": "^29.5.0",
    "@types/jsonwebtoken": "^9.0.1",
    "@types/morgan": "^1.9.4",
    "@types/node": "^18.15.11",
    "@types/supertest": "^2.0.12",
    "@typescript-eslint/eslint-plugin": "^5.57.1",
    "@typescript-eslint/parser": "^5.57.1",
    "eslint": "^8.37.0",
    "jest": "^29.5.0",
    "supertest": "^6.3.3",
    "ts-jest": "^29.1.0",
    "ts-node": "^10.9.1",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.0.3"
  }
}
EOF

# Basic content for tsconfig.json
cat > tsconfig.json << EOF
{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "typeRoots": ["./node_modules/@types", "./src/types"]
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "tests"]
}
EOF

# Basic content for .gitignore
cat > .gitignore << EOF
# Logs
logs
*.log
npm-debug.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Dependencies
node_modules/
.npm

# Build output
dist/
build/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Coverage directory
coverage/

# Editor directories
.idea/
.vscode/
*.swp
*.swo

# OS files
.DS_Store
Thumbs.db
EOF

# Basic content for .env.example
cat > .env.example << EOF
# Server
PORT=3000
NODE_ENV=development

# Database
DB_URI=mongodb://localhost:27017/financial-time-machine

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

# Logging
LOG_LEVEL=info

# Security
ENCRYPTION_KEY=your_encryption_key
EOF

# Create README.md with basic content
cat > README.md << EOF
# Financial Time Machine

A personal finance tool that visualizes alternate financial futures.

## Features

* Input your current finances and see projected outcomes of different decisions
* "What if" scenarios for career changes, investments, and major purchases
* Behavior-based analytics that account for your spending patterns
* AI financial advisor that suggests optimizations based on your specific goals
* Privacy-first design that never sells your data to financial institutions
* Backward analysis showing the impact of past decisions

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB

### Installation

1. Clone the repository
2. Install dependencies: \`npm install\`
3. Copy \`.env.example\` to \`.env\` and update with your settings
4. Run the development server: \`npm run dev\`

## Project Structure

The project follows an MCV (Model-Controller-View) architecture:

- **Models:** Data structures and business entities
- **Controllers:** Business logic
- **Views:** Response formatting
- **Services:** Core functionality and external integrations

## License

This project is licensed under the ISC License
EOF

# Create a simple BaseModel.ts
cat > src/models/base/BaseModel.ts << EOF
export abstract class BaseModel {
  id?: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data?: any) {
    this.createdAt = data?.createdAt || new Date();
    this.updatedAt = data?.updatedAt || new Date();

    if (data?.id) {
      this.id = data.id;
    }
  }

  abstract validate(): Promise<boolean>;

  toJSON(): Record<string, any> {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}
EOF

# Create a simple app.ts
cat > src/app.ts << EOF
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import routes from './routes';
import { errorHandler } from './utils/errors/errorHandler';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));

// Routes
app.use('/api', routes);

// Error handling
app.use(errorHandler);

export default app;
EOF

# Create a simple server.ts
cat > src/server.ts << EOF
import app from './app';
import dotenv from 'dotenv';
import logger from './utils/logger';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  logger.info(\`Server is running on port \${PORT}\`);
});

// Handle unhandled rejections
process.on('unhandledRejection', (err: Error) => {
  logger.error('Unhandled Rejection:', err);
  process.exit(1);
});
EOF

echo "Project structure created successfully at $(pwd)/$PROJECT_NAME"
echo "To get started, run:"
echo "cd $PROJECT_NAME"
echo "npm install"
echo "npm run dev"