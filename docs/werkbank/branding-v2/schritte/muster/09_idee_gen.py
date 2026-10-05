# Erzeugt 09_idee.html im selben Ordner. Aufruf: python3 09_idee_gen.py
# Alle Maße werden hier gerechnet, damit das Muster und 09_idee.md 3.12 dieselben Zahlen tragen.
import math, pathlib

OUT = pathlib.Path(__file__).with_name("09_idee.html")

# Post 1080 x 1350, 3:4-Fenster mittig
PW, PH = 1080.0, 1350.0
FW = PH * 3 / 4            # 1012.5
FX = (PW - FW) / 2         # 33.75
RAND = 72.0                # Rand innerhalb des Fensters (Arbeitswert, Schritt 10 setzt ihn)
NUTZ = FW - 2 * RAND       # 868.5
LINIE_Y = 1230.0           # Unterkante der sicheren Fläche
STRICH = 6.0               # Mindeststrich, 0,76 pt im Raster
END_H = 56.0               # Endstrich, 7,1 pt im Raster
ETIKETT = 92.0             # = grammatik.minTextKachelPx
ETIKETT_Y = LINIE_Y - 44   # Grundlinie des Etiketts

def laenge(wochen):
    w = max(1.0, min(260.0, wochen))
    return 0.12 + 0.88 * math.log(w) / math.log(260)

W11 = 11.0
W1J = 365 / 7
W2J = 730 / 7

INK = "#0B0A09"; PAPER = "#F7F5F1"; LUECKE = "#E6E0D5"; TISCH = "#D4CCBE"; HATCH = "rgba(11,10,9,0.16)"

def hatch_def(pid):
    return (f'<defs><pattern id="{pid}" width="34" height="34" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">'
            f'<line x1="0" y1="0" x2="0" y2="34" stroke="{HATCH}" stroke-width="3"/></pattern></defs>')

def zeitmass(x0, etikett, wochen=None, punkt=False, gross=None, leer=False):
    """Zeitmaß ab x0 (linker Rand der Nutzfläche). gross: Etikettgröße bei Bildträger."""
    s = []
    grad = gross or ETIKETT
    ety = ETIKETT_Y if not gross else LINIE_Y - 60
    top = LINIE_Y - END_H / 2 - 8
    bot = LINIE_Y + END_H / 2 - 8
    if punkt:
        s.append(f'<line x1="{x0+STRICH/2:.1f}" y1="{top:.1f}" x2="{x0+STRICH/2:.1f}" y2="{bot:.1f}" stroke="{INK}" stroke-width="{STRICH}"/>')
        if leer:
            s.append(f'<rect x="{x0+30:.1f}" y="{ety-ETIKETT*0.74:.1f}" width="560" height="{ETIKETT*0.92:.1f}" fill="none" stroke="{INK}" stroke-width="3" stroke-dasharray="14 10" opacity="0.55"/>')
            s.append(f'<text x="{x0+56:.1f}" y="{ety-12:.1f}" font-family="Power Grotesk" font-size="46" fill="{INK}" opacity="0.6">Datum aus dem Beleg</text>')
        else:
            s.append(f'<text x="{x0+30:.1f}" y="{ety:.1f}" class="et" font-size="{grad}">{etikett}</text>')
        return "".join(s)
    L = laenge(wochen) * NUTZ
    s.append(f'<line x1="{x0:.1f}" y1="{LINIE_Y:.1f}" x2="{x0+L:.1f}" y2="{LINIE_Y:.1f}" stroke="{INK}" stroke-width="{STRICH}"/>')
    for xx in (x0 + STRICH / 2, x0 + L - STRICH / 2):
        s.append(f'<line x1="{xx:.1f}" y1="{top:.1f}" x2="{xx:.1f}" y2="{bot:.1f}" stroke="{INK}" stroke-width="{STRICH}"/>')
    s.append(f'<text x="{x0:.1f}" y="{ety:.1f}" class="et" font-size="{grad}">{etikett}</text>')
    return "".join(s)

def luecke_foto(x, w, pid, kopf=None, waag=True):
    """Lückenfläche: Schraffur heißt Material fehlt. kopf: 'halbnah' oder 'nah' zeichnet die Kopfzone als Crop-Maß."""
    s = [f'<rect x="{x}" y="0" width="{w}" height="{PH}" fill="{LUECKE}"/>',
         f'<rect x="{x}" y="0" width="{w}" height="{PH}" fill="url(#{pid})"/>']
    if waag:
        s.append(f'<rect x="{x}" y="{LINIE_Y}" width="{w}" height="{PH-LINIE_Y}" fill="{TISCH}"/>')
    if kopf:
        kh = 0.20 * PH if kopf == "halbnah" else 0.40 * PH
        kw = kh * 0.74
        cx = x + w * 0.44
        ktop = 300 if kopf == "halbnah" else 250
        s.append(f'<rect x="{cx-kw/2:.1f}" y="{ktop:.1f}" width="{kw:.1f}" height="{kh:.1f}" rx="{kw/2:.1f}" fill="{PAPER}" fill-opacity="0.55" stroke="{INK}" stroke-opacity="0.45" stroke-width="4"/>')
        rtop = ktop + kh + (70 if kopf == "halbnah" else 60)
        rw = kw * (2.9 if kopf == "halbnah" else 2.2)
        s.append(f'<path d="M{cx-rw/2:.1f},{LINIE_Y:.1f} L{cx-rw/2:.1f},{rtop+120:.1f} Q{cx-rw/2:.1f},{rtop:.1f} {cx-rw/2+140:.1f},{rtop:.1f} L{cx+rw/2-140:.1f},{rtop:.1f} Q{cx+rw/2:.1f},{rtop:.1f} {cx+rw/2:.1f},{rtop+120:.1f} L{cx+rw/2:.1f},{LINIE_Y:.1f}" fill="{PAPER}" fill-opacity="0.4" stroke="{INK}" stroke-opacity="0.45" stroke-width="4"/>')
    return "".join(s)

def text_block(x, y, zeilen, grad, gewicht=400):
    out = []
    for i, z in enumerate(zeilen):
        out.append(f'<text x="{x:.1f}" y="{y + i*grad*1.08:.1f}" font-family="Power Grotesk" font-weight="{gewicht}" font-size="{grad}" letter-spacing="-0.02em" fill="{INK}">{z}</text>')
    return "".join(out)

STYLE_SVG = f'<style>.et{{font-family:"Outfit", system-ui, sans-serif;font-weight:400;fill:{INK};font-variant-numeric:tabular-nums;letter-spacing:-0.02em}}</style>'

# ---------- Posts 1080 x 1350 ----------
def post(inhalt, pid, fenster=True):
    g = [f'<svg viewBox="0 0 {PW:.0f} {PH:.0f}" class="post" role="img">', STYLE_SVG, hatch_def(pid),
         f'<rect width="{PW}" height="{PH}" fill="{PAPER}"/>', inhalt]
    if fenster:
        for xx in (FX, PW - FX):
            g.append(f'<line x1="{xx}" y1="0" x2="{xx}" y2="{PH}" stroke="{INK}" stroke-width="2" stroke-dasharray="10 10" opacity="0.45"/>')
    g.append("</svg>")
    return "".join(g)

X0P = FX + RAND  # linker Rand der Nutzfläche im Post

post_spanne = post(
    luecke_foto(0, PW, "hp1") +
    text_block(X0P, 250, ["Zinshaus Sievering"], 92) +
    zeitmass(X0P, "11 Wochen", W11), "hp1")

post_punkt = post(
    luecke_foto(0, PW, "hp2", kopf="halbnah") +
    zeitmass(X0P, "", punkt=True, leer=True), "hp2")

post_traeger = post(
    text_block(X0P, 250, ["Erbengemeinschaft,", "Döbling"], 92) +
    zeitmass(X0P, "2 Jahre", W2J, gross=200), "hp3")

# ---------- Raster: Fenster 1012,5 x 1350 ----------
def kachel(art, pid, kopf):
    g = [f'<svg viewBox="0 0 {FW} {PH}" class="k" role="img">', STYLE_SVG, hatch_def(pid),
         f'<rect width="{FW}" height="{PH}" fill="{PAPER}"/>']
    x0 = RAND
    if art == "portraet":
        g.append(luecke_foto(0, FW, pid, kopf=kopf))
    elif art == "claim":
        g.append(luecke_foto(0, FW, pid, kopf=kopf))
        g.append(text_block(x0, 200, ["Zeit ist Teil", "des Preises."], 118))
    elif art == "spanne11":
        g.append(luecke_foto(0, FW, pid))
        g.append(text_block(x0, 200, ["Zinshaus Sievering"], 92))
        g.append(zeitmass(x0, "11 Wochen", W11))
    elif art == "reel2j":
        g.append(luecke_foto(0, FW, pid, kopf=kopf))
        g.append(zeitmass(x0, "2 Jahre", W2J))
    elif art == "traeger1j":
        g.append(text_block(x0, 200, ["Abschlüsse", "2025"], 92))
        g.append(zeitmass(x0, "1 Jahr", W1J, gross=200))
    elif art == "luecke":
        g.append(luecke_foto(0, FW, pid, waag=False))
        g.append(f'<rect x="{x0}" y="{LINIE_Y-8-END_H/2}" width="{NUTZ*0.5:.1f}" height="{END_H}" fill="none" stroke="{INK}" stroke-width="4" stroke-dasharray="16 12" opacity="0.6"/>')
    g.append("</svg>")
    return "".join(g)

FOLGE = [  # schematische Folge, zwei Gesichter je Reihe, acht von zwölf
    ("portraet", "C2 C3"), ("spanne11", "C1 C3"), ("claim", "C2 C3"),
    ("reel2j", "C1 C2"), ("portraet", "C2 C3"), ("traeger1j", "C1 C3"),
    ("luecke", "Lücke"), ("portraet", "C2 C3"), ("portraet", "C2 C3"),
    ("portraet", "C2 C3"), ("portraet", "C2 C3"), ("luecke", "Lücke"),
]

def raster(kopf, praefix):
    zellen = []
    for i, (art, codes) in enumerate(FOLGE):
        zellen.append(f'<div class="zelle">{kachel(art, f"{praefix}{i}", kopf)}</div>')
    return '<div class="raster">' + "".join(zellen) + "</div>"

def skala():
    breite = 868.5
    punkte = [("1 Woche", 1), ("4 Wochen", 4), ("11 Wochen", W11), ("26 Wochen", 26), ("1 Jahr", W1J), ("2 Jahre", W2J), ("5 Jahre", 260)]
    zeilen = []
    for name, w in punkte:
        l = laenge(w)
        zeilen.append(
            f'<div class="sz"><span class="sn">{name}</span>'
            f'<span class="sb"><span class="sl" style="width:{l*100:.2f}%"></span></span>'
            f'<span class="sv">{l:.3f}</span><span class="sv">{l*breite:.0f} px</span></div>')
    return "".join(zeilen)

html = f'''<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Muster Zeitmaß</title>
<link rel="stylesheet" href="../../../../../tokens/fonts.css">
<style>
/* Muster zu 09_idee.md, Abschnitte 3.7, 3.11 und 3.12. Erzeugt mit einem Skript, alle Maße gerechnet.
   Werkbank-Typografie für Notizen. In den Kacheln eine neutrale Skizzenschrift (Power Grotesk, Etiketten in
   Outfit (Tabellenziffern über tnum)n); die Markenschrift entsteht erst in Schritt 10.
   Das Zeitmaß steht in der Textfarbe: die Akzentfarbe ist offen, bis vorab.logoAlt vorliegt.
   Schraffur heißt: Material fehlt. Kein generiertes Gesicht, keine fremden Bilder, keine Verläufe. */
:root {{
  --paper: #F7F5F1; --ink: #0B0A09; --ink-2: #1B1A16; --ink-3: #383429;
  --muted: rgba(27, 26, 22, 0.62); --hair: rgba(11, 10, 9, 0.14);
  --grot: "Power Grotesk", "Helvetica Neue", sans-serif;
  --mono: "Outfit", system-ui, sans-serif;
}}
* {{ box-sizing: border-box; }}
body {{ margin: 0; background: #D9D4CA; color: var(--ink-2); font-family: var(--grot); -webkit-font-smoothing: antialiased; }}
.seite {{ padding: 64px; max-width: 1680px; }}
h1 {{ font-weight: 400; font-size: 44px; line-height: 1.04; letter-spacing: -0.03em; color: var(--ink); margin: 0; }}
.lead {{ font-size: 17px; line-height: 1.5; max-width: 760px; margin: 16px 0 0; }}
h2 {{ font-weight: 400; font-size: 28px; line-height: 1.1; letter-spacing: -0.02em; color: var(--ink); margin: 0; padding-top: 18px; border-top: 1.5px solid var(--ink); }}
.teil {{ margin-top: 64px; }}
.reihe {{ display: flex; flex-wrap: wrap; gap: 40px; margin-top: 28px; align-items: flex-start; }}
.stueck {{ display: flex; flex-direction: column; gap: 12px; }}
.post {{ width: 389px; height: 486px; display: block; box-shadow: 0 0 0 1px var(--hair); }}
.notiz {{ font-size: 14px; line-height: 1.45; color: var(--ink-3); max-width: 389px; }}
.notiz b {{ font-weight: 500; color: var(--ink); }}
.m {{ font-family: var(--mono); font-size: 12.5px; }}
.tel {{ width: 390px; background: var(--paper); border-radius: 28px; overflow: hidden; box-shadow: 0 0 0 1px var(--hair); padding-bottom: 20px; }}
.kopf {{ padding: 22px 18px 16px; font-size: 15px; line-height: 1.35; border-bottom: 1px solid var(--hair); }}
.kopf b {{ font-weight: 500; font-size: 17px; color: var(--ink); display: block; }}
.raster {{ display: grid; grid-template-columns: repeat(3, 129.33px); gap: 1px; background: var(--paper); }}
.zelle {{ width: 129.33px; height: 172.44px; }}
.k {{ width: 100%; height: 100%; display: block; }}
.skala {{ max-width: 760px; margin-top: 24px; border-top: 1px solid var(--hair); }}
.sz {{ display: grid; grid-template-columns: 110px 1fr 70px 70px; gap: 16px; align-items: center; padding: 10px 0; border-bottom: 1px solid var(--hair); font-size: 15px; }}
.sb {{ display: block; height: 14px; position: relative; }}
.sl {{ display: block; height: 3px; background: var(--ink); position: absolute; top: 5px; left: 0; }}
.sl::before, .sl::after {{ content: ""; position: absolute; top: -5px; width: 3px; height: 13px; background: var(--ink); }}
.sl::before {{ left: 0; }} .sl::after {{ right: 0; }}
.sv {{ font-family: var(--mono); font-size: 13px; text-align: right; font-variant-numeric: tabular-nums; }}
.formel {{ font-family: var(--mono); font-size: 14px; margin-top: 18px; color: var(--ink); }}
.legende {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 12px 40px; margin-top: 24px; max-width: 1100px; }}
@media (max-width: 700px) {{ .seite {{ padding: 24px 16px; }} .post {{ width: 100%; height: auto; }} }}
</style>
</head>
<body>
<div class="seite">
<h1>Das Zeitmaß, Markus Leitner, Idee Version 1</h1>
<p class="lead">Neben jedem Preis steht seine Zeit. Das Muster zeigt das Zeichen in Anwendung und in echter Größe der Profilansicht, bevor es irgendwo allein steht. Dauern nur aus Belegen (Schritt 7, b1, b2, b5). Wo Material fehlt, steht Schraffur statt eines erfundenen Bilds.</p>

<div class="teil">
<h2>Zwei Zustände und der Bildträger, 1080 mal 1350</h2>
<div class="reihe">
  <div class="stueck">{post_spanne}
    <div class="notiz"><b>Spanne.</b> Belegte Dauer, Zinshaus Sievering, 11 Wochen (b2, Selbstauskunft). Länge 0,499 der Nutzfläche, also {laenge(W11)*NUTZ:.0f} von {NUTZ:.1f} px. Gestrichelt: das 3:4-Fenster der Profilansicht. Die Waagrechte im Foto liegt auf der Höhe der Linie.</div></div>
  <div class="stueck">{post_punkt}
    <div class="notiz"><b>Punkt.</b> Ein belegter Zeitpunkt oder der Stand einer Marktzahl, sonst nichts. Für Markus liegt kein datierter Beleg vor, darum zeigt das Muster den Lückenzustand der Werkstatt. Auf Kacheln ohne Zahl steht das Zeitmaß nie.</div></div>
  <div class="stueck">{post_traeger}
    <div class="notiz"><b>Bildträger.</b> Die Endkarte einer Folge: dasselbe Zeichen an derselben Stelle, das Etikett auf 200 px. Erbengemeinschaft, 2 Jahre, Länge 0,855 (b1). Die Unterlage fehlt, darum intern bis zur Prüfung, nie öffentlich.</div></div>
</div>
</div>

<div class="teil">
<h2>Profilansicht, drei Spalten, echte Größe: Empfehlung und Gegenentwurf</h2>
<div class="reihe">
  <div class="stueck"><div class="tel"><div class="kopf"><b>Markus Leitner</b>Empfehlung, Ausschnitt halbnah, Kopf 20 Prozent der Fensterhöhe</div>{raster("halbnah", "e")}</div></div>
  <div class="stueck"><div class="tel"><div class="kopf"><b>Markus Leitner</b>Gegenentwurf, Ausschnitt nah, Kopf 40 Prozent der Fensterhöhe</div>{raster("nah", "g")}</div></div>
  <div class="stueck"><div class="notiz"><b>Was man hier prüft.</b> Kachelbreite 129 pt wie auf einem 390 pt breiten Telefon. Das Etikett mit 92 px auf 1080 wird hier etwa 11,7 pt groß, der Strich von 6 px etwa 0,76 pt, der Endstrich etwa 7 pt.<br><br>
  <b>Die Linie durch die Reihe.</b> In jeder Kachel liegt eine Waagrechte auf derselben Höhe: das Zeitmaß, die Tischkante oder die Schulterlinie. In der Reihe lesen sie sich als eine Linie.<br><br>
  <b>Codes je Kachel.</b> Reihe 1: Gesicht mit Waagrechte, Zeitmaß mit Waagrechte im Foto, Gesicht mit Claim. Reihe 2: Gesicht mit Zeitmaß, Gesicht, Zeitmaß als Bildträger. Kacheln ohne Gesicht und ohne belegte Zahl gibt es nicht; wo die Zahl fehlt (Anlegerwohnung Währing, Dauer fehlt), steht eine Lückenkachel.<br><br>
  <b>Die Achse.</b> Beide Fassungen haben dieselben Worte, dieselben Zahlen, dieselbe Folge. Nur der Ausschnitt der Porträts wechselt.<br><br><b>Befund am Muster.</b> Im nahen Ausschnitt stößt der Claim oben rechts an die Kopfzone. Der Gegenentwurf braucht für Porträts mit Text eine eigene Textlage im Bildfeld (erlaubtes Feld der Achse in Schritt 12), sonst fällt er im Stresstest.<br><br>
  <span class="m">Folge schematisch, nicht die Folge aus Schritt 13.</span></div></div>
</div>
</div>

<div class="teil">
<h2>Die Skala</h2>
<p class="formel">Länge = 0,12 + 0,88 × ln(Dauer in Wochen) / ln(260), Dauer in Wochen gleich Kalendertage durch 7, zwischen 1 und 260 Wochen, darüber 1,0</p>
<div class="skala">{skala()}</div>
<p class="lead">Nutzfläche im 3:4-Fenster 868,5 px (Fenster 1012,5 px, Rand 72 px je Seite, Arbeitswert bis Schritt 10). Zwei Jahre (730 Tage, 104,3 Wochen) ergeben 0,855, elf Wochen 0,499, also knapp die Hälfte, also knapp sechs Siebtel (6/7 = 0,857). Die Länge ist die einzige Variable des Zeichens.</p>
</div>

<div class="teil">
<h2>Maße</h2>
<div class="legende">
  <div class="notiz"><b>Strich</b> mindestens 6 px auf 1080, im Raster etwa 0,76 pt, auf einem Bildschirm mit dreifacher Dichte gut zwei Pixel.</div>
  <div class="notiz"><b>Endstrich</b> 56 px hoch, im Raster etwa 7 pt, damit Spanne und Punkt auch klein unterscheidbar bleiben.</div>
  <div class="notiz"><b>Etikett</b> mindestens 92 px, gleich <span class="m">grammatik.minTextKachelPx</span> aus Schritt 12, Tabellenziffern.</div>
  <div class="notiz"><b>Lage</b> Linie bei 1230 px, das sind 91 Prozent der Höhe, bündig am linken Rand der Nutzfläche, in jedem Format an derselben relativen Stelle.</div>
</div>
</div>
</div>
</body>
</html>
'''
OUT.write_text(html, encoding="utf-8")
print("ok", OUT, len(html))
