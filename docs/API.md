# 🔌 CometKeep API Documentation

This document describes the internal API structure of CometKeep for developers who want to understand or extend the extension.

## 📚 Overview

CometKeep uses a simple internal architecture:
- **IndexedDB** for local storage
- **PDF.js** for PDF text extraction
- **Chrome Extension APIs** for browser integration
- **JavaScript modules** for code organization

## 🗄️ Database Schema

### IndexedDB Structure

**Database Name**: `CometKeep`  
**Version**: `1`  
**Object Store**: `files`

#### File Object Schema

```javascript
{
  id: number,           // Auto-generated unique identifier
  name: string,         // Original filename
  type: string,         // MIME type (application/pdf, text/plain)
  size: number,         // File size in bytes
  content: string       // Extracted text content
}
```

#### Indexes

- **name** - For filename-based queries
- **id** - Primary key (auto-generated)

## 🔧 Core Functions

### Database Operations

#### `openDB()`
Opens the IndexedDB database connection.

```javascript
async function openDB() -> Promise<IDBDatabase>
```

**Returns**: Promise that resolves to IDBDatabase instance  
**Throws**: Error if database cannot be opened

#### `saveFile(file)`
Saves a file to the database with text extraction.

```javascript
async function saveFile(file: File) -> Promise<number>
```

**Parameters**:
- `file` - File object from input or drag/drop

**Returns**: Promise that resolves to the new file's ID  
**Throws**: Error if file type unsupported or save fails

**Process**:
1. Validates file type (PDF or TXT only)
2. Extracts text content
3. Stores in IndexedDB

#### `getAllFiles()`
Retrieves all stored files.

```javascript
async function getAllFiles() -> Promise<Array<FileObject>>
```

**Returns**: Promise that resolves to array of file objects  
**Throws**: Error if database query fails

#### `deleteFile(id)`
Deletes a file by ID.

```javascript
async function deleteFile(id: number) -> Promise<void>
```

**Parameters**:
- `id` - Unique file identifier

**Returns**: Promise that resolves when deletion is complete  
**Throws**: Error if file not found or deletion fails

### Text Extraction

#### `extractTextFromPDF(file)`
Extracts text content from PDF files using PDF.js.

```javascript
async function extractTextFromPDF(file: File) -> Promise<string>
```

**Parameters**:
- `file` - PDF File object

**Returns**: Promise that resolves to extracted text  
**Throws**: Error if PDF parsing fails

**Process**:
1. Converts file to ArrayBuffer
2. Loads PDF using PDF.js
3. Iterates through all pages
4. Extracts and concatenates text

### File Validation

#### `validateFileType(file)`
Checks if file type is supported.

```javascript
function validateFileType(file: File) -> boolean
```

**Parameters**:
- `file` - File object to validate

**Returns**: Boolean indicating if file type is supported

**Supported Types**:
- MIME types: `application/pdf`, `text/plain`
- Extensions: `.pdf`, `.txt`

## 🎨 UI Components

### Main Interface Elements

#### Upload Area
- **Element**: `#uploadArea`
- **Events**: dragover, dragleave, drop, click
- **Function**: File selection and drag/drop handling

#### File List
- **Element**: `#fileList`
- **Function**: Displays stored files with actions
- **Dynamic**: Updates when files are added/removed

#### Toast Notifications
- **Element**: `#toast`
- **Function**: User feedback for operations
- **Types**: success, error, info

### Event Handlers

#### File Upload Flow

```javascript
// 1. File selection (drag/drop or click)
handleFileUpload(files) {
  // 2. Validate file types
  // 3. Process each valid file
  // 4. Save to database
  // 5. Update UI
  // 6. Show feedback
}
```

#### Copy to Clipboard

```javascript
// Copy file content to clipboard
navigator.clipboard.writeText(file.content)
```

#### File Deletion

```javascript
// Delete with confirmation
if (confirm(`Delete "${file.name}"?`)) {
  await deleteFile(file.id)
  await loadFiles() // Refresh UI
}
```

## 📡 Extension APIs

### Manifest Configuration

```json
{
  "manifest_version": 3,
  "permissions": [
    "storage",           // IndexedDB access
    "unlimitedStorage"   // Large file support
  ]
}
```

### Background Service Worker

Currently minimal - only handles extension installation events.

```javascript
chrome.runtime.onInstalled.addListener(() => {
  console.log('CometKeep extension installed.')
})
```

## 🔄 Data Flow

### File Upload Process

```
User selects file(s)
    ↓
validateFileType()
    ↓
extractTextFromPDF() (if PDF) | readAsText() (if TXT)
    ↓
saveFile() - Store in IndexedDB
    ↓
loadFiles() - Refresh UI
    ↓
renderFiles() - Display updated list
```

### File Retrieval Process

```
User clicks "Copy Content"
    ↓
navigator.clipboard.writeText(file.content)
    ↓
Show success toast
```

### File Deletion Process

```
User clicks "Delete"
    ↓
confirm() dialog
    ↓
deleteFile() - Remove from IndexedDB
    ↓
loadFiles() - Refresh UI
    ↓
renderFiles() - Display updated list
```

## 🛠️ Extension Points

### Adding New File Types

1. **Update validation** in `validateFileType()`
2. **Add extraction logic** in `saveFile()`
3. **Update HTML accept attribute**
4. **Test thoroughly**

Example for adding DOC support:
```javascript
// In validateFileType()
const allowedTypes = ['application/pdf', 'text/plain', 'application/msword']
const allowedExtensions = ['.pdf', '.txt', '.doc']

// In saveFile()
if (fileExtension === '.doc') {
  textContent = await extractTextFromDoc(file)
}
```

### Adding New Features

1. **Database schema changes** - Update version and migration
2. **UI updates** - Add new interface elements
3. **Permission updates** - Add to manifest if needed
4. **Testing** - Ensure backward compatibility

## 🚨 Error Handling

### Common Error Types

- **Storage quota exceeded**
- **Corrupted PDF files**
- **Unsupported file types**
- **Network errors** (should not occur)
- **Browser compatibility issues**

### Error Propagation

```javascript
try {
  await saveFile(file)
} catch (error) {
  showToast('Error: ' + error.message, 'error')
  console.error('Detailed error:', error)
}
```

## 🔒 Security Considerations

- **No external network requests**
- **Input validation** for all file operations
- **XSS prevention** through proper DOM manipulation
- **Content Security Policy** compliance
- **Minimal permissions** requested

## 📊 Performance Notes

- **Large PDFs** may take time to process
- **IndexedDB limits** vary by browser
- **Memory usage** scales with file count
- **PDF.js worker** runs in separate thread

## 🧪 Testing API

For testing purposes, you can access internal functions via browser console:

```javascript
// Get all files
getAllFiles().then(files => console.log(files))

// Test file validation
validateFileType(new File(['test'], 'test.pdf', {type: 'application/pdf'}))

// Check database status
indexedDB.databases().then(dbs => console.log(dbs))
```