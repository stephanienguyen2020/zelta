# :robot: Zelta - Advanced AI Companionship Platform :hugs: :couple: :two_women_holding_hands: :two_men_holding_hands:

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
│   │   ├── utils/                      # Contains utilities like Azure AI Search, etc.
│   ├── main.py
│   ├── requirements.txt                # Required dependencies for back-end
│   ├── OAI_CONFIG_LIST.json.sample     # Sample Azure OpenAI configuration
│   ├── .env.sample                     # Sample environment variables configuration 
│   ├── frontend/
│   │   ├── public/
│   │   ├── src/
│   │   └── package.json
├── public/
├── README.md
├── types/

```

## :rocket: Core Features

### :toolbox: Intelligent Conversation System 
- **Multi-Agent Architecture**: Powered by Autogen and Azure OpenAI Service for dynamic, context-aware interactions
- **Emotional Intelligence**: Memory-enhanced responses for more human-like interactions
- **Real-time Awareness**: Time-sensitive responses that maintain conversational relevance
- **Continuous Learning**: Evolving interactions based on user preferences and habits

### :speech_balloon: Speech Processing Pipeline

- **Voice Interface**: Advanced speech-to-speech communication
- **Natural Synthesis**: Azure Speech Services for speech to text and text to speech capabilities with high accuracy
- **Lip Sync**: Rhubarb Lip Sync technology for synchronized 2D mouth animations

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
  - Azure Cosmos DB for PostgreSQL with PGVector for chat history retrieval of vector embeddings and searching
  - Azure AI Search index and Azure Blob Storage for storing user information and uploaded documents
- **Search**: Azure AI Search with profile indexing for semantic search
- **Speech Services**: Azure Speech Services (speech to text, text to speech)
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
3. **Intent Classifier**: A semantic router to identify user's intent
4. **Specialized Agents**:
   - Document Reading Agent
   - Web Search Agent
   - Conversation Agent
5. **Relationship Consulting Agent**: Response refinement based on user information (hobbies, preference, etc.)
6. **Memory Agent**: User information extraction from the conversation and storage to Azure AI Search

## :rocket: Project Setup Guide

This guide provides detailed instructions for setting up Zelta locally. Follow these steps carefully to ensure proper functionality. (Note that the main app is in the "main_app" directory)

### :computer: Prerequisites

- **Python**: Version 3.11.5
- **Docker**: Latest stable version
- **Node.js**: Version 16 or higher
- **Azure Account**: Active subscription for services (including Azure OpenAI Service, Azure AI Search, Azure Cosmos DB, Azure AI Document Intelligence, Azure Blob Storage, etc.)

### :building_construction: Setup Instructions

**1. Clone the repository:**

```bash
git clone https://github.com/stephanienguyen2020/zelta.git
cd zelta
```

**2. Install dependencies:**

```bash
npm install
# or
yarn install
# or
npm install
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

**3. Navigate into the backend directory**

```bash
cd main_app
```

**4. Install lipsync**

```bash
mkdir bin
```

Download [Rhubarb Lipsync](https://github.com/DanielSWolf/rhubarb-lip-sync/releases) and unzip. Copy all files and move them to the `bin` folder.

**5. Create Python Virtual Environment**

```bash
python3.11 -m venv env
```

**6. Activate Virtual Environment**

```bash
# Linux/MacOS
source env/bin/activate

# Windows
.\env\Scripts\activate
```

**7. Install Python Dependencies**

```bash
pip install -r requirements.txt
```

**8. Configure Environment Variables**

```bash
cp .env.sample .env
# Edit .env with your Azure credentials and configurations
```

**9. Optional: Start Docker Services for local Database PostgreSQL setup**

```bash
docker-compose up -d
```

**10. Start Backend Server**

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

**11. Install & Start Frontend**

Go back to root and run these commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## :rocket: Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## :rocket: License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
