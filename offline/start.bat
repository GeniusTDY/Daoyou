@echo off
setlocal
rem ============================================================
rem  One-click deploy: start (Windows batch wrapper -> start.ps1)
rem
rem  Usage:
rem    start.bat            start
rem    start.bat restart    restart
rem    start.bat status     show status
rem ============================================================
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0start.ps1" %*
exit /b %errorlevel%
