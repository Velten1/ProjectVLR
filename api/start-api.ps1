# Script para iniciar a API com as variáveis de ambiente corretas

Write-Host "🔄 Parando processos Node.js existentes..." -ForegroundColor Yellow
Get-Process | Where-Object {$_.ProcessName -like "*node*"} | Stop-Process -Force -ErrorAction SilentlyContinue

Write-Host "⏳ Aguardando liberação da porta..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

Write-Host "🚀 Iniciando API..." -ForegroundColor Green
$env:DATABASE_URL="mysql://root:123456789@localhost:3306/authApi"
$env:JWT_SECRET="Kj8#mN2$pL9@vX7!qW4%rT6&uY1*iO3+eR5-sD0=aF8"
$env:PORT="3001"

Write-Host "✅ Variáveis de ambiente definidas:" -ForegroundColor Green
Write-Host "   DATABASE_URL: $env:DATABASE_URL" -ForegroundColor Cyan
Write-Host "   JWT_SECRET: [OCULTO]" -ForegroundColor Cyan
Write-Host "   PORT: $env:PORT" -ForegroundColor Cyan

Write-Host "`n🎮 API rodando em: http://localhost:3001" -ForegroundColor Green
Write-Host "🛑 Para parar: Ctrl+C" -ForegroundColor Yellow

yarn dev
