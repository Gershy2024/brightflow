@echo off
chcp 65001 >nul
title BrightFlow Server (Port 3050)...
cd /d "%~dp0"

echo.
echo ========================================================
echo   BrightFlow - Custom Software. Smart Automation.
echo   Starting server on http://localhost:3050 ...
echo ========================================================
echo.

:: Open browser automatically to port 3050 after 3 seconds
start "" /b powershell -NoProfile -Command "Start-Sleep -Seconds 3; Start-Process 'http://localhost:3050'"

:: Start Next.js dev server on port 3050
call "C:\Program Files\nodejs\npm.cmd" run dev
