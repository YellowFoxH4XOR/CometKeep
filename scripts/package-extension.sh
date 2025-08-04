#!/bin/bash

# CometKeep Extension Packaging Script
# This script creates a distribution-ready ZIP file

echo "🗃️ CometKeep Extension Packager"
echo "================================"

# Get version from manifest.json
VERSION=$(grep '"version"' manifest.json | sed 's/.*"version": "\(.*\)".*/\1/')
echo "📦 Packaging version: $VERSION"

# Create filename
FILENAME="cometkeep-v${VERSION}.zip"

# Remove old package if exists
if [ -f "$FILENAME" ]; then
    echo "🗑️ Removing old package: $FILENAME"
    rm "$FILENAME"
fi

# Create new package
echo "📦 Creating package: $FILENAME"

zip -r "$FILENAME" \
    manifest.json \
    popup/ \
    background/ \
    icons/ \
    -x \
    "*.DS_Store" \
    "*.git*" \
    "node_modules/*" \
    "docs/*" \
    "assets/*" \
    "scripts/*" \
    "*.md" \
    "package.json" \
    ".gitignore"

if [ $? -eq 0 ]; then
    echo "✅ Package created successfully: $FILENAME"
    echo "📊 Package size: $(du -h "$FILENAME" | cut -f1)"
    echo ""
    echo "📋 Package contents:"
    unzip -l "$FILENAME"
else
    echo "❌ Failed to create package"
    exit 1
fi

echo ""
echo "🚀 Ready for distribution!"
echo "Upload $FILENAME to Chrome Web Store or distribute manually."