# Renders docs/*.html to PDF with headless Edge and reports page counts (limit: 2 pages each).
$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$dir = Split-Path -Parent $MyInvocation.MyCommand.Path
foreach ($f in Get-ChildItem "$dir\*.html") {
  $pdf = Join-Path $dir ($f.BaseName + ".pdf")
  if (Test-Path $pdf) { Remove-Item $pdf -Force }
  $url = "file:///" + ($f.FullName -replace '\\', '/')
  $tmp = Join-Path $env:TEMP ("edge-pdf-" + [guid]::NewGuid())
  & $edge --headless=new --disable-gpu --no-pdf-header-footer --user-data-dir="$tmp" --print-to-pdf="$pdf" $url 2>$null | Out-Null
  Start-Sleep -Milliseconds 500
  $bytes = [System.IO.File]::ReadAllBytes($pdf)
  $text = [System.Text.Encoding]::ASCII.GetString($bytes)
  $pages = ([regex]::Matches($text, "/Type\s*/Page[^s]")).Count
  "{0,-28} {1} page(s)  {2:N0} KB" -f $f.Name, $pages, ($bytes.Length / 1KB)
}
