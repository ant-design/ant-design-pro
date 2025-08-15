# Next.js + React 19 + Tailwind CSS + CopilotKit Integration

This document describes the integration of modern AI development stack with Ant Design Pro.

## 🚀 What's New

This integration adds support for:

- **Next.js 15.1.5** - Modern React framework with React 19 support
- **Tailwind CSS 3.4** - Utility-first CSS framework, configured to work with Ant Design
- **CopilotKit 1.3.20** - AI assistant integration for modern development experience
- **React 19** - Latest React with experimental features
- **CSS-in-JS Compatibility** - Seamless integration with existing antd-style

## 📁 Project Structure

```
ant-design-pro/
├── next-pages/           # Next.js pages (new)
│   ├── _app.tsx         # Next.js app configuration
│   ├── _document.tsx    # HTML document structure
│   ├── index.tsx        # Homepage with integration demo
│   ├── demo.tsx         # Component showcase page
│   └── api/
│       └── copilotkit.ts # AI assistant API endpoint
├── next-components/     # Next.js specific components (new)
├── styles/             # Global styles for Next.js (new)
│   └── globals.css     # Tailwind CSS imports and custom styles
├── src/               # Original Umi.js source (unchanged)
├── config/            # Umi.js configuration (unchanged)
├── next.config.js     # Next.js configuration (new)
├── tailwind.config.js # Tailwind CSS configuration (new)
└── postcss.config.js  # PostCSS configuration (new)
```

## 🛠️ Development Commands

### Umi.js (Original Workflow)
```bash
# Start Umi.js development server on port 8000
npm run dev
npm run start:dev

# Build Umi.js for production
npm run build

# Preview Umi.js build
npm run preview
```

### Next.js (New AI Workflow)
```bash
# Start Next.js development server on port 3001
npm run dev:next

# Build Next.js for production
npm run build:next

# Preview Next.js build
npm run preview:next
```

## 🎯 Key Features

### 1. Dual Framework Support
- **Umi.js**: Traditional enterprise development workflow (port 8000)
- **Next.js**: Modern AI-powered development workflow (port 3001)
- Both frameworks can run simultaneously without conflicts

### 2. Technology Integration
- **React 19**: Latest React features with experimental support
- **Ant Design 5.26.4**: Enterprise-class UI components
- **Tailwind CSS**: Utility-first styling that complements Ant Design
- **CSS-in-JS**: antd-style continues to work seamlessly
- **CopilotKit**: AI assistant for development help

### 3. AI Features
- **AI Assistant**: Click the chat icon for development help
- **Context Awareness**: AI understands your current page and components
- **Form Assistance**: AI can help fill forms and suggest values
- **Code Suggestions**: Get help with React, Ant Design, and Tailwind

## 🎨 Styling Approach

### Ant Design + Tailwind CSS Harmony
```tsx
// You can use both Ant Design components and Tailwind classes
<Card className="shadow-lg hover:shadow-xl transition-shadow">
  <Button type="primary" className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
    Modern Button
  </Button>
</Card>
```

### Configuration Details
- Tailwind CSS is configured with `important: '#__next'` to avoid conflicts
- Preflight is disabled to preserve Ant Design's base styles
- Custom color palette includes Ant Design colors
- Responsive breakpoints align with Ant Design's grid system

## 🔧 API Integration

### CopilotKit Setup
The AI assistant is configured with:
- Mock API endpoint (`/api/copilotkit`) for demonstration
- Context-aware responses about Ant Design Pro
- Form interaction capabilities
- Development guidance and suggestions

### Production Setup
For production use, replace the mock API with:
```typescript
// In next-pages/_app.tsx
<CopilotKit runtimeUrl="https://your-ai-api-endpoint.com">
```

## 🚀 Getting Started

1. **Install Dependencies** (if not already installed):
   ```bash
   npm install
   ```

2. **Start Development**:
   ```bash
   # For traditional development
   npm run dev

   # For AI-powered development
   npm run dev:next
   ```

3. **Visit the Apps**:
   - Umi.js App: http://localhost:8000
   - Next.js App: http://localhost:3001

4. **Try the AI Assistant**:
   - Click the chat icon in the Next.js app
   - Ask questions like "Help me create a user form" or "Show me Ant Design best practices"

## 📚 Examples

### Page Examples
- **Homepage** (`/`): Integration overview and feature showcase
- **Demo Page** (`/demo`): Comprehensive component examples with Tailwind styling

### Component Examples
- Forms with AI assistance
- Tables with modern styling
- Statistics cards with gradients
- Responsive layouts using Tailwind Grid

## 🤝 Compatibility

### Browser Support
- Modern browsers with React 19 support
- Same browser support as Ant Design 5.x

### Framework Coexistence
- Umi.js and Next.js run on different ports
- Shared TypeScript configuration
- Independent build processes
- No conflicts between routing systems

## 📈 Migration Path

### Gradual Adoption
1. **Phase 1**: Use Next.js for new AI-powered features
2. **Phase 2**: Migrate critical pages to Next.js as needed
3. **Phase 3**: Full migration if desired (optional)

### Component Reuse
- Existing Ant Design components work in both frameworks
- Shared utilities and services can be used across frameworks
- CSS-in-JS styles remain compatible

## 🔮 Future Enhancements

- [ ] Advanced AI actions and workflows
- [ ] Integration with popular AI services (OpenAI, Claude, etc.)
- [ ] Automated testing with AI assistance
- [ ] Code generation capabilities
- [ ] Advanced Tailwind + Ant Design component library

## 🆘 Troubleshooting

### Common Issues
1. **Port Conflicts**: Ensure ports 8000 and 3001 are available
2. **Style Conflicts**: Tailwind's `important` setting prevents most conflicts
3. **TypeScript Errors**: Both frameworks share the same TypeScript config

### Support
- Check the demo pages for working examples
- Use the AI assistant for development questions
- Refer to official documentation for each technology

---

**Happy Coding! 🎉**

This integration brings the best of modern AI development to the robust Ant Design Pro ecosystem.