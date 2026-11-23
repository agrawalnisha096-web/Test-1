# trade: (trade phrase, plural pro noun)
TRADES = {
 "roofing":("roofing","roofers"),"plumbing":("plumbing","plumbers"),"hvac":("hvac","hvac contractors"),
 "electrical":("electrician","electricians"),"landscaping":("landscaping","landscapers"),"lawn care":("lawn care","lawn care companies"),
 "pest control":("pest control","pest control companies"),"tree service":("tree service","tree service companies"),
 "junk removal":("junk removal","junk removal companies"),"house cleaning":("cleaning","cleaning companies"),
 "commercial cleaning":("commercial cleaning","janitorial companies"),"carpet cleaning":("carpet cleaning","carpet cleaners"),
 "painting":("painting","painters"),"remodeling":("remodeling","remodelers"),"kitchen remodeling":("kitchen remodeling","kitchen remodelers"),
 "bathroom remodeling":("bathroom remodeling","bathroom remodelers"),"general contractor":("general contractor","general contractors"),
 "concrete":("concrete","concrete contractors"),"fencing":("fence","fence companies"),"flooring":("flooring","flooring contractors"),
 "gutters":("gutter","gutter companies"),"pool":("pool","pool companies"),"pressure washing":("pressure washing","pressure washing companies"),
 "window cleaning":("window cleaning","window cleaners"),"restoration":("water damage","restoration companies"),
 "mold remediation":("mold remediation","mold remediation companies"),"garage door":("garage door","garage door companies"),
 "handyman":("handyman","handymen"),"moving":("moving","movers"),"appliance repair":("appliance repair","appliance repair companies"),
 "foundation repair":("foundation repair","foundation repair companies"),"solar":("solar","solar companies"),
 "siding":("siding","siding contractors"),"windows":("window","window companies"),"insulation":("insulation","insulation contractors"),
 "septic":("septic","septic companies"),"excavation":("excavation","excavation contractors"),"masonry":("masonry","masons"),
 "paving":("paving","paving contractors"),"deck":("deck","deck builders"),"home inspection":("home inspection","home inspectors"),
 "locksmith":("locksmith","locksmiths"),"towing":("towing","towing companies"),"auto detailing":("detailing","detailers"),
 "dumpster rental":("dumpster rental","dumpster rental companies"),"chimney":("chimney","chimney sweeps"),
 "epoxy flooring":("epoxy flooring","epoxy flooring contractors"),"cabinets":("cabinet","cabinet makers"),
 "drywall":("drywall","drywall contractors"),"demolition":("demolition","demolition contractors"),
 "irrigation":("irrigation","irrigation contractors"),"air duct cleaning":("air duct cleaning","air duct cleaning companies"),
 "home builder":("home builder","home builders"),"water treatment":("water treatment","water treatment companies"),
 "home services":("home service","home service businesses"),"contractor":("contractor","contractors"),
}
T_MODS = ["{t} leads","{t} lead generation","{t} marketing","{t} seo","{t} advertising","{t} marketing agency",
          "{t} website design","{t} google ads","how to get {t} leads","exclusive {t} leads","buy {t} leads"]
P_MODS = ["marketing for {p}","seo for {p}","leads for {p}","websites for {p}","how to get more {p} customers"]
def grid():
    out = {}
    for key,(t,p) in TRADES.items():
        for m in T_MODS: out[m.format(t=t)] = key
        for m in P_MODS: out[m.format(p=p)] = key
    return out
