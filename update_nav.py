import os
import glob
import re

html_files = glob.glob('*.html')

for filepath in html_files:
    with open(filepath, 'r') as file:
        content = file.read()
    
    # 1. Desktop Nav active class replacement
    # Match: <a href="..." aria-current="page"[newlines/spaces]class="text-primary font-medium hover:text-primary transition-colors py-2 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary">Text</a>
    pattern_desktop = re.compile(r'(<a\s+href="[^"]+"\s+)aria-current="page"(\s+)class="text-primary font-medium hover:text-primary transition-colors py-2 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary"')
    
    content = pattern_desktop.sub(r'\1\2class="text-text-main font-medium hover:text-primary transition-colors py-2"', content)
    
    # Also handle the case where class is on the same line as aria-current without newline
    pattern_desktop_2 = re.compile(r'(<a\s+href="[^"]+")\s+aria-current="page"\s+class="text-primary font-medium hover:text-primary transition-colors py-2 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary"')
    content = pattern_desktop_2.sub(r'\1 class="text-text-main font-medium hover:text-primary transition-colors py-2"', content)
    
    # 2. Mobile Nav active class replacement
    # Match: <a href="..." aria-current="page" class="block text-2xl font-bold text-primary">Text</a>
    pattern_mobile = re.compile(r'(<a\s+href="[^"]+"\s+)aria-current="page"\s*class="block text-2xl font-bold text-primary"')
    content = pattern_mobile.sub(r'\1class="block text-2xl font-medium text-text-main hover:text-primary transition-colors"', content)
    
    # For projects.html case where attributes are arranged slightly differently
    pattern_mobile_2 = re.compile(r'(<a\s+href="[^"]+")\s+aria-current="page"\s*\n?\s*class="block text-2xl font-bold text-primary"')
    content = pattern_mobile_2.sub(r'\1 class="block text-2xl font-medium text-text-main hover:text-primary transition-colors"', content)

    # Some project pages might have just: aria-current="page"\n class="block text-2xl font-bold text-primary"
    
    with open(filepath, 'w') as file:
        file.write(content)
        
print("HTML navs cleaned!")
