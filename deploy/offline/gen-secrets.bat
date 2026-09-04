@echo off
setlocal
rem ============================================================
rem  Generate deployment secrets: BETTER_AUTH_SECRET / CRON_SECRET
rem  and write them into config\.env (Windows batch version).
rem  Fully offline - uses only built-in Windows PowerShell.
rem
rem  Usage:
rem    gen-secrets.bat            generate + write into config\.env (auto backup)
rem    gen-secrets.bat --show     only generate and print, do not write
rem ============================================================
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0gen-secrets.ps1" %*
exit /b %errorlevel%
