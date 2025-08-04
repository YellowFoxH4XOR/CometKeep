# 📦 Installation Guide

This guide will help you install CometKeep browser extension on your system.

## 🚀 Quick Installation

### Method 1: From Chrome Web Store (Recommended)
*Coming soon - Extension will be available on Chrome Web Store*

### Method 2: Manual Installation (Developer Mode)

#### For Chrome/Edge Users

1. **Download CometKeep**
   ```bash
   git clone https://github.com/yourusername/cometkeep.git
   ```
   *Or download the ZIP file from GitHub releases*

2. **Open Extension Management**
   - Open Chrome/Edge browser
   - Navigate to `chrome://extensions/` (Chrome) or `edge://extensions/` (Edge)
   - Or go to Menu → More Tools → Extensions

3. **Enable Developer Mode**
   - Toggle "Developer mode" switch in the top-right corner
   - This allows loading unpacked extensions

4. **Load the Extension**
   - Click "Load unpacked" button
   - Select the `cometkeep` folder you downloaded
   - The extension should now appear in your extensions list

5. **Pin the Extension** (Optional)
   - Click the puzzle piece icon in the browser toolbar
   - Find CometKeep and click the pin icon
   - The CometKeep icon will now be visible in your toolbar

#### For Firefox Users

*Note: Firefox support requires manifest conversion*

1. **Download CometKeep**
2. **Open Firefox**
   - Navigate to `about:debugging`
   - Click "This Firefox"
   - Click "Load Temporary Add-on"
   - Select the `manifest.json` file

## ✅ Verify Installation

1. **Check Extension Icon**
   - Look for the 🗃️ CometKeep icon in your browser toolbar
   - If not visible, click the extensions/puzzle icon

2. **Test Basic Functionality**
   - Click the CometKeep icon
   - The popup should open with upload area
   - Try uploading a test TXT file

3. **Check Permissions**
   - The extension should request minimal permissions
   - Only storage and activeTab permissions are needed

## 🔧 Troubleshooting

### Common Issues

#### Extension Won't Load
- **Check file permissions** - Ensure you have read access to all files
- **Verify folder structure** - Make sure `manifest.json` is in the root folder
- **Check browser version** - Requires Chrome 88+ or Edge 88+
- **Clear cache** - Try reloading the extension

#### PDF Processing Not Working
- **Check PDF.js files** - Ensure `pdf.min.js` and `pdf.worker.min.js` are present
- **File size limits** - Very large PDFs may fail to process
- **Corrupted PDFs** - Try with a different PDF file

#### Storage Issues
- **Check available space** - Browser storage quota may be full
- **IndexedDB support** - Ensure your browser supports IndexedDB
- **Private browsing** - Some features may not work in incognito mode

### Browser Compatibility

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 88+ | ✅ Fully Supported |
| Edge | 88+ | ✅ Fully Supported |
| Firefox | 109+ | ⚠️ Requires Manifest V2 conversion |
| Safari | Any | ❌ Not Supported |

### Error Messages

#### "Failed to load extension"
- Check that all files are present
- Verify manifest.json syntax
- Ensure proper file permissions

#### "PDF processing failed"
- PDF may be corrupted or encrypted
- Try with a different PDF file
- Check browser console for detailed errors

#### "Storage quota exceeded"
- Clear stored files from the extension
- Check browser storage settings
- Try uploading smaller files

## 🔄 Updating the Extension

### Manual Updates

1. **Download latest version** from GitHub releases
2. **Remove old extension** from `chrome://extensions/`
3. **Load new version** using the same installation steps
4. **Your data is preserved** (stored in browser's IndexedDB)

### Automatic Updates

*Available when extension is published to Chrome Web Store*

## 🗑️ Uninstalling

### Complete Removal

1. **Go to Extensions Page**
   - Navigate to `chrome://extensions/`
   - Find CometKeep extension

2. **Remove Extension**
   - Click "Remove" button
   - Confirm removal in dialog

3. **Clear Stored Data** (Optional)
   - Open browser settings
   - Go to Privacy and Security → Site Settings
   - Click "View permissions and data stored across sites"
   - Find and clear CometKeep data

### Keep Data for Reinstallation

- Simply remove the extension without clearing browser data
- Data will be available when you reinstall

## 📞 Support

If you encounter issues during installation:

1. **Check the troubleshooting section** above
2. **Search existing issues** on GitHub
3. **Create a new issue** with:
   - Browser version and OS
   - Error messages
   - Steps you tried
   - Screenshots if helpful

## 🔐 Permissions Explained

CometKeep requests minimal permissions:

- **Storage** - To save your files locally in IndexedDB
- **ActiveTab** - For proper extension popup functionality

*No network permissions are requested - your data stays local!*