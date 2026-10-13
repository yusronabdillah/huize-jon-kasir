import re

def build():
    # Read old file
    with open('Aplikasi_Kasir_VPOS.html', 'r', encoding='utf-8') as f:
        old_content = f.read()
    
    # Extract library code (qrcode + idb-keyval)
    # Starts with <script type="module" crossorigin> or similar
    # Ends right before `var C=[{id:"p1"` (the old product array)
    match = re.search(r'(<script type="module" crossorigin>.*?)(?=var C=\[\{id:"p1")', old_content, re.DOTALL)
    if not match:
        # Fallback if pattern fails
        print("Could not find library block, extracting manually by keyword")
        idx_start = old_content.find('<script')
        idx_end = old_content.find('var C=[{id:"p1"')
        if idx_start != -1 and idx_end != -1:
            lib_code = old_content[idx_start:idx_end]
        else:
            lib_code = "<script>" # emergency fallback
    else:
        lib_code = match.group(1)
        
    # Make sure we don't have the <script> tag if we wrap it later, but the match INCLUDES <script>
    # The match has <script type="module" crossorigin>...
    # We will close it properly at the end.
    
    # Clean it up a bit if it has a trailing `var ` or something
    
    # Read style
    with open('style.css', 'r', encoding='utf-8') as f:
        style_css = f.read()
        
    # Read main logic
    with open('main.js', 'r', encoding='utf-8') as f:
        main_js = f.read()

    html = f"""<!doctype html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Huize Jon Coffee - POS System</title>
    <style>
{style_css}
    </style>
  </head>
  <body>
    <div id="app"></div>
    <div id="toast-container" class="toast-container"></div>
    
{lib_code}
// --- NEW APP LOGIC ---
{main_js}
</script>
  </body>
</html>
"""

    with open('Aplikasi_Kasir_VPOS.html', 'w', encoding='utf-8') as f:
        f.write(html)
        
    print("Build successful!")

if __name__ == '__main__':
    build()
