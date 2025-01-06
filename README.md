# Zelta - Advanced AI Companionship Platform

Zelta is an Azure-powered AI application that creates meaningful relationships through personalized interactions. Built on a sophisticated multi-agent architecture, it offers emotionally intelligent companions that learn and evolve with each user.

## Core Features

### Intelligent Conversation System (backed by Azure)

- **Multi-Agent Architecture**: Powered by Autogen for dynamic, context-aware interactions
- **Emotional Intelligence**: Memory-enhanced responses for more human-like interactions
- **Real-time Awareness**: Time-sensitive responses that maintain conversational relevance
- **Continuous Learning**: Evolving interactions based on user preferences and habits

### Speech Processing Pipeline

- **Voice Interface**: Advanced speech-to-speech communication
- **Natural Synthesis**: Azure Speech Services for emotionally expressive responses
- **Lip Sync**: Rhubarb technology for synchronized facial animations
- **Immersive Experience**: Lifelike conversational interactions

### Profile Management

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

## Technical Architecture

### Backend Stack

- **Cloud Platform**: Azure Services Suite
- **Database**:
  - Cosmos DB for PostgreSQL
  - pgvector for embeddings
  - Profile vector store with auto-refresh
- **Search**: Azure AI Search with profile indexing
- **Storage**: Azure Blob Storage
- **Speech Services**: Azure Speech Services

### Frontend Stack

- **Framework**: Next.js 15.0
- **Language**: TypeScript
- **Styling**:
  - Tailwind CSS
  - Radix UI
  - Shadcn UI
- **HTTP Client**: Axios
- **Font**: Geist (Sans & Mono)

### AI Components

- **Agent Framework**: Autogen
- **Memory System**: RAG (Retrieval Augmented Generation)
- **Text Processing**: LLMLingua
- **Emotion Processing**: Custom emotional intelligence layer

## Agent Pipeline

1. **User Proxy**: Initial query handling
2. **Reformulate Agent**: Context-rich query processing
3. **Intent Classifier**: Query categorization
4. **Specialized Agents**:
   - Document Reading Agent
   - Web Search Agent
   - Conversation Agent
5. **Relationship Consulting**: Response refinement
6. **Memory Agent**: User information extraction and storage

## Getting Started

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

## Documentation

For detailed documentation about:

- [Agent Architecture](docs/agents.md)
- [Azure Services Integration](docs/azure-services.md)
- [Memory System](docs/memory-system.md)
- [Speech Pipeline](docs/speech-pipeline.md)

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
