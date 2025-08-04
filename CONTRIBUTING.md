# Contributing to CometKeep

Thank you for your interest in contributing to CometKeep! We welcome contributions from everyone.

## 🚀 Quick Start

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/cometkeep.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test thoroughly
6. Commit: `git commit -m 'Add some feature'`
7. Push: `git push origin feature/your-feature-name`
8. Open a Pull Request

## 🛠️ Development Setup

### Prerequisites

- Modern web browser (Chrome, Edge recommended)
- Git
- Text editor or IDE

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/cometkeep.git
   cd cometkeep
   ```

2. **Load extension in browser**
   - Open `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the CometKeep folder

3. **Test your changes**
   - Make changes to the code
   - Reload the extension in browser
   - Test functionality thoroughly

## 📝 Code Style Guidelines

### JavaScript
- Use 2 spaces for indentation
- Use camelCase for variables and functions
- Use meaningful variable names
- Add comments for complex logic
- Follow existing patterns in the codebase

### CSS
- Use 2 spaces for indentation
- Use kebab-case for class names
- Group related properties together
- Use meaningful class names

### HTML
- Use 2 spaces for indentation
- Use semantic HTML elements
- Include proper accessibility attributes

## 🧪 Testing

Before submitting your changes:

1. **Test core functionality**
   - Upload PDF files and verify text extraction
   - Upload TXT files and verify content reading
   - Test copy functionality
   - Test delete functionality

2. **Test edge cases**
   - Large files
   - Corrupted files
   - Empty files
   - Special characters

3. **Test across browsers**
   - Chrome
   - Edge
   - Firefox (if making manifest changes)

## 📋 Pull Request Process

1. **Ensure your code follows the style guidelines**
2. **Update documentation if needed**
3. **Test thoroughly**
4. **Write a clear PR description** including:
   - What changes you made
   - Why you made them
   - Any potential issues or considerations

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested on Chrome
- [ ] Tested on Edge
- [ ] Tested with PDF files
- [ ] Tested with TXT files

## Screenshots (if applicable)
Add screenshots to help explain your changes
```

## 🐛 Bug Reports

When reporting bugs, please include:

- **Browser version and OS**
- **Steps to reproduce**
- **Expected behavior**
- **Actual behavior**
- **Screenshots or error messages**
- **Console errors (if any)**

## 💡 Feature Requests

When suggesting new features:

- **Describe the feature clearly**
- **Explain the use case**
- **Consider privacy implications**
- **Provide mockups if helpful**

## 🏷️ Issue Labels

We use the following labels to organize issues:

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements to docs
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed
- `question` - Further information needed

## 📚 Resources

- [Chrome Extension Developer Guide](https://developer.chrome.com/docs/extensions/)
- [PDF.js Documentation](https://mozilla.github.io/pdf.js/)
- [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)

## 🤝 Code of Conduct

### Our Standards

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Respect different viewpoints

### Unacceptable Behavior

- Harassment or discrimination
- Trolling or inflammatory comments
- Personal attacks
- Publishing private information

## ❓ Questions?

Feel free to open an issue with the `question` label if you need help getting started or have questions about contributing.

Thank you for contributing to CometKeep! 🎉