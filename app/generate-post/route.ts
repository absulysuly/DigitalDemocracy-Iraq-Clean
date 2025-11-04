# Overdrive Optimization Script — Aggressive (Run as Administrator)
# Creates backups, prompts before destructive steps, and prints reversal hints.
# Read all comments before running.

Write-Host "=== OVERDRIVE OPTIMIZATION (AGGRESSIVE) ===" -ForegroundColor Yellow

# -------------------------
# 0) Safety: Check admin
# -------------------------
If (-not ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole(`
    [Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Write-Error "This script must be run as Administrator. Right-click PowerShell and choose 'Run as Administrator'."
    exit 1
}

# -------------------------
# 1) Create System Restore Point
# -------------------------
Write-Host "-> Creating System Restore Point (may take a minute)..."
Try {
    Checkpoint-Computer -Description "Overdrive-PreChange" -RestorePointType "MODIFY_SETTINGS" -ErrorAction Stop
    Write-Host "Restore point created."
} Catch {
    Write-Warning "Could not create a restore point. Proceeding, but strongly consider creating one manually."
}

# -------------------------
# 2) Export registry keys we'll change (backup)
# -------------------------
$regBackupDir = "$env:SystemDrive\OverdriveBackup"
New-Item -Path $regBackupDir -ItemType Directory -Force | Out-Null
$regsToExport = @(
    "HKLM:\SYSTEM\CurrentControlSet\Control\Session Manager\Memory Management",
    "HKLM:\SYSTEM\CurrentControlSet\Services\SysMain",
    "HKLM:\SYSTEM\CurrentControlSet\Services\DiagTrack",
    "HKLM:\SYSTEM\CurrentControlSet\Services\WSearch"
)
foreach ($rk in $regsToExport) {
    $safeName = ($rk -replace "[:\\]","_").TrimStart("_")
    $regFile = Join-Path $regBackupDir "$safeName.reg"
    try {
        reg export $rk $regFile /y > $null
        Write-Host "Exported $rk -> $regFile"
    } catch {
        Write-Warning "Failed to export $rk (it may not exist)."
    }
}

# -------------------------
# 3) Confirmation prompt for aggressive changes
# -------------------------
$confirm = Read-Host "This will apply aggressive changes (disable hibernation, change power plan, disable services). Type OVERDRIVE to continue"
if ($confirm -ne "OVERDRIVE") {
    Write-Host "Aborting — you did not type OVERDRIVE." -ForegroundColor Cyan
    exit 0
}

# -------------------------
# 4) Power plan: Ultimate Performance / High Performance
# -------------------------
Write-Host "-> Enabling Ultimate Performance power plan (if available) and setting processor states to 100%..."
Try {
    # Enable Ultimate Performance (may already exist on some Windows versions)
    powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61 > $null 2>&1
} catch { }
# Create/activate High Performance if the above fails
$scheme = (powercfg /L) -match "Ultimate Performance"
if ($scheme) {
    Write-Host "Ultimate Performance available."
    # Attempt to activate scheme by GUID (if duplicate succeeded)
    # Note: retrieving GUID of Ultimate Performance:
    $guid = (powercfg /L) -match "Ultimate Performance" | ForEach-Object { ($_ -split '\s+')[3] }
    if ($guid) { powercfg /S $guid }
} else {
    Write-Host "Setting High Performance scheme."
    powercfg /S SCHEME_MIN
}

# Force processor minimum and maximum to 100% (AC)
$sub = "54533251-82be-4824-96c1-47b60b740d00" # Processor settings GUID group
$minGUID = "893dee8e-2bef-41e0-89c6-b55d0929964c" # Minimum processor state
$maxGUID = "bc5038f7-23e0-4960-96da-33abaf5935ec" # Maximum processor state
Try {
    powercfg /SETACVALUEINDEX SCHEME_CURRENT $sub $minGUID 100
    powercfg /SETACVALUEINDEX SCHEME_CURRENT $sub $maxGUID 100
    powercfg /SETACTIVE SCHEME_CURRENT
    Write-Host "Processor min/max set to 100% (AC)."
} Catch {
    Write-Warning "Unable to set processor min/max — you can set manually in Power Options -> Change plan settings -> Advanced."
}

# -------------------------
# 5) Disable Core Parking (aggressive)
# -------------------------
Write-Host "-> Disabling core parking (aggressive; reversible via powercfg)..."
# Core parking is controlled by "Processor performance core parking min cores" in modern systems.
# We'll set value to 100 (no parking)
$parkingGUID = "0cc5b647-c1df-4637-891a-dec35c318583" # possible GUID on some systems (varies). We'll also attempt typical approach below.
Try {
    # attempt to set core parking on the current scheme (works on many systems)
    powercfg /SETACVALUEINDEX SCHEME_CURRENT SUB_PROCESSOR 0cc5b647-c1df-4637-891a-dec35c318583 100 > $null 2>&1
} Catch {}
# Also set core parking via powercfg for "minimum cores" if available
Try {
    powercfg /SETACVALUEINDEX SCHEME_CURRENT $sub $minGUID 100 > $null 2>&1
    Write-Host "Attempted core-parking disable. Results depend on hardware + drivers."
} Catch {
    Write-Warning "Core parking tweak may not be supported on this device."
}

# -------------------------
# 6) Disable Hibernation (free disk space, faster resume)
# -------------------------
Write-Host "-> Disabling hibernation (powercfg -h off) to save disk and speed resume (reversible with -h on)."
if ((Read-Host "Disable hibernation now? Type YES to disable") -eq "YES") {
    powercfg -h off
    Write-Host "Hibernation disabled."
} else {
    Write-Host "Skipped disabling hibernation."
}

# -------------------------
# 7) Disable or set SysMain (Superfetch) to Manual — optional
# -------------------------
if ((Read-Host "Set SysMain (Superfetch) to Manual (recommended for SSD/older HDD)? Type YES to apply") -eq "YES") {
    Try { Stop-Service -Name "SysMain" -ErrorAction SilentlyContinue } Catch {}
    Try { Set-Service -Name "SysMain" -StartupType Manual -ErrorAction SilentlyContinue } Catch {}
    Write-Host "SysMain set to Manual."
}

# -------------------------
# 8) Disable Telemetry (DiagTrack / Connected User Experiences)
# -------------------------
if ((Read-Host "Disable Diagnostic Tracking service (telemetry) now? Type YES to apply") -eq "YES") {
    Try { Stop-Service -Name "DiagTrack" -ErrorAction SilentlyContinue } Catch {}
    Try { Set-Service -Name "DiagTrack" -StartupType Disabled -ErrorAction SilentlyContinue } Catch {}
    # Also try disabling dmwappushservice and others
    Try { Stop-Service -Name "dmwappushservice" -ErrorAction SilentlyContinue } Catch {}
    Try { Set-Service -Name "dmwappushservice" -StartupType Disabled -ErrorAction SilentlyContinue } Catch {}
    Write-Host "Telemetry services attempted to be disabled."
}

# -------------------------
# 9) Aggressive disk and file system tweaks
# -------------------------
Write-Host "-> Clearing temp files, Windows Update download caches, and trimming pagefile..."
Remove-Item -Path "$env:TEMP\*" -Recurse -Force -ErrorAction SilentlyContinue
Try {
    Remove-Item -Path "C:\Windows\SoftwareDistribution\Download\*" -Recurse -Force -ErrorAction SilentlyContinue
} Catch {}
# Disable pagefile (optional, not recommended for low RAM). We'll prompt first.
$pagefileChoice = Read-Host "Do you want to set Pagefile to system managed (recommended) or custom/disable? Type 'managed', 'custom', or 'disable' (or press Enter to skip)"
if ($pagefileChoice -eq "disable") {
    wmic computersystem where name="%computername%" set AutomaticManagedPagefile=False
    wmic pagefileset where name="C:\\pagefile.sys" delete
    Write-Warning "Pagefile disabled. This can cause instability on low-RAM systems."
} elseif ($pagefileChoice -eq "managed") {
    wmic computersystem where name="%computername%" set AutomaticManagedPagefile=True
    Write-Host "Pagefile set to System Managed."
} elseif ($pagefileChoice -eq "custom") {
    $min = Read-Host "Enter minimum (MB)"
    $max = Read-Host "Enter maximum (MB)"
    if ($min -match '^\d+$' -and $max -match '^\d+$') {
        wmic pagefileset create name="C:\\pagefile.sys" InitialSize=$min,MaximumSize=$max > $null 2>&1
        Write-Host "Custom pagefile created. Reboot recommended."
    } else {
        Write-Warning "Invalid values; skipping."
    }
} else {
    Write-Host "Skipping pagefile changes."
}

# -------------------------
# 10) Disable Windows Search Indexing (if user wants faster IO)
# -------------------------
if ((Read-Host "Disable Windows Search service (indexing) to reduce IO? Type YES to disable") -eq "YES") {
    Try { Stop-Service -Name "WSearch" -ErrorAction SilentlyContinue } Catch {}
    Try { Set-Service -Name "WSearch" -StartupType Disabled -ErrorAction SilentlyContinue } Catch {}
    Write-Host "Windows Search disabled."
}

# -------------------------
# 11) Visual effects and UI speed
# -------------------------
Write-Host "-> Setting visual effects to 'Adjust for best performance'..."
$perfKey = "HKCU:\Software\Microsoft\Windows\CurrentVersion\Explorer\VisualEffects"
Try {
    New-Item -Path $perfKey -Force | Out-Null
    Set-ItemProperty -Path $perfKey -Name "VisualFXSetting" -Value 2 -Force
    # Also set advanced system visual settings by registry tweak:
    $regPerfPath = "HKCU:\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced"
    # Note: For full effect, use SystemPropertiesPerformance UI or manual registry list; we'll set the common setting.
    Write-Host "VisualFXSetting set; you may still need to run sysdm.cpl -> Performance -> Adjust for best performance for full effect."
} Catch {
    Write-Warning "Could not modify visual effects via registry; use GUI: System -> Advanced -> Performance Settings."
}

# -------------------------
# 12) Trim/Optimize SSD + Defrag
# -------------------------
Write-Host "-> Running optimize (Trim) on all drives..."
Get-Volume | Where-Object { $_.DriveType -eq 'Fixed' } | ForEach-Object {
    $d = $_.DriveLetter + ":"
    if ($d -ne ":") {
        try { Optimize-Volume -DriveLetter $_.DriveLetter -ReTrim -Verbose } catch { Write-Warning "OptimizeVolume failed for $($_.DriveLetter)" }
    }
}
Write-Host "-> Defragment/Optimize on C: (if HDD this will defrag; if SSD TRIM already applied)"
Try { defrag C: /O } Catch {}

# -------------------------
# 13) Cleanup/Optional: Windows Update cleanup and store reset
# -------------------------
if ((Read-Host "Run store reset (wsreset) and Disk Cleanup sagerun? Type YES to run") -eq "YES") {
    Start-Process -FilePath "wsreset.exe" -NoNewWindow
    # Configure cleanmgr preset 1 (user must have previously run cleanmgr /sageset:1 to set options)
    Start-Process -FilePath "cleanmgr.exe" -ArgumentList "/sagerun:1"
    Write-Host "wsreset and cleanmgr triggered."
}

# -------------------------
# 14) Final summary & reboot prompt
# -------------------------
Write-Host "`n=== OVERDRIVE SUMMARY ==="
Write-Host "Backups saved to: $regBackupDir"
Write-Host "Created Restore Point: Overdrive-PreChange (if supported)"
Write-Host "Actions performed (or attempted):"
Write-Host "- Power plan -> Ultimate/High Performance"
Write-Host "- Processor min/max -> 100% (AC)"
Write-Host "- Core parking tweaks attempted"
Write-Host "- Optional: Hibernation disabled, SysMain set to Manual, Telemetry disabled"
Write-Host "- Pagefile changes (if chosen), indexing disabled (if chosen)"
Write-Host "- Temp + Windows Update cache cleaned"
Write-Host "- SSD Trim/defrag run"

if ((Read-Host "Reboot now for changes to take effect? Type YES to reboot") -eq "YES") {
    Restart-Computer
} else {
    Write-Host "Reboot skipped. Reboot later to apply all changes."
}

Write-Host "Done. If you want a reverse script to restore registry keys and re-enable services, say 'restore' and I'll provide it."
