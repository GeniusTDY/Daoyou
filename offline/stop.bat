@echo off
setlocal
rem ============================================================
rem  One-click stop (Windows batch wrapper -> stop.ps1)
rem ============================================================
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0stop.ps1" %*
exit /b %errorlevel%
