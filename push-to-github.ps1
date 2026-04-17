# ============================================================
# CORTEX AI — GitHub Push Script
# Usage: .\push-to-github.ps1 "your commit message"
# ============================================================

param(
    [string]$CommitMessage = "update: $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
)

# Refresh PATH to ensure gh and git are available
$env:PATH = [System.Environment]::GetEnvironmentVariable("PATH","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("PATH","User")

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   CORTEX AI — GitHub Push Utility     " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if inside a git repo
if (-not (Test-Path ".git")) {
    Write-Host "[ERROR] Not inside a git repository." -ForegroundColor Red
    Write-Host "        Run this script from D:\CORTEX-AI\" -ForegroundColor Yellow
    exit 1
}

# Check GitHub auth
Write-Host "[1/5] Checking GitHub authentication..." -ForegroundColor Yellow
$authStatus = gh auth status 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Not authenticated with GitHub." -ForegroundColor Red
    Write-Host "        Run: gh auth login" -ForegroundColor Yellow
    exit 1
}
Write-Host "       ✓ Authenticated as amruthgowda005" -ForegroundColor Green

# Check if remote exists, create repo if not
Write-Host "[2/5] Checking GitHub remote..." -ForegroundColor Yellow
$remotes = git remote 2>&1
if ($remotes -notcontains "origin") {
    Write-Host "       No remote found. Creating GitHub repo 'CORTEX-AI'..." -ForegroundColor Yellow
    gh repo create CORTEX-AI --public --source=. --remote=origin --push
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] Failed to create GitHub repo." -ForegroundColor Red
        exit 1
    }
    Write-Host "       ✓ Repo created and pushed!" -ForegroundColor Green
    exit 0
}
Write-Host "       ✓ Remote 'origin' exists" -ForegroundColor Green

# Stage all changes
Write-Host "[3/5] Staging all changes..." -ForegroundColor Yellow
git add -A
Write-Host "       ✓ All files staged" -ForegroundColor Green

# Check if there's anything to commit
$status = git status --porcelain
if (-not $status) {
    Write-Host ""
    Write-Host "[INFO] Nothing to commit — working tree is clean." -ForegroundColor Cyan
    exit 0
}

# Commit
Write-Host "[4/5] Committing: '$CommitMessage'" -ForegroundColor Yellow
git commit -m $CommitMessage
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Commit failed." -ForegroundColor Red
    exit 1
}
Write-Host "       ✓ Committed" -ForegroundColor Green

# Push
Write-Host "[5/5] Pushing to GitHub (main)..." -ForegroundColor Yellow
git push origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Push failed. Trying with --set-upstream..." -ForegroundColor Yellow
    git push --set-upstream origin main
}
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Push failed. Check your connection or repo permissions." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "   ✓ Successfully pushed to GitHub!    " -ForegroundColor Green
Write-Host "   https://github.com/amruthgowda005/CORTEX-AI" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
