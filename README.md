# 🗃️ CometKeep

> A privacy-focused browser extension for local file storage and text extraction

CometKeep is a simple, secure browser extension that allows you to upload PDF and text files, extract their content, and store everything locally in your browser. Perfect for quick text extraction and content management without sending your files to external servers.

## ✨ Features

- 📄 **PDF Text Extraction** - Automatically converts PDF files to readable text
- 📝 **Text File Support** - Direct support for .txt files
- 🔒 **100% Local Storage** - All files stored in your browser's IndexedDB
- 📋 **One-Click Copy** - Copy extracted text content to clipboard
- 🗑️ **File Management** - Easy upload and deletion of files
- 🎨 **Clean Interface** - Modern, intuitive design
- 🚫 **No External Servers** - Complete privacy, no data leaves your browser

## 📸 Screenshots

![CometKeep Interface](assets/screenshot.png)

## 🚀 Quick Start

### Installation

1. **Download the Extension**
   ```bash
   git clone https://github.com/yourusername/cometkeep.git
   cd cometkeep
   ```

2. **Load in Browser**
   - Open Chrome/Edge and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the CometKeep folder
   - The extension icon will appear in your toolbar

3. **Start Using**
   - Click the CometKeep icon in your browser toolbar
   - Drag & drop PDF or TXT files into the upload area
   - Click "Copy Content" to get the extracted text

### Usage

1. **Upload Files**: Drag and drop PDF or TXT files into the extension popup
2. **View Content**: See your uploaded files listed with their sizes
3. **Copy Text**: Click "Copy Content" to copy the extracted text to your clipboard
4. **Delete Files**: Click "Delete" to remove files you no longer need

## 🛠️ Development

### Prerequisites

- Modern web browser (Chrome, Edge, Firefox)
- Basic knowledge of browser extensions

### Project Structure

```
cometkeep/
├── manifest.json          # Extension configuration
├── popup/
│   ├── popup.html         # Main interface
│   ├── popup.css          # Styling
│   ├── popup.js           # Core functionality
│   ├── pdf.min.js         # PDF.js library
│   └── pdf.worker.min.js  # PDF.js worker
├── background/
│   └── service-worker.js  # Background processes
├── icons/
│   ├── icon16.svg         # 16x16 icon
│   ├── icon48.svg         # 48x48 icon
│   └── icon128.svg        # 128x128 icon
└── assets/                # Documentation assets
```

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/cometkeep.git
   cd cometkeep
   ```

2. **Load the extension in development mode**
   - Open `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the project folder

3. **Make changes**
   - Edit files in the `popup/` directory
   - Reload the extension in `chrome://extensions/` to see changes

### Building for Production

The extension is ready to use as-is. For distribution:

1. **Create a ZIP file** with all project files except `.git/`, `README.md`, and development files
2. **Upload to Chrome Web Store** or distribute the ZIP for manual installation

## 🔧 Technical Details

### Libraries Used

- **PDF.js** - Mozilla's PDF parsing library for text extraction
- **IndexedDB** - Browser's local database for file storage
- **Chrome Extension APIs** - For browser integration

### Browser Compatibility

- ✅ Chrome (Manifest V3)
- ✅ Edge (Manifest V3)
- ⚠️ Firefox (requires manifest conversion)
- ❌ Safari (not supported)

### File Format Support

- **PDF files** - Text extraction using PDF.js
- **TXT files** - Direct text reading
- **File size limit** - Limited by browser's IndexedDB storage

## 🔒 Privacy & Security

- **No external connections** - All processing happens locally
- **No data collection** - Zero telemetry or analytics
- **Local storage only** - Files never leave your device
- **Open source** - Full transparency of code

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Code Style

- Use consistent indentation (2 spaces)
- Add comments for complex functionality
- Follow existing naming conventions
- Test changes thoroughly before submitting

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Bug Reports

Found a bug? Please open an issue on GitHub with:

- Browser version and OS
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots if applicable

## 💡 Feature Requests

Have an idea for improvement? Open an issue with:

- Clear description of the feature
- Use case explanation
- Mockups or examples if applicable

## 📚 FAQ

**Q: Where are my files stored?**
A: All files are stored locally in your browser's IndexedDB. They never leave your device.

**Q: What's the file size limit?**
A: Limited by your browser's storage quota, typically several GB.

**Q: Can I export my files?**
A: Currently, you can copy the text content. File export feature may be added in future versions.

**Q: Does this work offline?**
A: Yes! Once installed, CometKeep works completely offline.

## 🙏 Acknowledgments

- [PDF.js](https://mozilla.github.io/pdf.js/) - For excellent PDF parsing capabilities
- [Chrome Extensions Documentation](https://developer.chrome.com/docs/extensions/) - For comprehensive API reference
- The open source community for inspiration and feedback

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/yourusername/cometkeep?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/cometkeep?style=social)
![GitHub issues](https://img.shields.io/github/issues/yourusername/cometkeep)
![GitHub license](https://img.shields.io/github/license/yourusername/cometkeep)

---

**Made with ❤️ for privacy-conscious users**