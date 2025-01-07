# Zelta - Advanced AI Companionship Platform

Zelta is an Azure-powered AI application that creates meaningful relationships through personalized interactions. Built on a sophisticated multi-agent architecture, it offers emotionally intelligent companions that learn and evolve with each user.

## :card_index_dividers: Project Structure

```
.
.
.
├── app/
├── data/
├── hooks/
├── lib/
├── main_app/
│   ├── app/                            # Backend folder
│   │   ├── assistance/                 # Agents
│   │   ├── ...
│   │   ├── routers/                    # Backend Routers
│   │   ├── utils/                      # contains utilities like working with Azure AI Search, etc.
│   ├── main.py
│   ├── requirements.txt                # required dependencies for back-end
│   ├── OAI_CONFIG_LIST.json.sample     # sample Azure OpenAI configurations
│   ├── .env.sample                     # sample environment variables for back-end
│   ├── frontend/
│   │   ├── public/
│   │   ├── src/
│   │   └── package.json
├── public/
├── README.md
├── types/

```

## :rocket: Core Features

### :toolbox: Intelligent Conversation System (backed by Azure OpenAI Service)

- **Multi-Agent Architecture**: Powered by Autogen and Azure OpenAI Service for dynamic, context-aware interactions
- **Emotional Intelligence**: Memory-enhanced responses for more human-like interactions
- **Real-time Awareness**: Time-sensitive responses that maintain conversational relevance
- **Continuous Learning**: Evolving interactions based on user preferences and habits

### :speech_balloon: Speech Processing Pipeline

- **Voice Interface**: Advanced speech-to-speech communication
- **Natural Synthesis**: Azure Speech Services for emotionally expressive responses
- **Lip Sync**: Rhubarb technology for synchronized facial animations
- **Immersive Experience**: Lifelike conversational interactions

### :cupid: Profile Management

- **Comprehensive Preferences**:
  - Personal Information
  - Communication Style
  - Interests & Hobbies
  - Food & Drink
  - Entertainment
  - Fitness & Lifestyle
  - Travel & Learning
  - Work & Social
- **Privacy Controls**: Customizable data sharing settings
- **PDF Export**: Detailed profile reports
- **RAG Integration**:
  - Automatic profile ingestion into RAG system
  - Real-time updates with newest profile data
  - Automatic cleanup of outdated information
  - Seamless overwriting of existing fields
  - Vector-based retrieval for contextual responses

## :rocket: Technical Architecture

### :toolbox: Backend Stack

- **Database & Storage**:
  - Azure Cosmos DB for PostgreSQL with PGVector for retrieval of vector embeddings
  - Azure AI Search index and Azure Blob Storage for user information and uploaded documents
- **Search**: Azure AI Search with profile indexing for semantic search
- **Speech Services**: Azure Speech Services
- **Documents text extractions**: Azure AI Document Intelligence

### :desktop_computer: Frontend Stack

- **Framework**: Next.js 15.0
- **Language**: TypeScript
- **Styling**:
  - Tailwind CSS
  - Radix UI
  - Shadcn UI
- **HTTP Client**: Axios
- **Font**: Geist (Sans & Mono)

### :robot: AI Components

- **Multi-Agent AI**: Built on **Autogen** backed by **Azure OpenAI Service**, enabling seamless collaboration between specialized agents for query reformulation, intent classification, and response generation.
- **Memory System**: Incorporates **Retrieval-Augmented Generation (RAG)** to store and retrieve user-specific data, ensuring personalized and context-aware responses.
- **Text Processing and Compression**: Powered by **LLMLingua**, optimizing chat history management and prompt generation for efficiency.
- **Emotion Processing**: Includes a custom emotional intelligence layer with **Relationship Consulting agent** to analyze and respond empathetically to user inputs.

## :rocket: Multi-Agents Pipeline

1. **User Proxy**: Initial query handling
2. **Reformulate Agent**: Context-rich query processing
3. **Intent Classifier**: Semantic routers to identify user's intent
4. **Specialized Agents**:
   - Document Reading Agent
   - Web Search Agent
   - Conversation Agent
5. **Relationship Consulting Agent**: Response refinement
6. **Memory Agent**: User information extraction and storage

## :rocket: Getting Started

1. Clone the repository:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## :rocket: Documentation

For detailed documentation about:

- [Agent Architecture](docs/agents.md)
- [Azure Services Integration](docs/azure-services.md)
- [Memory System](docs/memory-system.md)
- [Speech Pipeline](docs/speech-pipeline.md)

## :rocket: Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## :rocket: License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## :rocket: Project Setup Guide

This guide provides detailed instructions for setting up Zelta locally. Follow these steps carefully to ensure proper functionality. (Note that the main app is in the "main_app" directory)

### :computer: Prerequisites

- **Python**: Version 3.11.5
- **Docker**: Latest stable version
- **Node.js**: Version 16 or higher
- **Azure Account**: Active subscription for services (including Azure OpenAI Service, Azure AI Search, Azure Cosmos DB, Azure AI Document Intelligence, Azure Blob Storage, etc.)

### :building_construction: Setup Instructions

1. **Navigate into the backend directory**

```bash
cd main_app
```

2. **Install lipsync**

```bash
mkdir bin
```

Download [Rhubarb Lipsync](https://github.com/DanielSWolf/rhubarb-lip-sync/releases) and unzip. Copy all files and move them to the `bin` folder.

3. **Create Python Virtual Environment**

```bash
python3.11 -m venv env
```

4. **Activate Virtual Environment**

```bash
# Linux/MacOS
source env/bin/activate

# Windows
.\env\Scripts\activate
```

5. **Install Python Dependencies**

```bash
pip install -r requirements.txt
```

6. **Configure Environment Variables**

```bash
cp .env.sample .env
# Edit .env with your Azure credentials and configurations
```

7. **Optional: Start Docker Services for local Database PostgreSQL setup**

```bash
docker-compose up -d
```

8. **Start Backend Server**

```bash
# From project root
uvicorn main:app --reload
```

Open a new terminal tab

```bash
cd main_app/frontend
npm i
npm run dev
```

9. **Install & Start Frontend**

Go back to root and run these commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```
