"""Minimal DataForSEO client with a hard spend cap. Logs every call's cost to data/cost_log.csv."""
import base64, csv, json, os, sys, time, urllib.request
from pathlib import Path

CAP = float(os.environ.get("DFS_CAP", "5.00"))
ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "data"
LOG = DATA / "cost_log.csv"

def spent():
    if not LOG.exists():
        return 0.0
    with LOG.open() as f:
        return sum(float(r["cost"]) for r in csv.DictReader(f))

def post(endpoint, payload, name, est):
    """est = our worst-case cost estimate for this call; refuse if it would break the cap."""
    s = spent()
    if s + est > CAP:
        sys.exit(f"REFUSED {name}: spent ${s:.4f} + est ${est:.4f} > cap ${CAP}")
    out = DATA / f"{name}.json"
    if out.exists():
        print(f"cached {name}")
        return json.loads(out.read_text())
    auth = base64.b64encode(f"{os.environ['DATAFORSEO_LOGIN']}:{os.environ['DATAFORSEO_PASSWORD']}".encode()).decode()
    req = urllib.request.Request(f"https://api.dataforseo.com/v3/{endpoint}", data=json.dumps(payload).encode(),
                                 headers={"Authorization": f"Basic {auth}", "Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=180) as r:
        d = json.load(r)
    out.write_text(json.dumps(d))
    new = not LOG.exists()
    with LOG.open("a", newline="") as f:
        w = csv.writer(f)
        if new:
            w.writerow(["time", "name", "endpoint", "cost"])
        w.writerow([time.strftime("%Y-%m-%d %H:%M:%S"), name, endpoint, d.get("cost", 0)])
    for t in d.get("tasks", []):
        if t["status_code"] != 20000:
            print(f"  task error {t['status_code']}: {t['status_message']}")
    print(f"{name}: cost ${d.get('cost',0):.4f}  total ${spent():.4f}")
    return d
