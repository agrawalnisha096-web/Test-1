"""Builds the client presentation as one self-contained HTML file.

Replaces {{IMG:nn}} with the matching ad from paid-social/meta-ads/ (converted to WebP)
and {{LOGO_WHITE}} with the white Qubik logo, all as data URIs.
Usage: python3 paid-social/presentation/src/build.py
"""
import base64, glob, io, os, re
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..', '..'))
ADS = os.path.join(ROOT, 'paid-social', 'meta-ads')
OUT = os.path.join(ROOT, 'paid-social', 'presentation', 'Qubik-Paid-Social-Plan.html')

html = open(os.path.join(HERE, 'template.html'), encoding='utf-8').read()

def ad_uri(num):
    path = glob.glob(os.path.join(ADS, num + '-*.png'))[0]
    buf = io.BytesIO()
    Image.open(path).convert('RGB').save(buf, 'WEBP', quality=82)
    return 'data:image/webp;base64,' + base64.b64encode(buf.getvalue()).decode()

html = re.sub(r'\{\{IMG:(\d\d)\}\}', lambda m: ad_uri(m.group(1)), html)
logo = open(os.path.join(ROOT, 'google-ads', 'landing-assets', 'qubik-logo-white.svg'), 'rb').read()
html = html.replace('{{LOGO_WHITE}}', 'data:image/svg+xml;base64,' + base64.b64encode(logo).decode())
assert not re.search(r'\{\{(IMG:\d|LOGO_WHITE)', html), 'unreplaced placeholder'
open(OUT, 'w', encoding='utf-8').write(html)
print('wrote', OUT, os.path.getsize(OUT) // 1024, 'KB')
