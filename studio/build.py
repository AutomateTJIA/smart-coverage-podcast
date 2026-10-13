"""Build the Podcast Studio page.

  python3 studio/build.py

Makes two copies from studio/src/studio-template.html:
  studio/site/index.html        hosted site (studio.thejordaninsuranceagency.com, via Vercel)
  studio/podcast-studio.html    single-file copy for the private Claude artifact (images inlined)
  studio/site/playbook.html     Studio Playbook, copied from studio/src/playbook.html
"""
import base64, pathlib
HERE = pathlib.Path(__file__).parent
t = (HERE / 'src' / 'studio-template.html').read_text()
t = t.replace('#3B4F70', 'rgba(22,58,112,.82)').replace('#6C7E9C', 'rgba(22,58,112,.5)')

head = ('<!doctype html><html lang="en"><head><meta charset="utf-8">'
        '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">'
        '<meta name="robots" content="noindex,nofollow">'
        '<style>*{box-sizing:border-box}body{margin:0;font:14px system-ui,sans-serif}img{max-width:100%}[hidden]{display:none!important}</style>'
        '</head><body>')
site = head + t.replace('{{COVER}}', '').replace('{{LOGO}}', '') + '</body></html>'
site = site.replace('data:image/jpeg;base64,', 'cover.jpg').replace('data:image/png;base64,', 'logo.png')
(HERE / 'site' / 'index.html').write_text(site)

b64 = lambda p: base64.b64encode((HERE / 'site' / p).read_bytes()).decode()
art = t.replace('{{COVER}}', b64('cover.jpg')).replace('{{LOGO}}', b64('logo.png'))
(HERE / 'podcast-studio.html').write_text(art)
# The Studio Playbook (one page for the team) is published as-is next to the studio page.
(HERE / 'site' / 'playbook.html').write_text((HERE / 'src' / 'playbook.html').read_text())
print('built', len(site), len(art))
