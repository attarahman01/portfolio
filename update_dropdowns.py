import os
import glob
import re

html_files = glob.glob('*.html')
for file in html_files:
    with open(file, 'r') as f:
        content = f.read()
    
    # Regex to capture the el-dropdown block
    pattern = r'(<!-- Profile dropdown.*?-->\s*)<el-dropdown[^>]*>.*?<img([^>]*)>.*?</el-dropdown>'
    
    # Replacement string with just the image wrapper
    replacement = r'<!-- Profile image -->\n                        <div class="relative ml-4">\n                            <img\g<2>>\n                        </div>'
    
    new_content, count = re.subn(pattern, replacement, content, flags=re.DOTALL)
    if count > 0:
        with open(file, 'w') as f:
            f.write(new_content)
        print(f"Updated {file}")

