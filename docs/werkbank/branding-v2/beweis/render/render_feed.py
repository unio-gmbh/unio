#!/usr/bin/env python3
"""Satzprobe des Startfeeds Markus Leitner (FEED_FINAL.md, Kapitel 3 und 6).

Rendert die zwoelf Kacheln in Produktionsgroesse, das Profilraster bei 375 pt,
das Storyboard der Signaturfolge Geraten 01 und die Sucher-Overlays.

Nur intern: Die Bilder sind Satzproben aus dem Repo (Status "vorschau"), keine
Kachel darf so veroeffentlicht werden. Nach dem Portraet-Termin werden nur die
Eintraege in QUELLEN ersetzt, Satz und Geometrie bleiben.

Aufruf:  FEED_FONTS=/pfad/zu/fonts python3 render_feed.py
Schriften (nicht im Repo): Newsreader[opsz,wght].ttf und
InstrumentSans[wdth,wght].ttf aus https://github.com/google/fonts (ofl/),
als Newsreader.ttf und InstrumentSans.ttf im Ordner FEED_FONTS.
Die Kursive laedt die Seite von fonts.googleapis.com.
"""
import html
import json
import math
import os
import shutil
import subprocess
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

HIER = Path(__file__).resolve().parent
ROOT = HIER.parents[4]
TMP = HIER / "_tmp"
FONTS = Path(os.environ.get("FEED_FONTS", HIER / "fonts"))
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

PAPIER, TINTE, HAAR = "#F5F1EA", "#191714", "#AFAAA3"
NACHT, NACHTF, KREIDE = "#141210", "#22201D", "#F1EEE7"
AMBERH, FLAECHE = "#D29754", "#EAE6DD"

POST = (1080, 1350)
REEL = (1080, 1920)
S_REEL = 1.0667  # Umrechnung Post -> Reel-Titelbild (E1)


def laenge(wochen):
    """Ratlinie im Post, MARKUS_MARKE 8.1."""
    w = min(max(wochen, 1), 260)
    return 842 * (0.12 + 0.88 * math.log(w) / math.log(260))


# ---------------------------------------------------------------- Bilder
def portrait_erweitert():
    """portrait-06.jpg mit 900 px Wand oben (nur Satzprobe, Wandton je Spalte
    aus den obersten 40 Zeilen gemittelt). Ohne diese Ergaenzung fehlt dem
    Studiobild der Kopfraum fuer 4:5 und 9:16."""
    ziel = TMP / "p06_ext.jpg"
    if ziel.exists():
        return ziel
    src = Image.open(ROOT / "assets/team/portrait-06.jpg").convert("RGB")
    w, h = src.size
    a = np.asarray(src).astype(float)
    wand = a[0:40].mean(0, keepdims=True)
    wand = np.asarray(
        Image.fromarray(wand.astype("uint8")).resize((w, 1)).filter(ImageFilter.BoxBlur(30))
    ).astype(float)
    ext = np.repeat(wand, 900, axis=0)
    out = np.concatenate([ext, a], 0).astype("uint8")
    Image.fromarray(out).save(ziel, quality=95)
    return ziel


# ---------------------------------------------------------------- SVG-Bausteine
def t(x, y, size, text, fam="NR", w=400, fill=TINTE, anchor="start", italic=False, tnum=False, wdth=None):
    stil = [f"font-size:{size}px", f"font-weight:{w}"]
    if fam == "NR":
        stil.append("font-family:" + ("'Newsreader'" if italic else "NR"))
        if italic:
            stil.append("font-style:italic")
    else:
        stil.append("font-family:IS")
    if tnum:
        stil.append("font-feature-settings:'tnum' 1")
    if wdth:
        stil.append(f"font-variation-settings:'wdth' {wdth}")
    return (f'<text x="{x}" y="{y}" fill="{fill}" text-anchor="{anchor}" '
            f'style="{";".join(stil)}">{text}</text>')


def zahl(x, y, gross, einheit, groesse, fill):
    """Kennzahl in Newsreader, Einheit in Instrument Sans 0,42fach, 24 px Abstand."""
    e = round(groesse * 0.42)
    return (f'<text x="{x}" y="{y}" fill="{fill}">'
            f'<tspan style="font-family:NR;font-size:{groesse}px">{html.escape(gross)}</tspan>'
            f'<tspan dx="24" style="font-family:IS;font-weight:500;font-size:{e}px">{html.escape(einheit)}</tspan></text>')


def rect(x, y, w, h, fill):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{fill}"/>'


def foto(href, dst, src, ton=True):
    """dst=(x,y,w,h) in der Kachel, src=(sx,sy,sw) in der Quelle; sh folgt aus dem Seitenverhaeltnis."""
    x, y, w, h = dst
    sx, sy, sw = src
    sh = sw * h / w
    filt = ' filter="url(#ton)"' if ton else ""
    return (f'<svg x="{x}" y="{y}" width="{w}" height="{h}" viewBox="{sx:.1f} {sy:.1f} {sw:.1f} {sh:.1f}" '
            f'preserveAspectRatio="none"><image href="{href}"{filt}/></svg>')


VERSAL_IS = 0.72  # Versalhoehe Instrument Sans (OS/2 sCapHeight 720 bei 1000 upm)


def ratlinie_post(L, etikett=None, stand=False, farbe=AMBERH, text=KREIDE):
    """Strecke: Ratstrich 8 x 72 auf der Linie y 1231, Etikett darueber auf y 1196.
    Stand: kein Linienzug; das Etikett steht mit der Grundlinie auf y 1235 (Unterkante
    der Linie), der Ratstrich genau in Versalhoehe daneben (8 x 66, y 1169 bis 1235),
    24 px Abstand. So liest er sich als Satzzeichen des Etiketts, nicht als Cursor."""
    if stand:
        h = round(92 * VERSAL_IS)
        s = rect(119, 1235 - h, 8, h, farbe)
        if etikett:
            s += t(151, 1235, 92, etikett, fam="IS", w=500, fill=text, tnum=True)
        return s
    s = rect(119, 1195, 8, 72, farbe)
    s += rect(119, 1227, round(L), 8, farbe) + rect(119 + round(L) - 8, 1207, 8, 48, farbe)
    if etikett:
        s += t(151, 1196, 92, etikett, fam="IS", w=500, fill=text, tnum=True)
    return s


def ratlinie_reel(L_post, etikett, farbe=AMBERH, text=KREIDE):
    L = round(L_post * S_REEL)
    s = rect(91, 1515, 9, 77, farbe) + rect(91, 1549, L, 9, farbe) + rect(91 + L - 9, 1528, 9, 51, farbe)
    return s + t(125, 1516, 141, etikett, fam="IS", w=500, fill=text, tnum=True)


def motiv(x, y, zeilen, size=32):
    return "".join(t(x, y + i * round(size * 1.35), size, html.escape(z), fam="IS", fill=TINTE)
                   for i, z in enumerate(zeilen))


DEFS = """<defs><filter id="ton" color-interpolation-filters="sRGB"><feComponentTransfer>
<feFuncR type="linear" slope="0.863" intercept="0.098"/>
<feFuncG type="linear" slope="0.855" intercept="0.090"/>
<feFuncB type="linear" slope="0.840" intercept="0.078"/>
</feComponentTransfer></filter></defs>"""


def seite(svg_inhalt, groesse):
    """Die Grafik bleibt unsichtbar, bis alle Schriften geladen sind. Sonst malt Chrome
    headless einzelne 256-px-Kacheln mit der Ersatzschrift und aktualisiert sie nicht
    (Befund R11: Folio in k10 auf "Verbueche" abgeschnitten). Danach schreibt die Seite
    die Masse aller Textzeilen in #mass, die pruefe_satz() liest."""
    w, h = groesse
    return f"""<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@1,6..72,400&display=block">
<style>
@font-face{{font-family:NR;src:url('{(FONTS / "Newsreader.ttf").as_uri()}');font-weight:200 800;}}
@font-face{{font-family:IS;src:url('{(FONTS / "InstrumentSans.ttf").as_uri()}');font-weight:400 700;font-stretch:75% 100%;}}
html,body{{margin:0;background:{PAPIER}}} text{{font-optical-sizing:auto;font-kerning:normal}}
svg.warte{{visibility:hidden}} #mass{{display:none}}
</style></head><body>
<svg class="warte" xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">{DEFS}{svg_inhalt}</svg>
<script>
document.fonts.load("92px NR");document.fonts.load("500 92px IS");
document.fonts.ready.then(() => {{
  const svg = document.querySelector("svg");
  const m = [...svg.querySelectorAll("text")].map(e => {{ const b = e.getBBox();
    return [e.textContent, b.x, b.y, b.width, b.height]; }});
  const pre = document.createElement("pre"); pre.id = "mass"; pre.textContent = JSON.stringify(m);
  document.body.appendChild(pre); svg.classList.remove("warte");
}});
</script>
</body></html>"""


def chrome(html_text, name, groesse, dpr=1):
    TMP.mkdir(exist_ok=True)
    p = TMP / f"{name}.html"
    p.write_text(html_text, encoding="utf-8")
    png = TMP / f"{name}.png"
    subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars",
                    "--run-all-compositor-stages-before-draw",
                    f"--force-device-scale-factor={dpr}", f"--window-size={groesse[0]},{groesse[1]}",
                    "--virtual-time-budget=9000", "--allow-file-access-from-files",
                    f"--screenshot={png}", p.as_uri()], check=True,
                   stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    return png


def masse(name):
    """Liest die Textmasse der zuletzt gerenderten Seite (Chrome --dump-dom)."""
    p = TMP / f"{name}.html"
    out = subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--virtual-time-budget=9000",
                          "--allow-file-access-from-files", "--dump-dom", p.as_uri()],
                         check=True, capture_output=True, text=True).stdout
    a = out.find('<pre id="mass">')
    if a < 0:
        return None
    b = out.find("</pre>", a)
    return json.loads(html.unescape(out[a + len('<pre id="mass">'):b]))


def pruefe_satz(name, jpg, groesse):
    """Clipping-Pruefung je Kachel. (1) Jede Zeile liegt innerhalb der Kachel und endet
    vor der Satzkante (Post x 961, Reel x 989). (2) In den letzten 12 px jeder Zeile
    steht Farbe: Ist der Streifen einfarbig, fehlt das Zeilenende im Bild."""
    rechts = 961 if groesse == POST else 989
    fehler = []
    m = masse(name)
    if m is None:
        return [f"{name}: keine Masse, Schriften nicht geladen"]
    lum = np.asarray(Image.open(jpg).convert("L")).astype(int)
    for text, x, y, w, h in m:
        x1 = x + w
        if x < 0 or y < 0 or x1 > groesse[0] or y + h > groesse[1]:
            fehler.append(f"{name}: '{text}' ragt aus der Kachel")
        elif x1 > rechts + 1:
            fehler.append(f"{name}: '{text}' endet bei x {x1:.0f}, Satzkante {rechts}")
        streifen = lum[int(y):int(y + h), max(int(x1) - 12, 0):int(x1)]
        if streifen.size and streifen.max() - streifen.min() < 40:
            fehler.append(f"{name}: '{text}' ohne Farbe am Zeilenende (abgeschnitten?)")
    return fehler


# ---------------------------------------------------------------- Kacheln
def kacheln():
    P = portrait_erweitert().as_uri()
    ROOM = (ROOT / "assets/img/maxingstrasse-zimmer.jpg").as_uri()
    # Augen im Original y 435, Nasenachse x 740; im erweiterten Bild y + 900
    AUGE, NASE = 1335, 740

    def p_crop(s, nase_x, auge_y, breite):
        return (NASE - nase_x / s, AUGE - auge_y / s, breite / s)

    reel_nah = p_crop(1.19, 540, 917, 1080)
    k = {}

    k["k01"] = (POST, rect(0, 0, 1080, 1350, PAPIER) + rect(0, 400, 1080, 871, FLAECHE)
                + rect(0, 1230, 1080, 2, HAAR) + rect(750, 400, 2, 830, HAAR)
                + rect(0, 1080, 1080, 191, NACHTF)
                + motiv(151, 470, ["Bildlücke A1. Haustor seines Bürohauses in 1190,",
                                   "frontal, Kamera 1,20 m, Laibung auf der Spaltenlinie,",
                                   "Schwelle auf der Linie, Sockel dunkel."])
                + t(119, 190, 92, "Ein Zinshaus") + t(119, 286, 92, "in Sievering.")
                + ratlinie_post(laenge(11), "11 Wochen")
                + t(119, 1318, 32, "Verbüchert 01", fam="IS"))

    k["k02"] = (REEL, foto(P, (0, 0, 1080, 1920), reel_nah)
                + ratlinie_reel(laenge(104), "2 Jahre")
                + t(989, 1646, 34, "Geraten 01", fam="IS", fill=KREIDE, anchor="end"))

    k["k03"] = (POST, foto(P, (0, 0, 1080, 1350), p_crop(1.27, 540, 660, 1080))
                + t(119, 190, 92, "Geraten.") + t(119, 286, 92, "Staffel 1: Erbe.")
                + t(119, 1318, 48, "Dienstags um 11 Uhr.", fill=KREIDE))

    k["k04"] = (POST, rect(0, 0, 1080, 1350, NACHT)
                + t(119, 190, 92, "Meine Provision.", fill=KREIDE)
                + zahl(119, 930, "X,X", "Prozent", 220, KREIDE)
                + ratlinie_post(0, "Stand Nov. 2026", stand=True)
                + t(119, 1318, 32, "Vor der Unterschrift 02", fam="IS", fill=KREIDE))

    k["k05"] = (POST, rect(0, 0, 1080, 1350, PAPIER)
                + foto(P, (0, 400, 1080, 871), p_crop(1.22, 700, 300, 1080))
                + t(119, 190, 92, "Muss ich jetzt", italic=True) + t(119, 286, 92, "verkaufen?", italic=True)
                + t(961, 1318, 32, "Sprechstunde Sievering 01, 1 von 6", fam="IS", anchor="end", tnum=True))

    k["k06"] = (REEL, foto(P, (0, 0, 1080, 1920), reel_nah)
                + ratlinie_reel(laenge(39), "X Monate")
                + t(989, 1646, 34, "Geraten 04", fam="IS", fill=KREIDE, anchor="end"))

    k["k07"] = (POST, rect(0, 0, 1080, 1350, PAPIER) + rect(0, 400, 1080, 871, FLAECHE)
                + rect(0, 1230, 1080, 2, HAAR) + rect(960, 640, 2, 440, HAAR)
                + rect(0, 1080, 1080, 191, NACHTF)
                + motiv(151, 470, ["Bildlücke A2. Stiege seines Bürohauses,",
                                   "frontal, Anfängerpfosten auf der Spaltenlinie,",
                                   "Fußbodenlinie auf der Linie, Sockel dunkel."])
                + zahl(119, 290, "X.XXX", "€/m²", 176, TINTE)
                + t(119, 362, 48, "Zinshaus in Döbling.")
                + ratlinie_post(0, "Stand März 2026", stand=True)
                + t(119, 1318, 32, "Quelle: [Bericht, Seite]", fam="IS")
                + t(961, 1318, 32, "Stand Döbling 01, 1 von 6", fam="IS", anchor="end", tnum=True))

    k["k08"] = (REEL, rect(0, 0, 1080, 1920, FLAECHE) + rect(0, 1552, 1080, 2, HAAR)
                + motiv(91, 760, ["Bildlücke S3-weit. Öffentlicher Ort, den er nennt.",
                                  "Er sitzt rechts auf einer Mauer, höchstens ein",
                                  "Viertel der Kachelhöhe, Mauerkrone auf der Linie."], 34)
                + t(91, 443, 98, "Ortsname.") + t(91, 520, 51, "Älter als jeder Verkauf hier.")
                + t(91, 1646, 34, "Alteingesessen 01", fam="IS"))

    k["k09"] = (REEL, foto(P, (0, 0, 1080, 1920), reel_nah)
                + ratlinie_reel(laenge(6), "X Wochen")
                + t(989, 1646, 34, "Geraten 03", fam="IS", fill=KREIDE, anchor="end"))

    k["k10"] = (POST, rect(0, 0, 1080, 1350, NACHT)
                + zahl(119, 930, "8", "Prozent", 220, KREIDE)
                + t(119, 1016, 48, "über der Erstschätzung.", fill=KREIDE)
                + ratlinie_post(laenge(22), "X Monate")
                + t(119, 1318, 32, "Verbüchert 02, Währing", fam="IS", fill=KREIDE))

    # Raumprobe: Bodenlinie der Rueckwand im Original y 785 liegt auf y 1231
    k["k11"] = (POST, rect(0, 0, 1080, 1350, PAPIER)
                + foto(ROOM, (0, 400, 1080, 871), (214, 785 - 831 * 992 / 1080, 992))
                + t(119, 190, 92, "Zuerst lese ich") + t(119, 286, 92, "das Grundbuch.")
                + t(119, 1318, 32, "Vor der Unterschrift 01, 1 von 7", fam="IS", tnum=True))

    k["k12"] = (REEL, foto(P, (0, 0, 1080, 1920), reel_nah)
                + t(91, 1516, 141, "Eine Woche.", fill=KREIDE)
                + t(989, 1646, 34, "Geraten 02", fam="IS", fill=KREIDE, anchor="end"))
    return k


def wortmarke(x, y, groesse, fill, zeilen=("Markus", "Leitner")):
    """Wortmarke in fester Teilung (MARKUS_MARKE 9.1): Zelle 62/88 der Schriftgroesse,
    jede Letter in ihrer Zelle zentriert, Instrument Sans 500. Das M steht in der
    schmalen Fassung wdth 75 (Pflegebefund 9.1): bei 88 px 60 px Farbe in 62 px Zelle,
    Abstand zum a 8 px (vorher minus 1,5 px, das M stiess ans a)."""
    zelle = 62 * groesse / 88
    s = ""
    for zeile, wort in enumerate(zeilen):
        for i, ch in enumerate(wort):
            s += t(round(x + zelle * (i + 0.5), 1), round(y + zeile * groesse * 100 / 88), groesse, ch,
                   fam="IS", w=500, fill=fill, anchor="middle", wdth=75 if ch == "M" else None)
    return s


def endkarte(stufe):
    """Reel-Endkarte nach MARKUS_MARKE 9.4, Linie y 1232. stufe 0: Ratstrich,
    1: Linie halb, 2: fertig mit Etikett."""
    L = round(laenge(104) * S_REEL)
    s = rect(0, 0, 1080, 1920, NACHT)
    s += wortmarke(91, 420, 88, KREIDE)
    s += t(91, 700, 98, "Rat vor Auftrag.", fill=KREIDE)
    s += rect(91, 1194, 9, 77, AMBERH)
    if stufe >= 1:
        s += rect(91, 1228, L // 2 if stufe == 1 else L, 9, AMBERH)
    if stufe == 2:
        s += rect(91 + L - 9, 1207, 9, 51, AMBERH)
        s += t(125, 1190, 200, "2 Jahre", fam="IS", w=500, fill=KREIDE, tnum=True)
    s += t(989, 1320, 34, "Geraten 01", fam="IS", fill=KREIDE, anchor="end")
    return s


def untertitel(zeilen):
    """Untertitel im oberen Drittel auf der ruhigen Wand, Tinte (Befund aus dem Render:
    unten links beginnen sie auf der hellen Wand neben dem Sakko und verschwinden)."""
    return "".join(t(91, 330 + i * 60, 46, html.escape(z), fam="IS", fill=TINTE, tnum=True)
                   for i, z in enumerate(zeilen))


def storyboard_frames():
    P = portrait_erweitert().as_uri()
    AUGE, NASE = 1335, 740

    def clip(s, auge_y=700):
        return foto(P, (0, 0, 1080, 1920), (NASE - 540 / s, AUGE - auge_y / s, 1080 / s))

    luecke = (rect(0, 0, 1080, 1920, FLAECHE) + rect(0, 1231, 1080, 2, HAAR)
              + motiv(91, 700, ["Bildlücke B-Roll 1.", "Hände auf der geschlossenen", "Mappe, Tischkante auf der Linie."], 44))
    return [
        ("0,0 bis 2,2 s", "nah, Blick in die Kamera", "Zwei Jahre warten. Das war mein Rat.",
         clip(1.19) + untertitel(["Zwei Jahre warten.", "Das war mein Rat."])),
        ("2,2 bis 9,0 s", "halbnah", "Einer Erbengemeinschaft, statt unter Druck zu verkaufen. [WARUM DER DRUCK]",
         clip(1.05) + untertitel(["Einer Erbengemeinschaft, statt", "unter Druck zu verkaufen."])),
        ("9,0 bis 15,0 s", "Detail, B-Roll 1, Ton läuft", "[WAS ER IN DEN UNTERLAGEN SAH, ein Satz]", luecke),
        ("15,0 bis 23,0 s", "halbnah", "Nach 2 Jahren kamen sie zurück.",
         clip(1.05) + untertitel(["Nach 2 Jahren kamen", "sie zurück."])),
        ("23,0 bis 30,0 s", "nah", "Ihr Ergebnis lag um [GESPERRT] Euro höher.",
         clip(1.19) + untertitel(["Ihr Ergebnis lag um", "[GESPERRT] Euro höher."])),
        ("30,0 bis 41,0 s", "halbnah", "[WANN WARTEN FALSCH GEWESEN WÄRE, sein Satz]",
         clip(1.05) + untertitel(["[Wann Warten falsch", "gewesen wäre]"])),
        ("41,0 s", "Endkarte, Schnitt hart", "Ratstrich steht ab dem ersten Bild", endkarte(0)),
        ("42,2 bis 45,0 s", "Endkarte", "Linie 41,2 bis 42,0 s, Etikett ab 42,2 s", endkarte(2)),
    ]


# ---------------------------------------------------------------- Sucher-Overlay
def overlay(groesse, reel):
    w, h = groesse
    L = lambda x, y, ww, hh, c, o=1: f'<rect x="{x}" y="{y}" width="{ww}" height="{hh}" fill="{c}" fill-opacity="{o}"/>'
    lab = lambda x, y, txt, anchor="start": (
        f'<text x="{x}" y="{y}" text-anchor="{anchor}" style="font-family:IS;font-size:26px;font-weight:500" '
        f'fill="#FFFFFF" stroke="#000000" stroke-width="4" paint-order="stroke">{html.escape(txt)}</text>')
    s = ""
    if not reel:
        s += L(0, 0, 33.75, h, "#000", 0.35) + L(1046.25, 0, 33.75, h, "#000", 0.35)
        s += lab(40, 40, "Profilraster zeigt 3:4 zwischen den Rändern")
        for x in (119, 329.5, 540, 750.5, 961):
            s += L(x - 1, 0, 2, h, "#FFFFFF", 0.55)
        s += L(0, 400, w, 2, "#FFFFFF", 0.9) + lab(130, 385, "Satzart B: Foto beginnt hier, darüber Papier")
        s += L(0, 1211, w, 40, "#D29754", 0.45) + L(0, 1230, w, 2, "#D29754", 1)
        s += lab(130, 1205, "Kante auf der Linie: Band 89,7 bis 92,7 Prozent")
        s += (f'<rect x="119" y="1080" width="842" height="191" fill="none" stroke="#FFFFFF" stroke-width="3"/>'
              + lab(130, 1120, "Messfeld bis zur Satzkante: Mittel #3A3632 oder dunkler"))
        s += L(71, 1080, 104, 191, "#E06666", 0.35) + lab(71, 1300, "keine Kante x 71 bis 175")
        s += L(0, 600, w, 160, "#6FA8DC", 0.25) + lab(961, 590, "Augen nah: 44 bis 56 Prozent", "end")
        s += L(0, 100, w, 230, "#FFFFFF", 0.18) + lab(961, 90, "Titelfeld frei, y 100 bis 330 (Satzart V)", "end")
    else:
        s += L(0, 0, w, 240, "#000", 0.35) + L(0, 1680, w, 240, "#000", 0.35)
        s += lab(40, 225, "Profilraster zeigt 3:4 von 240 bis 1680")
        s += (f'<rect x="65" y="269" width="950" height="979" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-opacity="0.8"/>'
              + lab(75, 300, "Schnittmenge laufendes Video (Untertitel, Clip-Kante)"))
        for x in (91, 315.5, 540, 764.5, 989):
            s += L(x - 1, 0, 2, h, "#FFFFFF", 0.4)
        s += L(0, 1212, w, 40, "#6FA8DC", 0.45) + L(0, 1231, w, 2, "#6FA8DC", 1)
        s += lab(75, 1206, "Clip: Kante 63 bis 65 Prozent")
        s += L(0, 1533, w, 40, "#D29754", 0.45) + L(0, 1552, w, 2, "#D29754", 1)
        s += lab(75, 1527, "Titelbild: Kante 80 bis 82 Prozent")
        s += (f'<rect x="91" y="1400" width="898" height="200" fill="none" stroke="#FFFFFF" stroke-width="3"/>'
              + lab(101, 1440, "Messfeld Titelbild bis zur Satzkante: #3A3632 oder dunkler"))
        s += L(43, 1400, 105, 200, "#E06666", 0.35) + lab(43, 1630, "keine Kante x 43 bis 148")
        s += L(0, 860, w, 120, "#FFFFFF", 0.18) + lab(989, 850, "Augen halbnah: 45 bis 51 Prozent", "end")
    return s


# ---------------------------------------------------------------- Ausgabe
def main():
    TMP.mkdir(exist_ok=True)
    kach = kacheln()
    pfade, fehler = {}, []
    for name, (gr, inhalt) in kach.items():
        png = chrome(seite(inhalt, gr), name, gr)
        jpg = HIER / f"{name}.jpg"
        Image.open(png).convert("RGB").crop((0, 0) + gr).save(jpg, quality=88, optimize=True)
        pfade[name] = jpg
        fehler += pruefe_satz(name, jpg, gr)
    print("Satzpruefung:", "alle Zeilen vollstaendig" if not fehler else "")
    for f in fehler:
        print("  ", f)

    # Wortmarke bei 88 px und 24 px, auf Nacht und Papier (Pflegebefund 9.1)
    probe = (rect(0, 0, 1080, 420, NACHT) + wortmarke(91, 150, 88, KREIDE)
             + wortmarke(91, 340, 24, KREIDE) + wortmarke(400, 340, 24, KREIDE, ("M", "L"))
             + wortmarke(628, 150, 88, TINTE) + wortmarke(628, 340, 24, TINTE))
    probe = rect(0, 0, 1080, 420, PAPIER) + probe.replace(rect(0, 0, 1080, 420, NACHT), rect(0, 0, 600, 420, NACHT), 1)
    png = chrome(seite(probe, (1080, 420)), "wortmarke", (1080, 420), dpr=2)
    Image.open(png).convert("RGB").save(HIER / "wortmarke-probe.png", optimize=True)

    # Profilraster bei 375 pt
    reihen = [["k01", "k02", "k03"], ["k04", "k05", "k06"], ["k07", "k08", "k09"], ["k10", "k11", "k12"]]
    zellen = "".join(f'<div class="z"><img src="{pfade[n].as_uri()}"></div>' for r in reihen for n in r)
    prof = portrait_erweitert().as_uri()
    raster = f"""<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{{font-family:IS;src:url('{(FONTS / "InstrumentSans.ttf").as_uri()}');font-weight:400 700;}}
html,body{{margin:0;background:#FFFFFF;font-family:IS;color:#191714;width:375px}}
.kopf{{padding:16px 16px 10px}} .reihe{{display:flex;align-items:center;gap:18px}}
.pb{{width:86px;height:86px;border-radius:50%;background:url('{prof}') no-repeat;background-size:211px auto;background-position:-59px -140px;background-color:{PAPIER}}}
.name{{font-weight:600;font-size:15px}} .bio{{font-size:13.5px;line-height:1.35;margin-top:10px}}
.hl{{display:flex;gap:18px;margin-top:14px}} .hl div{{text-align:center;font-size:11.5px}}
.hl span{{display:block;width:62px;height:62px;border-radius:50%;border:1px solid #DBDBDB;margin-bottom:5px;background-size:cover;background-repeat:no-repeat}}
.g{{display:grid;grid-template-columns:repeat(3,1fr);gap:2px}} .z{{aspect-ratio:3/4;overflow:hidden}}
.z img{{width:100%;height:100%;object-fit:cover;display:block}}
</style></head><body><div class="kopf"><div class="reihe"><div class="pb"></div>
<div><div class="name">Markus Leitner</div><div style="font-size:12px;color:#737373;margin-top:3px">Satzprobe, intern</div></div></div>
<div class="bio">Zinshäuser und Altbau in Döbling.<br>Für Erben und Anleger.<br>Rat vor Auftrag.</div>
<div class="hl"><div><span style="background-image:url('{pfade['k03'].as_uri()}');background-size:300px auto;background-position:-180px -261px"></span>Geraten</div>
<div><span style="background-image:url('{pfade['k11'].as_uri()}');background-size:260px auto;background-position:-98px -198px"></span>Unterschrift</div>
<div><span style="background:{FLAECHE}"></span>Döbling</div></div></div>
<div class="g">{zellen}</div></body></html>"""
    png = chrome(raster, "raster", (375, 1060), dpr=3)
    Image.open(png).convert("RGB").save(HIER / "raster-375.png", optimize=True)

    # Storyboard Geraten 01
    frames = storyboard_frames()
    teile = []
    for i, (tc, bild, ton, inhalt) in enumerate(frames):
        png = chrome(seite(inhalt, REEL), f"sb{i}", REEL)
        jpg = TMP / f"sb{i}.jpg"
        Image.open(png).convert("RGB").crop((0, 0) + REEL).resize((270, 480), Image.LANCZOS).save(jpg, quality=90)
        teile.append(f'<div class="f"><img src="{jpg.as_uri()}"><b>{html.escape(tc)}</b>'
                     f'<i>{html.escape(bild)}</i><p>{html.escape(ton)}</p></div>')
    sb = f"""<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{{font-family:IS;src:url('{(FONTS / "InstrumentSans.ttf").as_uri()}');font-weight:400 700;}}
html,body{{margin:0;background:{PAPIER};font-family:IS;color:{TINTE}}}
.w{{display:grid;grid-template-columns:repeat(4,270px);gap:28px 24px;padding:32px}}
.f img{{display:block;width:270px;height:480px}} .f b{{display:block;font-weight:500;font-size:15px;margin-top:10px;font-feature-settings:'tnum' 1}}
.f i{{display:block;font-style:normal;font-size:13px;color:#57534E;margin-top:2px}} .f p{{font-size:13px;line-height:1.35;margin:6px 0 0}}
</style></head><body><div class="w">{''.join(teile)}</div></body></html>"""
    png = chrome(sb, "storyboard", (1240, 1320), dpr=2)
    Image.open(png).convert("RGB").save(HIER / "storyboard-geraten-01.jpg", quality=88)

    # Sucher-Overlays: transparent fuer die Tethering-Software, dazu eine Ansicht auf Grau
    for name, gr, reel in (("sucher-4x5", POST, False), ("sucher-9x16", REEL, True)):
        inhalt = overlay(gr, reel)
        png = chrome(seite(rect(0, 0, gr[0], gr[1], "#7A7671") + inhalt, gr), name + "-ansicht", gr)
        Image.open(png).convert("RGB").crop((0, 0) + gr).save(HIER / f"{name}-ansicht.jpg", quality=85)
        # transparent: Chrome rendert ohne Hintergrund, wenn body transparent ist
        seite_tr = seite(inhalt, gr).replace(f"background:{PAPIER}", "background:transparent")
        TMP.mkdir(exist_ok=True)
        p = TMP / f"{name}.html"
        p.write_text(seite_tr, encoding="utf-8")
        out = HIER / f"{name}.png"
        subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars",
                        "--default-background-color=00000000", f"--window-size={gr[0]},{gr[1]}",
                        "--virtual-time-budget=6000", "--allow-file-access-from-files",
                        f"--screenshot={out}", p.as_uri()], check=True,
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)


if __name__ == "__main__":
    main()
    shutil.rmtree(TMP, ignore_errors=True)
