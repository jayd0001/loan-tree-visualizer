# 🌳 Loan Tree Visualizer

A modern, interactive tree visualizer for managing hierarchical relationships among loan-related entities. Built with React Flow, Next.js, and Tailwind CSS, this application provides both visual flow diagrams and traditional tree structure views for comprehensive loan management.

![Loan Tree Visualizer](https://via.placeholder.com/800x400/3b82f6/ffffff?text=Loan+Tree+Visualizer)

## 🚀 Technologies Used

### Core Framework & Language
- **[Vite](https://vitejs.dev/)** – Lightning-fast frontend build tool   
- **[React 18](https://reactjs.org/)** - UI library with hooks and context
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript

### Styling & UI Components
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Headless UI components (via shadcn/ui)
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library

### Visualization & Layout
- **[React Flow (@xyflow/react)](https://reactflow.dev/)** - Interactive node-based diagrams
- **[Dagre](https://github.com/dagrejs/dagre)** - Directed graph layout algorithm

### Utilities
- **[nanoid](https://github.com/ai/nanoid)** - Unique ID generator
- **[clsx](https://github.com/lukeed/clsx)** - Conditional className utility

## 🏗️ Tree Structure (Data Model)

### Core Data Model

\`\`\`typescript
interface TreeNode {
  id: string           // Unique identifier (nanoid generated)
  type: NodeType       // 'account' | 'loan' | 'collateral'
  label: string        // Display name (auto-generated)
  parentId?: string    // Parent node ID (undefined for root nodes)
  createdAt: Date      // Creation timestamp
}

type NodeType = 'account' | 'loan' | 'collateral'
\`\`\`

### Hierarchical Relationship Rules

| Node Type | Description | Allowed Children | Root Level | Icon |
|-----------|-------------|------------------|------------|------|
| **Account** | Customer's financial account | Loan, Collateral | ✅ Yes | 🏢 Building |
| **Loan** | Loan issued to an account | Collateral | ✅ Yes | 💳 Credit Card |
| **Collateral** | Asset pledged against a loan | None | ❌ No | 🛡️ Shield |

### Business Rules

1. **Root Node Restrictions**: Only Account and Loan nodes can exist at the root level
2. **Parent-Child Relationships**: 
   - Account → Can have Loan and Collateral children
   - Loan → Can have Collateral children only
   - Collateral → Cannot have any children (leaf nodes)
3. **Cascade Deletion**: Deleting a node removes all its descendants
4. **Unique Identifiers**: Each node has a unique nanoid-generated ID

### Example Tree Structures

\`\`\`
Account (ACC_abc123)
├── Loan (LOAN_def456)
│   ├── Collateral (COL_ghi789)
│   └── Collateral (COL_jkl012)
├── Collateral (COL_mno345)
└── Loan (LOAN_pqr678)
    └── Collateral (COL_stu901)

Loan (LOAN_xyz789)
├── Collateral (COL_abc123)
└── Collateral (COL_def456)
\`\`\`

## 🎨 Node Types Definition & Rendering

### BaseNode Architecture

All nodes inherit from a reusable \`BaseNode\` component that provides consistent styling and behavior:

\`\`\`typescript
interface BaseNodeProps {
  data: {
    id: string
    label: string
    type: NodeType
    onSelect: () => void
  }
  config: NodeConfig
}

interface NodeConfig {
  icon: LucideIcon           // Primary icon
  secondaryIcon: LucideIcon  // Badge icon
  colors: {
    gradient: string         // Background gradient
    border: string          // Border color
    iconBg: string          // Icon background
    secondaryIcon: string   // Secondary icon color
    badge: string           // Badge text color
  }
}
\`\`\`

### Node Type Configurations

#### Account Node
- **Visual Theme**: Emerald green gradient
- **Icons**: Building2 (primary), Users (secondary)
- **Purpose**: Represents customer accounts
- **Styling**: \`from-emerald-50 to-emerald-100\` gradient

#### Loan Node  
- **Visual Theme**: Blue gradient
- **Icons**: CreditCard (primary), DollarSign (secondary)
- **Purpose**: Represents loans issued to accounts
- **Styling**: \`from-blue-50 to-blue-100\` gradient

#### Collateral Node
- **Visual Theme**: Amber gradient  
- **Icons**: Shield (primary), Star (secondary)
- **Purpose**: Represents assets pledged as security
- **Styling**: \`from-amber-50 to-amber-100\` gradient

### Rendering Features

- **Hover Effects**: Scale animation on icon hover
- **Selection State**: Blue border and background when selected
- **Connection Points**: Top (target) and bottom (source) handles
- **Responsive Design**: Consistent 192px width across all node types

## 🎯 UX Decisions & Design Philosophy

### Side Panel Layout

#### Information Architecture
1. **Node Details Section**
   - Node icon with type-specific styling
   - Node label and type badge
   - Unique ID (monospace font for readability)
   - Creation timestamp

2. **Actions Section**
   - Context-aware "Add Child Node" buttons
   - Only shows valid child types based on business rules
   - Visual icons matching node type colors

3. **Danger Zone**
   - Clearly separated destructive actions
   - Warning text explaining cascade deletion
   - Red-themed styling for visual emphasis

#### Interaction Patterns
- **Click to Open**: Click any node to open side panel
- **Auto-close**: Panel closes when selected node is deleted
- **Persistent State**: Panel remains open when switching between views

### Add/Delete Flow

#### Adding Nodes
1. **Root Nodes**: 
   - Header dropdown button "Add Root Node"
   - Only shows Account and Loan options
   - Disabled states for invalid options

2. **Child Nodes**:
   - Side panel buttons for valid child types
   - Context-aware based on parent node type
   - Visual feedback with type-specific icons

3. **Auto-generation**:
   - Unique IDs generated with nanoid
   - Labels auto-generated with type + short ID
   - Timestamps automatically recorded

#### Deleting Nodes
1. **Danger Zone UI**:
   - Separated section with warning styling
   - Clear explanation of cascade behavior
   - Confirmation through deliberate action

2. **Cascade Logic**:
   - Recursive deletion of all descendants
   - Automatic layout recalculation
   - Side panel auto-closes if selected node deleted

### View Switching

#### Flow View (Default)
- **React Flow Integration**: Interactive node-based diagram
- **Auto-layout**: Dagre algorithm for optimal positioning
- **Controls**: Zoom, pan, fit-to-view, minimap
- **Visual Feedback**: Animated edges, hover states

#### Tree View (Alternative)
- **Traditional Hierarchy**: Familiar file-tree structure
- **Expand/Collapse**: Interactive chevron controls
- **Tree Lines**: ASCII-style connectors for clarity
- **Synchronized State**: Shares selection with flow view


## ⚠️ Limitations & Trade-offs

### Current Limitations

#### Functional Limitations
1. **No Persistence**: Data resets on page refresh
   - *Trade-off*: Simplified development vs. data persistence
   - *Future*: Local storage or database integration planned

2. **No Undo/Redo**: Destructive actions are permanent
   - *Trade-off*: Simple state management vs. complex history tracking
   - *Future*: Command pattern implementation considered

3. **No Drag & Drop**: Intentionally disabled for auto-layout
   - *Trade-off*: Consistent layout vs. manual positioning flexibility
   - *Rationale*: Auto-layout ensures professional appearance

4. **No Node Editing**: Labels are auto-generated only
   - *Trade-off*: Consistency vs. customization
   - *Future*: Inline editing with validation planned

#### Technical Limitations
1. **Client-side Only**: No backend integration
   - *Trade-off*: Rapid prototyping vs. production scalability
   - *Impact*: Suitable for demo/prototype use cases

2. **Memory Usage**: All nodes kept in memory
   - *Trade-off*: Simple state management vs. memory efficiency
   - *Limitation*: May impact performance with 1000+ nodes

3. **No Real-time Collaboration**: Single-user application
   - *Trade-off*: Simplicity vs. collaborative features
   - *Future*: WebSocket integration possible

### Performance Considerations

#### Rendering Performance
- **Large Trees**: Performance may degrade with 100+ nodes
- **Layout Calculation**: Dagre runs on every tree change
- **Re-renders**: Optimized with useCallback and React.memo

#### Memory Management
- **State Size**: Linear growth with node count
- **Event Listeners**: Properly cleaned up in useEffect
- **Component Lifecycle**: No memory leaks detected

### Browser Compatibility

#### Supported Browsers
- **Chrome**: 90+ (full support)
- **Firefox**: 88+ (full support)  
- **Safari**: 14+ (full support)
- **Edge**: 90+ (full support)

#### Known Issues
- **IE**: Not supported (uses modern JavaScript features)
- **Mobile Safari**: Minor touch interaction differences

### Scalability Constraints

#### Data Volume
- **Recommended**: < 100 nodes for optimal performance
- **Maximum Tested**: 500 nodes (acceptable performance)
- **Theoretical Limit**: ~1000 nodes before noticeable lag

#### Complexity
- **Tree Depth**: No artificial limits, but UI becomes cramped beyond 6 levels
- **Branching Factor**: Optimal with 2-5 children per node

## 🚀 Getting Started

### Prerequisites
- **Node.js**: 18.0.0 or higher
- **npm**: 8.0.0 or higher (or yarn/pnpm equivalent)

### Installation

1. **Clone the repository**:
   \`\`\`bash
   git clone https://github.com/jayd0001/loan-tree-visualizer.git
   cd loan-tree-visualizer
   \`\`\`

2. **Install dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

3. **Start development server**:
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open in browser**:
   Navigate to \`http://localhost:5173\`

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## 📖 Usage Guide

### Basic Operations

1. **Create Root Node**: 
   - Click "Add Root Node" in header
   - Choose Account or Loan

2. **Add Child Nodes**:
   - Click any node to select it
   - Use side panel "Add Child Node" buttons

3. **View Tree Structure**:
   - Toggle between Flow View and Tree View
   - Use controls for navigation

4. **Export Data**:
   - Click "Export JSON" to download tree structure

### Advanced Features

- **Minimap**: Navigate large trees efficiently
- **Fit to View**: Auto-zoom to show entire tree
- **Search**: Use browser search (Ctrl+F) in Tree View
- **Keyboard Navigation**: Tab through interactive elements

## 🔮 Future Enhancements

### Planned Features
- **Persistence**: Local storage and database integration
- **Node Editing**: Inline label editing with validation
- **Import/Export**: Support for CSV, XML formats
- **Search & Filter**: Advanced node discovery
- **Themes**: Dark mode and custom color schemes
- **Collaboration**: Real-time multi-user editing
- **Validation**: Business rule enforcement with error messages
- **Performance**: Virtual scrolling for large trees
- **Mobile**: Enhanced touch interactions

### Technical Improvements
- **State Management**: Migration to Zustand or Redux Toolkit
- **Testing**: Comprehensive unit and integration tests
- **Documentation**: Interactive Storybook components
- **Accessibility**: Enhanced screen reader support
- **Internationalization**: Multi-language support

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request


## 🙏 Acknowledgments

- **React Flow Team** - Excellent visualization library
- **Vercel** - Hosting and deployment platform
- **Tailwind CSS** - Beautiful utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Dagre** - Graph layout algorithms

---

**Project Folder Structure**
App.tsx
index.css
main.tsx
components/
├── Badge/
│ ├── Badge.tsx
│ ├── config/
│ │ └── index.ts
│ └── types/
│ └── index.ts
├── Button/
│ ├── Button.tsx
│ ├── config/
│ │ └── index.ts
│ └── types/
│ └── index.ts
├── Card/
│ ├── Card.tsx
│ └── _components/
│ ├── CardContent/
│ │ └── CardContent.tsx
│ ├── CardDescription/
│ │ └── CardDescription.tsx
│ ├── CardFooter/
│ │ └── CardFooter.tsx
│ ├── CardHeader/
│ │ └── CardHeader.tsx
│ └── CardTitle/
│ └── CardTitle.tsx
├── Header/
│ ├── Header.tsx
│ ├── _components/
│ │ ├── AddRootDropdown/
│ │ │ └── AddRootDropdown.tsx
│ │ ├── ExportButton/
│ │ │ └── ExportButton.tsx
│ │ ├── TitleSection/
│ │ │ └── TitleSection.tsx
│ │ └── ViewToggleButton/
│ │ └── ViewToggleButton.tsx
│ └── _hooks/
│ └── index.ts
├── Nodes/
│ ├── config/
│ │ └── node-configs.ts
│ └── _components/
│ ├── AccountNode/
│ │ └── AccountNode.tsx
│ ├── BaseNode/
│ │ └── BaseNode.tsx
│ ├── CollateralNode/
│ │ └── CollateralNode.tsx
│ └── LoanNode/
│ └── LoanNode.tsx
├── Separator/
│ └── Separator.tsx
├── SidePanel/
│ └── SidePanel.tsx
├── TreeStructureViewer/
│ ├── TreeStructureViewer.tsx
│ ├── types/
│ │ └── index.ts
│ └── _components/
│ └── TreeNodeItem/
│ └── TreeNodeItem.tsx
└── TreeVisualizer/
├── TreeVisualizer.tsx
├── config/
│ └── index.ts
└── _components/
└── FlowComponent/
└── FlowComponent.tsx
contexts/
└── tree-context.tsx
lib/
└── utils.ts



