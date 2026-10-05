$WshShell = New-Object -ComObject WScript.Shell
$desktopPath = [System.Environment]::GetFolderPath('Desktop')
$shortcutPath = Join-Path $desktopPath 'BrightFlow.lnk'
$shortcut = $WshShell.CreateShortcut($shortcutPath)
$icoPath = Join-Path $env:LOCALAPPDATA 'ProjectVaultHub\app.ico'
$shortcut.IconLocation = "$icoPath,0"
$shortcut.Save()
Write-Output "Shortcut icon updated successfully!"
