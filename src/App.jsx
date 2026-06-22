import { useState, useEffect, useRef } from 'react'
import heroImg from './assets/hero.jpg'
import fdmImg from './assets/fdm.jpg'
import boardroomImg from './assets/boardroom.jpg'
import googleImg from './assets/google.jpg'
import msBuildingImg from './assets/ms_building.jpg'
import equitixImg from './assets/equitix.jpg'
import selfieImg from './assets/selfie.jpg'
import baPlaneImg from './assets/ba_plane.jpg'
import baCockpitImg from './assets/ba_cockpit.jpg'
import citiImg from './assets/citi.jpg'

/* ===========================================================
   1) YOUR CONTENT  —  edit anything in these blocks
   =========================================================== */
const IMG = {
  hero: heroImg,
  fdm: fdmImg,
  boardroom: boardroomImg,
  google: googleImg,
  ms_building: msBuildingImg,
  equitix: equitixImg,
  selfie: selfieImg,
  ba_plane: baPlaneImg,
  ba_cockpit: baCockpitImg,
  citi: citiImg,
};   // your photos -> the images/ folder
const CV  = import.meta.env.BASE_URL + 'files/Arcan_Islam_CV.pdf';   // your CV -> the files/ folder

const EMAIL    = "arcanislam07@outlook.com";
const LINKEDIN = "https://www.linkedin.com/in/arcan-i-686aa6284";
const GITHUB   = "https://github.com/ArcK9-cmd";                  // your GitHub profile
const FDM_REPO = "https://github.com/M-ZUBAJ/FDMEmployeeProject"; // FDM team project repo

const EXPERIENCE = [
  { date:"Apr 2026", role:"London Office Open Day", org:"Citigroup",
    note:"Advised a fictional EV company on its direct-to-consumer strategy in the Services business game; engaged analyst panels across Banking, Markets, Services & Wealth." },
  { date:"Apr 2026", role:"Spring Insight Week", org:"British Airways",
    note:"Designed a 2050 net-zero fleet strategy in a team of six (100% Sustainable Aviation Fuel); led the net-zero workstream and co-presented to senior BA staff." },
  { date:"Jul 2025", role:"Tech500 Bootcamp", org:"Microsoft · G-Research · JMAN · MAN Group",
    note:"Built a web game with GitHub Copilot; analysed market data in Python (pandas, NumPy, Matplotlib); delivered a Power BI consulting case and a finance hackathon study." },
  { date:"Feb 2025", role:"Technology Taster Day", org:"Deutsche Bank",
    note:"Pitched a National Apprenticeship Week campaign to senior professionals; explored the TDI function powering ATM and FX platforms." },
  { date:"Jan 2025", role:"Work Experience", org:"GCHQ · MI5 · MI6",
    note:"First-hand insight into cybersecurity, data analysis and operations; timed analytical problem-solving and lateral-thinking exercises." },
  { date:"Nov 2024", role:"Insight Day — 1 of 60 from 2,000+", org:"Lloyds Banking Group",
    note:"Live case study optimising café profitability across sales strategy, cost reduction and digital advertising; presented findings to senior leaders." },
  { date:"Sep 2024 – Present", role:"Private Tutor", org:"Self-employed",
    note:"GCSE & A-level tuition; improved grades by an average of 45% through structured feedback, scaffolded homework and tailored revision." },
];

const EDUCATION = { date:"2024 – 2027", role:"BEng Computer Systems Engineering", org:"Queen Mary University of London",
  note:"Algorithms & Data Structures · Object-Oriented Programming · Operating Systems · Software Engineering · Networks & Communications · Digital Systems Design · Microprocessor Systems." };

const SKILLS = {
  "Languages": ["Java","Python","JavaScript","TypeScript","HTML","CSS","SQL","VHDL"],
  "Tools & Tech": ["React","Git","Java Swing","Linux","Figma","Visual Paradigm","Cisco Packet Tracer","GitHub Copilot"],
  "Data & Productivity": ["pandas","NumPy","Matplotlib","Excel","Power BI","PowerPoint"],
  "Core Strengths": ["Problem-solving","Teamwork","Communication","Adaptability","Strong work ethic"],
};

const INTERESTS = ["Football","Gym & Calisthenics","PC Building","Fintech","Investing & Trading","Programming"];

const PROJECTS = [
  { title:"FDM Employee Portal", tag:"Requirements Engineering · Prototype", img:IMG.fdm,
    desc:"Led domain analysis, requirements elicitation and client-facing presentations — producing functional & non-functional specs, use-case diagrams, risk assessments and a working prototype.",
    tech:["Visual Paradigm","Requirements","UML","Prototype"], link:FDM_REPO, linkLabel:"View repository" },
  { title:"Weather Application", tag:"React · Live API", ph:"weather", icon:"cloud",
    desc:"A responsive weather app built in a team of five — fetching live data by location via the OpenWeatherMap API, prototyped in Figma with full requirements and evaluation documentation.",
    tech:["React","OpenWeatherMap API","Figma"], link:null },
  { title:"Horse Race Simulator", tag:"Java · OOP", ph:"java", icon:"code",
    desc:"A real-time race simulation with a graphical interface featuring confidence boosts and fall-risk mechanics, applying data encapsulation and OOP design principles throughout.",
    tech:["Java","JavaFX","OOP","Git"], link:null },
];

const GALLERY = [
  { img:IMG.boardroom,   cap:"Insight programme — group case work" },
  { img:IMG.ba_plane,    cap:"British Airways — A380, Heathrow" },
  { img:IMG.google,      cap:"Google, London" },
  { img:IMG.ba_cockpit,  cap:"A380 flight deck — British Airways" },
  { img:IMG.ms_building, cap:"Morgan Stanley" },
  { img:IMG.citi,        cap:"Citi — London Office Open Day" },
  { img:IMG.equitix,     cap:"Equitix" },
  { img:IMG.selfie,      cap:"On site" },
];

/* ===========================================================
   2) SMALL HELPERS
   =========================================================== */
// Hand-drawn SVG icons (no icon library needed)
const Icon = ({n}) => {
  const p = {width:18,height:18,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:1.8,strokeLinecap:"round",strokeLinejoin:"round"};
  const paths = {
    mail:<><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
    linkedin:<><path d="M16 8a6 6 0 0 1 6 6v6h-4v-6a2 2 0 0 0-4 0v6h-4v-10h4v2"/><rect x="2" y="9" width="4" height="11"/><circle cx="4" cy="4" r="2"/></>,
    github:<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-1-2.6c3-.3 6-1.5 6-7A5.4 5.4 0 0 0 19.5 4 5 5 0 0 0 19 .5S17.7 0 15 1.8a13.4 13.4 0 0 0-7 0C5.3 0 4 .5 4 .5A5 5 0 0 0 3.5 4 5.4 5.4 0 0 0 2 7.6c0 5.5 3 6.7 6 7a3.4 3.4 0 0 0-1 2.6V21"/>,
    arrow:<path d="M5 12h14m-6-6 6 6-6 6"/>,
    download:<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/></>,
    cloud:<path d="M17.5 19a4.5 4.5 0 1 0 0-9 6 6 0 0 0-11.6 1.5A4 4 0 0 0 6 19z"/>,
    code:<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>,
    ext:<><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></>,
    menu:<path d="M3 6h18M3 12h18M3 18h18"/>,
    close:<path d="M18 6 6 18M6 6l12 12"/>,
  };
  return <svg {...p}>{paths[n]}</svg>;
};

// Section header (mono index + title + optional lead text)
const Head = ({num,title,lead}) => (
  <div className="reveal">
    <div className="kicker">{num} — {title}</div>
  </div>
);

/* ===========================================================
   3) THE PAGE  —  built from components
   =========================================================== */
const NAV = [["about","About"],["experience","Experience"],["skills","Toolkit"],["projects","Projects"],["gallery","Gallery"],["contact","Contact"]];

function App(){
  const [scrolled,setScrolled] = useState(false);
  const [active,setActive] = useState("");
  const [menu,setMenu] = useState(false);
  const [progress,setProgress] = useState(0);

  useEffect(() => {
    // Scroll listener: toggles the blurred nav + updates the progress bar.
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const h = document.documentElement;
      setProgress((h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100);
    };
    window.addEventListener("scroll", onScroll); onScroll();

    // Reveal-on-scroll: watch every .reveal element, add .in when visible.
    const revealObs = new IntersectionObserver((es) => {
      es.forEach(e => { if(e.isIntersecting){ e.target.classList.add("in"); revealObs.unobserve(e.target);} });
    }, { threshold:0.12 });
    document.querySelectorAll(".reveal").forEach(el => revealObs.observe(el));

    // Active-link highlight: track which section is on screen.
    const secObs = new IntersectionObserver((es) => {
      es.forEach(e => { if(e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin:"-45% 0px -50% 0px" });
    document.querySelectorAll("section[id]").forEach(s => secObs.observe(s));

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => { setMenu(false); document.getElementById(id)?.scrollIntoView({behavior:"smooth"}); };

  return (<>
    <div className="bg-fx"></div>
    <div className="aurora a1"></div>
    <div className="aurora a2"></div>
    <div className="grain"></div>
    <div className="progress" style={{width:progress+"%"}}></div>

    {/* NAV */}
    <nav className={"nav"+(scrolled?" scrolled":"")}>
      <div className="wrap nav-inner">
        <a className="logo" href="#top" onClick={(e)=>{e.preventDefault();go("top");}}>
          <span className="dot"></span> Arcan Islam
        </a>
        <div className="nav-links">
          {NAV.map(([id,label]) =>
            <a key={id} href={"#"+id} className={active===id?"active":""}
               onClick={(e)=>{e.preventDefault();go(id);}}>{label}</a>)}
        </div>
        <a className="nav-cta" href={CV} download="Arcan_Islam_CV.pdf">Resume ↓</a>
        <button className="burger" onClick={()=>setMenu(!menu)} aria-label="Menu">
          <Icon n={menu?"close":"menu"} />
        </button>
      </div>
      <div className={"mobile-menu"+(menu?" open":"")}>
        {NAV.map(([id,label]) =>
          <a key={id} href={"#"+id} onClick={(e)=>{e.preventDefault();go(id);}}>{label}</a>)}
      </div>
    </nav>

    {/* HERO */}
    <section id="top" className="hero">
      <div className="wrap hero-grid">
        <div>
          <span className="hero-kicker reveal"><span className="ping"></span> Open to 2027 placements &amp; internships</span>
          <h1 className="reveal" style={{transitionDelay:".05s"}}>
            Arcan <span className="grad">Islam</span>
          </h1>
          <p className="hero-sub reveal" style={{transitionDelay:".12s"}}>Aspiring Data &amp; Cloud Engineer — Fintech</p>
          <p className="hero-desc reveal" style={{transitionDelay:".18s"}}>
            Computer Systems Engineering student at Queen Mary University of London,
            building data-driven systems and learning the tech that powers modern finance.
          </p>
          <div className="btns reveal" style={{transitionDelay:".24s"}}>
            <a className="btn btn-primary" href="#projects" onClick={(e)=>{e.preventDefault();go("projects");}}>
              View projects <Icon n="arrow" />
            </a>
            <a className="btn btn-ghost" href="#contact" onClick={(e)=>{e.preventDefault();go("contact");}}>Get in touch</a>
          </div>
        </div>
        <div className="portrait-wrap reveal" style={{transitionDelay:".2s"}}>
          <div className="portrait-glow"></div>
          <div className="portrait"><img src={IMG.hero} alt="Arcan Islam" /></div>
          <div className="badge"><b>QMUL</b> · Computer Systems Eng. '27</div>
        </div>
      </div>
    </section>

    {/* ABOUT */}
    <section id="about">
      <div className="wrap">
        <Head num="01" title="About" />
        <div className="about-grid">
          <div className="reveal">
            <h2 className="title">Engineer's mind,<br/>finance instinct.</h2>
            <p>I'm a <b>Computer Systems Engineering</b> student at Queen Mary University of London,
               drawn to where data, cloud and finance meet. My degree spans everything from
               algorithms and operating systems to digital and microprocessor design.</p>
            <p>Beyond the lecture hall I've spent the last two years inside the industry — insight
               weeks and bootcamps with <b>Citi, British Airways, Deutsche Bank, Lloyds, Microsoft and G-Research</b> —
               while tutoring GCSE and A-level students and shipping my own projects in Java and React.</p>
            <p>I like turning messy problems into clear, working systems, and explaining them simply.</p>
            <div className="chips">
              {INTERESTS.map(i => <span className="chip" key={i}>{i}</span>)}
            </div>
          </div>
          <div className="facts reveal" style={{transitionDelay:".1s"}}>
            <div className="fact"><b>2024</b><span>Started BEng at QMUL</span></div>
            <div className="fact"><b>3</b><span>Engineering projects shipped</span></div>
            <div className="fact"><b>+45%</b><span>Avg. grade improvement tutoring</span></div>
            <div className="fact"><b>8</b><span>Languages &amp; frameworks</span></div>
          </div>
        </div>
      </div>
    </section>

    {/* EXPERIENCE */}
    <section id="experience">
      <div className="wrap">
        <Head num="02" title="Experience &amp; Education" />
        <h2 className="title reveal">Where I've been learning.</h2>
        <div className="timeline">
          <div className="entry edu reveal">
            <div className="date">{EDUCATION.date}</div>
            <h3>{EDUCATION.role}</h3>
            <div className="org">{EDUCATION.org}</div>
            <p>{EDUCATION.note}</p>
          </div>
          {EXPERIENCE.map((e,i) => (
            <div className="entry reveal" key={i} style={{transitionDelay:(i*0.04)+"s"}}>
              <div className="date">{e.date}</div>
              <h3>{e.role}</h3>
              <div className="org">{e.org}</div>
              <p>{e.note}</p>
            </div>
          ))}
        </div>
        <a className="btn btn-ghost reveal" href={CV} download="Arcan_Islam_CV.pdf" style={{marginTop:8}}>
          <Icon n="download" /> Download full CV
        </a>
      </div>
    </section>

    {/* SKILLS */}
    <section id="skills">
      <div className="wrap">
        <Head num="03" title="Toolkit" />
        <h2 className="title reveal">Languages &amp; tools.</h2>
        <div className="skill-grid">
          {Object.entries(SKILLS).map(([group,items],i) => (
            <div className="skill-card reveal" key={group} style={{transitionDelay:(i*0.06)+"s"}}>
              <h4>{group}</h4>
              <div className="chips">{items.map(s => <span className="chip" key={s}>{s}</span>)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* PROJECTS */}
    <section id="projects">
      <div className="wrap">
        <Head num="04" title="Projects" />
        <h2 className="title reveal">Things I've built.</h2>
        <div className="proj-grid">
          {PROJECTS.map((p,i) => (
            <div className="card reveal" key={p.title} style={{transitionDelay:(i*0.07)+"s"}}>
              {p.img
                ? <div className="card-media"><img src={p.img} alt={p.title} /></div>
                : <div className={"card-media placeholder "+p.ph}><Icon n={p.icon} /></div>}
              <div className="card-body">
                <div className="card-tag">{p.tag}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="tech">{p.tech.map(t => <span key={t}>{t}</span>)}</div>
                {p.link
                  ? <a className="card-link" href={p.link} target="_blank" rel="noreferrer">{p.linkLabel} <Icon n="ext" /></a>
                  : <span className="card-link" style={{color:"var(--faint)",cursor:"default"}}>Academic project</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* GALLERY */}
    <section id="gallery">
      <div className="wrap">
        <Head num="05" title="Gallery" />
        <h2 className="title reveal">Gallery.</h2>
        <p className="lead reveal" style={{marginBottom:30}}>Industry visits, project work and life outside the code.</p>
        <div className="gallery">
          {GALLERY.map((g,i) => (
            <div className="gtile reveal" key={i} style={{transitionDelay:(i*0.04)+"s"}}>
              <img src={g.img} alt={g.cap} loading="lazy" />
              <div className="cap">{g.cap}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CONTACT */}
    <section id="contact" className="contact">
      <div className="wrap">
        <div className="reveal">
          <div className="kicker" style={{justifyContent:"center"}}>06 — Contact</div>
          <h2>Let's build something.</h2>
          <p className="lead">Open to placements, internships and interesting projects in data, cloud and fintech. The fastest way to reach me is email.</p>
          <div className="contact-links">
            <a className="clink" href={"mailto:"+EMAIL}><Icon n="mail" /> Email</a>
            <a className="clink" href={LINKEDIN} target="_blank" rel="noreferrer"><Icon n="linkedin" /> LinkedIn</a>
            <a className="clink" href={GITHUB} target="_blank" rel="noreferrer"><Icon n="github" /> GitHub</a>
            <a className="clink" href={CV} download="Arcan_Islam_CV.pdf"><Icon n="download" /> CV</a>
          </div>
          <p className="note">{EMAIL}</p>
        </div>
      </div>
    </section>

    <footer>
      <div className="wrap foot-inner">
        <span>© 2026 Arcan Islam</span>
        <span>Built with React · London, UK</span>
      </div>
    </footer>
  </>);
}

export default App;
