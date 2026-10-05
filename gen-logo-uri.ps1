$fullBytes = [System.IO.File]::ReadAllBytes((Resolve-Path "public\brightflow-logo.png"))
$fullB64 = [System.Convert]::ToBase64String($fullBytes)
$fullUri = "data:image/png;base64,$fullB64"

$markBytes = [System.IO.File]::ReadAllBytes((Resolve-Path "public\brightflow-mark.png"))
$markB64 = [System.Convert]::ToBase64String($markBytes)
$markUri = "data:image/png;base64,$markB64"

$content = @"
// Automatically generated official BrightFlow logo Data URIs
export const BRIGHTFLOW_LOGO_FULL_DATA_URI = "$fullUri";
export const BRIGHTFLOW_MARK_DATA_URI = "$markUri";
"@

[System.IO.File]::WriteAllText((Join-Path (Get-Location) "src\lib\logoDataUri.ts"), $content)
Write-Output "Successfully generated src\lib\logoDataUri.ts!"
