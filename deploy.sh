#!/bin/bash

# Jekyll Site Deployment Script
# This script helps you commit and push your Jekyll site to GitHub

echo "========================================"
echo "Jekyll Site Deployment Helper"
echo "========================================"
echo ""

# Check if we're in a git repository
if [ ! -d .git ]; then
    echo "Error: Not a git repository!"
    exit 1
fi

# Show current status
echo "Current git status:"
git status --short
echo ""

# Ask for confirmation
read -p "Do you want to commit all changes? (y/n): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Aborted."
    exit 0
fi

# Get commit message
echo "Enter commit message (or press Enter for default):"
read commit_msg

if [ -z "$commit_msg" ]; then
    commit_msg="Update Jekyll site"
fi

# Add all files
echo ""
echo "Adding all files..."
git add .

# Commit
echo "Committing changes..."
git commit -m "$commit_msg"

# Ask about pushing
read -p "Push to GitHub? (y/n): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    # Determine current branch
    current_branch=$(git branch --show-current)
    echo "Pushing to origin/$current_branch..."
    git push origin "$current_branch"

    echo ""
    echo "========================================"
    echo "Deployment initiated!"
    echo "========================================"
    echo ""
    echo "Your site will be available at:"
    echo "https://fizban-stack.github.io/"
    echo ""
    echo "Check deployment status at:"
    echo "https://github.com/fizban-stack/fizban-stack.github.io/actions"
    echo ""
else
    echo ""
    echo "Changes committed but not pushed."
    echo "Run 'git push' when ready to deploy."
fi
