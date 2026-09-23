# Baut tools/maklerzuschnitt/index.html: Fonts und Logo aus assets/ inline einbetten.
# build/build.mjs kopiert das Ergebnis nach dist/maklerzuschnitt.html (URL /maklerzuschnitt).
import base64, pathlib, re
root = pathlib.Path(__file__).parent
assets = root.parent.parent / "assets"
b64 = lambda p: base64.b64encode(p.read_bytes()).decode()
logo = (assets / "logo/unio-logo-black.svg").read_text()
logo = re.sub(r'width="[^"]*"', '', logo, count=1)
logo = re.sub(r'height="[^"]*"', '', logo, count=1)
logo = logo.replace("<svg ", '<svg class="logo" aria-label="UNIO" ', 1)
html = (root / "src/index.html").read_text()
html = (html.replace("%%PG_400%%", b64(assets / "fonts/PowerGrotesk-Regular.woff2"))
            .replace("%%PG_500%%", b64(assets / "fonts/PowerGrotesk-Medium.woff2"))
            .replace("%%JB%%", b64(assets / "fonts/jetbrains/jetbrains-mono-normal-300-700.woff2"))
            .replace("%%LOGO%%", logo))
(root / "index.html").write_text(html)
print("index.html", len(html) // 1024, "KB")
