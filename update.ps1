$images = @(
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80'
)
$files = Get-ChildItem -Filter *.html
$global:idx = 0

foreach ($file in $files) {
    if ($file.Name -match "index.html|contact.html|services.html|about.html|case") { continue }
    
    $content = Get-Content $file.FullName -Raw
    
    # Replace images/blog/*
    $newContent = [System.Text.RegularExpressions.Regex]::Replace($content, 'src="images/blog/[^"]+"', {
        param($match)
        $url = $images[$global:idx % $images.Length]
        $global:idx++
        return 'src="' + $url + '"'
    })
    
    if ($content -cne $newContent) {
        Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8
        Write-Host "Updated images in $($file.Name)"
    }
}
Write-Host "Done!"
