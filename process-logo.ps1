Add-Type -AssemblyName System.Drawing
$imgPath = Resolve-Path "public\brightflow-logo.png"
$bmp = [System.Drawing.Bitmap]::FromFile($imgPath)

$minX = $bmp.Width; $minY = $bmp.Height; $maxX = 0; $maxY = 0
for ($x = 0; $x -lt 300; $x++) {
    for ($y = 0; $y -lt $bmp.Height; $y++) {
        $c = $bmp.GetPixel($x, $y)
        if ($c.A -gt 20) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}
Write-Output "Mark Bounding Box: X=$minX..$maxX, Y=$minY..$maxY"

# Calculate square crop with margin
$width = $maxX - $minX
$height = $maxY - $minY
$size = [Math]::Max($width, $height) + 24
$targetSquare = New-Object System.Drawing.Bitmap $size, $size
$g = [System.Drawing.Graphics]::FromImage($targetSquare)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

$destX = [int](($size - $width) / 2)
$destY = [int](($size - $height) / 2)
$rectDest = New-Object System.Drawing.Rectangle $destX, $destY, $width, $height
$rectSrc = New-Object System.Drawing.Rectangle $minX, $minY, $width, $height

$g.DrawImage($bmp, $rectDest, $rectSrc, [System.Drawing.GraphicsUnit]::Pixel)

$markPngPath = Join-Path (Get-Location) "public\brightflow-mark.png"
$targetSquare.Save($markPngPath, [System.Drawing.Imaging.ImageFormat]::Png)

# Also create app.ico
$icoSize = 256
$icoBmp = New-Object System.Drawing.Bitmap $icoSize, $icoSize
$gIco = [System.Drawing.Graphics]::FromImage($icoBmp)
$gIco.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$gIco.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$gIco.DrawImage($targetSquare, 0, 0, $icoSize, $icoSize)

$hIcon = $icoBmp.GetHicon()
$icon = [System.Drawing.Icon]::FromHandle($hIcon)
$icoStream = [System.IO.File]::OpenWrite((Join-Path (Get-Location) "public\app.ico"))
$icon.Save($icoStream)
$icoStream.Close()

# Also copy to %LocalAppData%\ProjectVaultHub\app.ico
$localAppDir = Join-Path $env:LOCALAPPDATA "ProjectVaultHub"
if (Test-Path $localAppDir) {
    Copy-Item "public\app.ico" (Join-Path $localAppDir "app.ico") -Force
}

$bmp.Dispose()
$targetSquare.Dispose()
$icoBmp.Dispose()
$g.Dispose()
$gIco.Dispose()
Write-Output "Successfully generated brightflow-mark.png and app.ico!"
