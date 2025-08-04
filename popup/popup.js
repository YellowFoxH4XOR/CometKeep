// Configure PDF.js
if (typeof pdfjsLib !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdf.worker.min.js';
}

// Database functionality
const DB_NAME = 'CometKeep';
const DB_VERSION = 1;
const STORE_NAME = 'files';

let db;

function openDB() {
  return new Promise((resolve, reject) => {
    if (db) {
      return resolve(db);
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      console.error("Database error:", event.target.errorCode);
      reject("Database error");
    };

    request.onupgradeneeded = (event) => {
      const database = event.target.result;
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        const store = database.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        store.createIndex('name', 'name', { unique: false });
      }
    };

    request.onsuccess = (event) => {
      db = event.target.result;
      resolve(db);
    };
  });
}

async function extractTextFromPDF(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      fullText += pageText + '\n\n';
    }

    return fullText.trim();
  } catch (error) {
    throw new Error('Failed to extract text from PDF: ' + error.message);
  }
}

async function saveFile(file) {
  try {
    // Validate file type
    const allowedTypes = ['application/pdf', 'text/plain'];
    const allowedExtensions = ['.pdf', '.txt'];
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    
    if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
      throw new Error('Only PDF and TXT files are supported');
    }

    const database = await openDB();
    let textContent = '';

    if (file.type === 'application/pdf' || fileExtension === '.pdf') {
      textContent = await extractTextFromPDF(file);
    } else {
      // For text files
      textContent = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = () => reject('Error reading file');
        reader.readAsText(file);
      });
    }

    return new Promise((resolve, reject) => {
      const transaction = database.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const fileRecord = {
        name: file.name,
        type: file.type,
        size: file.size,
        content: textContent
      };
      const request = store.add(fileRecord);

      request.onsuccess = (event) => {
        resolve(event.target.result);
      };

      request.onerror = (event) => {
        console.error('Error saving file:', event.target.error);
        reject('Error saving file');
      };
    });
  } catch (error) {
    throw new Error('Failed to save file: ' + error.message);
  }
}

async function getAllFiles() {
  try {
    const database = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = database.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = (event) => {
        resolve(event.target.result);
      };

      request.onerror = (event) => {
        reject('Error getting all files');
      };
    });
  } catch (error) {
    throw new Error('Failed to get files: ' + error.message);
  }
}

async function deleteFile(id) {
  try {
    const database = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = database.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(id);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = (event) => {
        reject('Error deleting file');
      };
    });
  } catch (error) {
    throw new Error('Failed to delete file: ' + error.message);
  }
}

// UI functionality
document.addEventListener('DOMContentLoaded', () => {
  const fileInput = document.getElementById('fileInput');
  const uploadButton = document.getElementById('uploadButton');
  const uploadArea = document.getElementById('uploadArea');
  const fileListDiv = document.getElementById('fileList');
  const toast = document.getElementById('toast');

  let allFiles = [];

  // Drag and drop functionality
  uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
  });

  uploadArea.addEventListener('dragleave', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
  });

  uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    const files = Array.from(e.dataTransfer.files);
    handleFileUpload(files);
  });

  uploadArea.addEventListener('click', () => {
    fileInput.click();
  });

  fileInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    handleFileUpload(files);
  });

  uploadButton.addEventListener('click', () => {
    fileInput.click();
  });

  function validateFileType(file) {
    const allowedTypes = ['application/pdf', 'text/plain'];
    const allowedExtensions = ['.pdf', '.txt'];
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    
    return allowedTypes.includes(file.type) || allowedExtensions.includes(fileExtension);
  }

  async function handleFileUpload(files) {
    if (files.length === 0) return;

    // Filter valid files
    const validFiles = files.filter(validateFileType);
    const invalidFiles = files.filter(file => !validateFileType(file));

    if (invalidFiles.length > 0) {
      showToast(`${invalidFiles.length} file(s) skipped. Only PDF and TXT files are supported.`, 'error');
    }

    if (validFiles.length === 0) return;

    try {
      showToast('Processing files...', 'info');
      
      for (const file of validFiles) {
        await saveFile(file);
      }
      
      fileInput.value = '';
      await loadFiles();
      showToast(`${validFiles.length} file(s) uploaded successfully!`, 'success');
    } catch (error) {
      console.error('Upload error:', error);
      showToast('Error: ' + error.message, 'error');
    }
  }

  async function loadFiles() {
    try {
      allFiles = await getAllFiles();
      renderFiles();
    } catch (error) {
      console.error('Load files error:', error);
      showToast('Error loading files', 'error');
    }
  }

  function renderFiles() {
    fileListDiv.innerHTML = '';

    if (allFiles.length === 0) {
      fileListDiv.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">No files uploaded yet</p>';
      return;
    }

    allFiles.forEach(file => {
      const fileDiv = document.createElement('div');
      fileDiv.className = 'file-item';

      const fileName = document.createElement('div');
      fileName.className = 'file-name';
      fileName.textContent = file.name;

      const fileSize = document.createElement('div');
      fileSize.className = 'file-size';
      fileSize.textContent = formatFileSize(file.size);

      const actions = document.createElement('div');
      actions.className = 'file-actions';

      const copyButton = document.createElement('button');
      copyButton.className = 'btn btn-copy btn-small';
      copyButton.textContent = 'Copy Content';
      copyButton.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(file.content);
          showToast('Content copied!', 'success');
        } catch (error) {
          showToast('Failed to copy', 'error');
        }
      });

      const deleteButton = document.createElement('button');
      deleteButton.className = 'btn btn-delete btn-small';
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', async () => {
        if (confirm(`Delete "${file.name}"?`)) {
          try {
            await deleteFile(file.id);
            await loadFiles();
            showToast('File deleted!', 'success');
          } catch (error) {
            showToast('Failed to delete', 'error');
          }
        }
      });

      actions.appendChild(copyButton);
      actions.appendChild(deleteButton);

      fileDiv.appendChild(fileName);
      fileDiv.appendChild(fileSize);
      fileDiv.appendChild(actions);

      fileListDiv.appendChild(fileDiv);
    });
  }

  function formatFileSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  function showToast(message, type = 'info') {
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  // Initialize
  loadFiles();
});