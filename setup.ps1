#!/usr/bin/env pwsh
# ─────────────────────────────────────────────────────────────
# setup.ps1 — Portfolio setup script
# 1. Copies WebP frames to public/sequence/
# 2. Installs npm dependencies
# 3. Starts the dev server
# ─────────────────────────────────────────────────────────────

$SourceDir = "C:\Users\Rahul\Downloads\Sequence"
$DestDir   = "C:\Users\Rahul\Desktop\Portfolio\public\sequence"
$ProjectDir = "C:\Users\Rahul\Desktop\Portfolio"

# Step 1: Copy frames
Write-Host "`n[1/3] Copying image sequence frames..." -ForegroundColor Cyan

if (-not (Test-Path $DestDir)) {
    New-Item -ItemType Directory -Path $DestDir -Force | Out-Null
    Write-Host "  Created: $DestDir"
}

$frames = Get-ChildItem -Path $SourceDir -Filter "*.webp"
$count = $frames.Count
Write-Host "  Found $count frames to copy..."

foreach ($frame in $frames) {
    $dest = Join-Path $DestDir $frame.Name
    if (-not (Test-Path $dest)) {
        Copy-Item -Path $frame.FullName -Destination $dest
    }
}

Write-Host "  ✓ All frames ready in $DestDir" -ForegroundColor Green

# Step 2: Install dependencies
Write-Host "`n[2/3] Installing npm dependencies..." -ForegroundColor Cyan
Set-Location $ProjectDir
npm install

Write-Host "  ✓ Dependencies installed" -ForegroundColor Green

# Step 3: Start dev server
Write-Host "`n[3/3] Starting Next.js dev server..." -ForegroundColor Cyan
Write-Host "  → Open http://localhost:3000 in your browser`n"
npm run dev
