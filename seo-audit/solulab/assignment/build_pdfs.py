"""Build the submission PDFs from their Markdown sources.

Usage: python build_pdfs.py   (needs `pip install markdown` and Playwright with Chromium)
"""

import os
import pathlib
import re
import subprocess
import tempfile

import markdown

HERE = pathlib.Path(__file__).resolve().parent
DOCS = [
    ("SoluLab-LLM-Visibility-Assignment-v2.md", "SoluLab-LLM-Visibility-Assignment-v2.html",
     "SoluLab-LLM-Visibility-Assignment.pdf", "SoluLab: LLM Visibility & Growth Consultant assignment"),
    ("screening-answers.md", "Screening-Answers.html", "Screening-Answers.pdf", "Screening questions: answer notes"),
]
EXTRA_CSS = ("img.card { width: 44%; } img.shot { width: 72%; } img.gsc { width: 78%; } "
             "table.results td:nth-child(2) { width: 30%; } "
             "table.results td:nth-child(3), table.results td:nth-child(4), table.results td:nth-child(5) "
             "{ width: 7%; text-align: center; } li ul, li ol { margin-top: 0.5mm; }")
PDF_JS = """
const { chromium } = require('playwright');
(async () => {
  const [,, src, out, footer] = process.argv;
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file://' + src, { waitUntil: 'load' });
  await p.pdf({ path: out, format: 'A4', printBackground: true,
    margin: { top: '16mm', bottom: '16mm', left: '15mm', right: '15mm' }, displayHeaderFooter: true,
    headerTemplate: '<span></span>',
    footerTemplate: `<div style="font-size:8px;width:100%;text-align:center;color:#888">${footer} · <span class="pageNumber"></span>/<span class="totalPages"></span></div>` });
  await b.close();
})();
"""


def to_html(md_text):
    md_text = re.sub(r"(?m)^  (- |\d+\. )", r"    \1", md_text)  # nested lists need 4 spaces
    out = []
    for line in md_text.split("\n"):  # lists need a blank line after a paragraph line
        if re.match(r"^(- |\d+\. )", line) and out and out[-1].strip() and not re.match(r"^(- |\d+\. |\s+)", out[-1]):
            out.append("")
        out.append(line)
    body = markdown.markdown("\n".join(out), extensions=["tables"]).replace("[ ]", "&#9744;")
    body = re.sub(r'<img alt="([^"]*)" src="(img/card_[^"]+)" />', r'<img class="card" alt="\1" src="\2" />', body)
    body = body.replace('<img alt="Apptunix', '<img class="shot" alt="Apptunix')
    body = body.replace('<img alt="Algoscale Search Console"', '<img class="gsc" alt="Algoscale Search Console"')
    body = body.replace("<table>\n<thead>\n<tr>\n<th>ID</th>\n<th>Exact prompt</th>",
                        '<table class="results">\n<thead>\n<tr>\n<th>ID</th>\n<th>Exact prompt</th>', 1)
    css = (HERE / "pdf-style.css").read_text() + EXTRA_CSS
    return f'<!doctype html><html><head><meta charset="utf-8"><style>{css}</style></head><body>{body}</body></html>'


def main():
    node_path = subprocess.run(["npm", "root", "-g"], capture_output=True, text=True).stdout.strip()
    with tempfile.TemporaryDirectory() as tmp:
        js = pathlib.Path(tmp) / "pdf.js"
        js.write_text(PDF_JS)
        for src, html_name, pdf, footer in DOCS:
            html = to_html((HERE / src).read_text())
            (HERE / html_name).write_text(html)
            tmp_html = pathlib.Path(tmp) / "doc.html"
            tmp_html.write_text(html.replace('src="img/', f'src="file://{HERE}/img/'))
            subprocess.run(["node", str(js), str(tmp_html), str(HERE / pdf), footer], check=True,
                           env={**os.environ, "NODE_PATH": node_path})
            print("built", pdf)


if __name__ == "__main__":
    main()
