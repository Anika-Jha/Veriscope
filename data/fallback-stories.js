// Fallback Stories for all Veriscope games
// These stories are used when AI analysis fails or is unavailable

const FALLBACK_STORIES = {
    
        "rumorville": [
          {
            "text": "BREAKING: Aliens spotted landing in Town Square at midnight!",
            "isTrue": false,
            "explanation": "Sensational claim with no credible sources. MIL: check author, look for evidence and verify via reliable outlets."
          },
          {
            "text": "Mayor announces free health clinic opening next month.",
            "isTrue": true,
            "explanation": "Supported by local government channels. MIL: verify via official site or press release."
          },
          {
            "text": "Scientists discover chocolate can cure all diseases! Eat 10 bars daily!",
            "isTrue": false,
            "explanation": "Misinformation with exaggerated promises. MIL: consult health professionals and peer-reviewed research."
          },
          {
            "text": "Local elementary school announces annual science fair next Friday.",
            "isTrue": true,
            "explanation": "Likely school communication. MIL: confirm via school newsletter or website."
          },
          {
            "text": "GOVERNMENT COVER-UP: Secret documents reveal dragon sightings!",
            "isTrue": false,
            "explanation": "A myth-based conspiracy with no evidence. MIL: demand credible documentation."
          },
          {
            "text": "Weekly farmers' market resumes this Sunday featuring local crafts.",
            "isTrue": true,
            "explanation": "Typical community event. MIL: verify through community notices or organizers."
          },
          {
            "text": "URGENT: Click this link for miracle diet that melts fat overnight!",
            "isTrue": false,
            "explanation": "Clickbait scam. MIL: watch for urgency and unrealistic promises; consult trusted health sources."
          },
          {
            "text": "Town library adds 500 new books to children’s section.",
            "isTrue": true,
            "explanation": "Institutional update. MIL: check library website or contact them directly."
          },
          {
            "text": "WARNING: New virus spreads just through Wi‑Fi signals!",
            "isTrue": false,
            "explanation": "Technologically implausible. MIL: verify with cybersecurity experts."
          },
          {
            "text": "High school robotics team wins regionals, advancing to state.",
            "isTrue": true,
            "explanation": "School achievement. MIL: verify via school or local news."
          },
          {
            "text": "BREAKING: Scientists confirm unicorns are real!",
            "isTrue": false,
            "explanation": "Mythical claim. MIL: requires extraordinary evidence."
          },
          {
            "text": "City council approves affordable housing project—200 units.",
            "isTrue": true,
            "explanation": "Local government announcement. MIL: verify through council records."
          },
          {
            "text": "Wearing socks while sleeping increases brain power by 200%!",
            "isTrue": false,
            "explanation": "Exaggerated health claim. MIL: verify through scientific sources."
          },
          {
            "text": "Annual music festival in Central Park this weekend.",
            "isTrue": true,
            "explanation": "Event announcement. MIL: check official event site or local coverage."
          },
          {
            "text": "Secret moon base hidden for decades, built by aliens!",
            "isTrue": false,
            "explanation": "Conspiracy theory without evidence. MIL: check space agency releases."
          },
          {
            "text": "Eco‑friendly buses introduced next week.",
            "isTrue": true,
            "explanation": "Public transit initiative. MIL: verify via transit authority."
          },
          {
            "text": "‘Miracle’ sleep supplement guarantees 8 hours in 30 minutes.",
            "isTrue": false,
            "explanation": "Unrealistic health claim. MIL: check with medical experts."
          },
          {
            "text": "Library launches free digital e-books platform for cardholders.",
            "isTrue": true,
            "explanation": "Library service. MIL: verify via institutional announcement."
          },
          {
            "text": "Secret society of super‑intelligent cats controls the internet.",
            "isTrue": false,
            "explanation": "Satirical or fictional. MIL: check context and source intent."
          },
          {
            "text": "Local high school mural project invites student designs.",
            "isTrue": true,
            "explanation": "Community art project. MIL: validate with school or organizers."
          },
          {
            "text": "Local bakery giving free bread today!",
            "isTrue": "True or False—verify.",
            "explanation": "Possibly promotional. MIL: check bakery social media or ask directly."
          },
          {
            "text": "Meteor shower tonight visible to naked eye.",
            "isTrue": true,
            "explanation": "Astronomical event. MIL: check weather and astronomy sources."
          },
          {
            "text": "New virus spreading online via smartphones.",
            "isTrue": false,
            "explanation": "Scaremongering. MIL: consult tech/security resources."
          },
          {
            "text": "City hosting dog parade this Saturday.",
            "isTrue": true,
            "explanation": "Civic event. MIL: verify via city events calendar."
          },
          {
            "text": "Celebrity endorses risky weight loss pill.",
            "isTrue": false,
            "explanation": "Marketing with health risk. MIL: check medical authority guidance."
          },
          {
            "text": "Community center hosting free yoga classes.",
            "isTrue": true,
            "explanation": "Promotional community offering. MIL: confirm with center’s postings."
          },
          {
            "text": "Instant translation app enabling telepathy released.",
            "isTrue": false,
            "explanation": "Sci‑fi claim. MIL: evaluate feasibility and developer credentials."
          },
          {
            "text": "Local artist featured in national gallery.",
            "isTrue": true,
            "explanation": "Cultural news. MIL: verify with gallery or artist statement."
          },
          {
            "text": "Mystery illness in town linked to water supply.",
            "isTrue": "True or False—verify.",
            "explanation": "Serious public health claim. MIL: check health department."
          },
          {
            "text": "City planting 100 new trees next month.",
            "isTrue": true,
            "explanation": "Environmental project. MIL: confirm via municipal plans."
          }
        ],
        "filterbubble": [
          {
            "text": "Local farmer markets are struggling and many are closing due to decreased traffic",
            "sentiment": "Negative",
            "explanation": "MIL: analyze economic data and avoid generalizing."
          },
          {
            "text": "Volunteers build new playground for neighborhood children",
            "sentiment": "Positive",
            "explanation": "MIL: check organizer transparency."
          },
          {
            "text": "Tech companies report mixed quarterly earnings",
            "sentiment": "Neutral",
            "explanation": "MIL: read full reports vs. headline spin."
          },
          {
            "text": "Unemployment reaches historic low; green energy jobs rise",
            "sentiment": "Positive",
            "explanation": "MIL: examine source statistics and context."
          },
          {
            "text": "Severe drought affecting agricultural production",
            "sentiment": "Negative",
            "explanation": "MIL: consult environmental studies."
          },
          {
            "text": "Annual arts festival boosts tourism and business",
            "sentiment": "Positive",
            "explanation": "MIL: assess cultural and economic impacts."
          },
          {
            "text": "New tax regulations affecting small businesses next year",
            "sentiment": "Negative",
            "explanation": "MIL: study policy details and stakeholder feedback."
          },
          {
            "text": "Tech startup secures funding to create 200 new jobs",
            "sentiment": "Positive",
            "explanation": "MIL: verify via startup or financial disclosures."
          },
          {
            "text": "Housing prices rising, challenging first‑time buyers",
            "sentiment": "Negative",
            "explanation": "MIL: consider housing data trends."
          },
          {
            "text": "Council approves public transport expansion",
            "sentiment": "Positive",
            "explanation": "MIL: evaluate cost‑benefit and community feedback."
          },
          {
            "text": "UNESCO promotes MIL to empower critical media evaluation",
            "sentiment": "Positive",
            "explanation": "MIL: fundamental for informed citizenship."
          },
          {
            "text": "Rise of misinformation spurs need for UNESCO’s MIL programs",
            "sentiment": "Negative",
            "explanation": "MIL: underscores urgency in combating falsehoods."
          },
          {
            "text": "MIL programs build critical thinking in schools",
            "sentiment": "Positive",
            "explanation": "MIL: evaluate integration and learner outcomes."
          },
          {
            "text": "Fake news on social media challenges MIL efforts",
            "sentiment": "Negative",
            "explanation": "MIL: adapt strategies to platform dynamics."
          },
          {
            "text": "MIL strengthens media’s role in democracy",
            "sentiment": "Positive",
            "explanation": "MIL: supports civic engagement."
          },
          {
            "text": "Lack of online regulation hampers MIL campaigns",
            "sentiment": "Negative",
            "explanation": "MIL: consider policy advocacy."
          },
          {
            "text": "UNESCO collaborates with communities to tailor MIL programs",
            "sentiment": "Positive",
            "explanation": "MIL: context-sensitive design improves relevance."
          },
          {
            "text": "Censorship restricts information flow, hindering MIL",
            "sentiment": "Negative",
            "explanation": "MIL: recognize systemic barriers."
          },
          {
            "text": "Digital literacy integrated into MIL education",
            "sentiment": "Positive",
            "explanation": "MIL: essential for navigating the online world."
          },
          {
            "text": "MIL helps mitigate hate speech and promote tolerance online",
            "sentiment": "Positive",
            "explanation": "MIL: fosters inclusive discourse."
          },
          {
            "text": "Global disparities in MIL education hinder adoption",
            "sentiment": "Negative",
            "explanation": "MIL: equity must be addressed."
          },
          {
            "text": "Journalists develop MIL skills for ethical reporting",
            "sentiment": "Positive",
            "explanation": "MIL: strengthens media integrity."
          },
          {
            "text": "MIL combats digital propaganda and extremism",
            "sentiment": "Positive",
            "explanation": "MIL: builds societal resilience."
          },
          {
            "text": "Conspiracy theories spreading rapidly challenge MIL expansion",
            "sentiment": "Negative",
            "explanation": "MIL: calls for agile adaptation."
          },
          {
            "text": "UNESCO promotes MIL as a fundamental human right",
            "sentiment": "Positive",
            "explanation": "MIL: supports free and informed societies."
          },
          {
            "text": "MIL programs in conflict zones provide reliable information",
            "sentiment": "Positive",
            "explanation": "MIL: critical under crisis conditions."
          },
          {
            "text": "Digital divide limits MIL adoption in developing regions",
            "sentiment": "Negative",
            "explanation": "MIL: needs infrastructure and resources."
          },
          {
            "text": "Sweden develops national MIL policy for disinformation resilience",
            "sentiment": "Neutral",
            "explanation": "MIL: model for coordinated governance."
          },
          {
            "text": "India integrates MIL into lifelong learning and governance",
            "sentiment": "Positive",
            "explanation": "MIL: promotes social transformation."
          },
          {
            "text": "UNESCO’s MIL toolkit aids policymakers and educators",
            "sentiment": "Positive",
            "explanation": "MIL: structured guidance accelerates implementation."
          }
        ],
        "digitaldetective": [
          {
            "text": "BREAKING: Revolutionary miracle cure discovered by unknown scientists!",
            "isCredible": false,
            "explanation": "Sensational, no named sources. MIL: demand peer-reviewed publications."
          },
          {
            "text": "WHO releases pandemic preparedness report with updated protocols.",
            "isCredible": true,
            "explanation": "Authoritative source. MIL: verify via WHO site."
          },
          {
            "text": "Celebrity endorses weight loss supplement—50 lbs in 2 weeks!",
            "isCredible": false,
            "explanation": "Unrealistic health claim. MIL: celebrity ≠ medical endorsement."
          },
          {
            "text": "NASA publishes Mars rover soil analysis with international collaboration.",
            "isCredible": true,
            "explanation": "Credible agency and data. MIL: check NASA publications."
          },
          {
            "text": "Shocking news about foods—Number 7 will amaze you!",
            "isCredible": false,
            "explanation": "Clickbait. MIL: avoid emotional manipulation."
          },
          {
            "text": "Peer-reviewed university study on climate change impacts published.",
            "isCredible": true,
            "explanation": "Academic rigor. MIL: check journal quality."
          },
          {
            "text": "Forward to 10 friends for $500 gift card offer.",
            "isCredible": false,
            "explanation": "Chain message scam. MIL: avoid forwarding; verify with issuer."
          },
          {
            "text": "Department of Health issues seasonal flu advisory.",
            "isCredible": true,
            "explanation": "Trusted health authority. MIL: cross-check health portal."
          },
          {
            "text": "Secret blog says vaccines cause mind control!",
            "isCredible": false,
            "explanation": "Conspiracy with no evidence. MIL: rely on scientific consensus."
          },
          {
            "text": "International panel publishes Nature Climate Change assessment.",
            "isCredible": true,
            "explanation": "High credibility journal. MIL: confirm via publication index."
          },
          {
            "text": "Local blogger claims undisclosed disease cure.",
            "isCredible": false,
            "explanation": "Unverified. MIL: check for institutional affiliation."
          },
          {
            "text": "UN releases poverty reduction guidelines globally.",
            "isCredible": true,
            "explanation": "Official UN report. MIL: confirm via UN portal."
          },
          {
            "text": "Unknown whistleblower reveals alien DNA research.",
            "isCredible": false,
            "explanation": "Anonymous source, no evidence. MIL: require documentation."
          },
          {
            "text": "Academic conference proceedings published online.",
            "isCredible": true,
            "explanation": "Academic output. MIL: check conference legitimacy."
          },
          {
            "text": "Chain text warns of national crisis tomorrow.",
            "isCredible": false,
            "explanation": "Likely false alarm. MIL: consult reliable media."
          },
          {
            "text": "Peer-reviewed study shows daily walking benefits brain health.",
            "isCredible": true,
            "explanation": "Supported by research. MIL: read methodology."
          },
          {
            "text": "Anonymous post claims government cloning program.",
            "isCredible": false,
            "explanation": "Conspiracy, no data. MIL: cross-check credible science sources."
          },
          {
            "text": "University library announces open archive access.",
            "isCredible": true,
            "explanation": "Institutional release. MIL: verify via library website."
          },
          {
            "text": "Fake tax notice email—click to reactivate account.",
            "isCredible": false,
            "explanation": "Phishing attempt. MIL: contact official institution."
          },
          {
            "text": "International health agency issues diet safety warning.",
            "isCredible": true,
            "explanation": "Trusted authority. MIL: check health agency."
          },
          {
            "text": "Celebrity tweets new discovery bypassing peer review.",
            "isCredible": false,
            "explanation": "Identifiable but unverified. MIL: check for peer-reviewed coverage."
          },
          {
            "text": "Scientific journal critique on GMO effects released.",
            "isCredible": true,
            "explanation": "Peer-reviewed critique. MIL: assess author and journal."
          },
          {
            "text": "YouTube influencer says secret diet melts fat fast.",
            "isCredible": false,
            "explanation": "Unverified health advice. MIL: check accredited medical sources."
          },
          {
            "text": "Government portal publishes educational data stats.",
            "isCredible": true,
            "explanation": "Official data. MIL: verify via portal."
          },
          {
            "text": "Bogus email claims bank account closure.",
            "isCredible": false,
            "explanation": "Scam. MIL: contact bank directly."
          },
          {
            "text": "Research institute reports solar energy uptake findings.",
            "isCredible": true,
            "explanation": "Institutional publication. MIL: evaluate research context."
          },
          {
            "text": "Anonymous chain message predicts tomorrow’s disaster.",
            "isCredible": false,
            "explanation": "Panic-inducing rumor. MIL: cross-check."
          },
          {
            "text": "Peer-reviewed tech study on AI trends published.",
            "isCredible": true,
            "explanation": "Academic source. MIL: review publication standards."
          },
          {
            "text": "Local health blog claims unique recovery case.",
            "isCredible": false,
            "explanation": "Anecdotal. MIL: consult medical consensus."
          },
          {
            "text": "Scientific team shares DNA sequencing results.",
            "isCredible": true,
            "explanation": "Scientific disclosure. MIL: verify institutional affiliation."
          }
        ],
        "echochamber": [
          {
            "text": "Everyone who disagrees with us is clearly ignorant.",
            "biasLevel": "biased",
            "biasType": "ad hominem",
            "explanation": "Attacks opponents instead of arguments. MIL: encourage respectful debate."
          },
          {
            "text": "This is a complex issue with valid points on multiple sides.",
            "biasLevel": "balanced",
            "biasType": "nuanced thinking",
            "explanation": "Acknowledges complexity. MIL: model inclusivity in discourse."
          },
          {
            "text": "Our group is always right; others lie constantly.",
            "biasLevel": "biased",
            "biasType": "in-group favoritism",
            "explanation": "Echo chamber effect. MIL: promote critical reflection."
          },
          {
            "text": "Recent studies show mixed outcomes depending on context.",
            "biasLevel": "balanced",
            "biasType": "evidence-based",
            "explanation": "Avoids oversimplification. MIL: value complex data."
          },
          {
            "text": "If you don’t agree, you're brainwashed by mainstream media.",
            "biasLevel": "biased",
            "biasType": "conspiracy thinking",
            "explanation": "Dismisses dissent. MIL: teach source diversity."
          },
          {
            "text": "Reasonable people interpret evidence differently.",
            "biasLevel": "balanced",
            "biasType": "intellectual humility",
            "explanation": "Encourages empathy. MIL: foster open dialogue."
          },
          {
            "text": "Only complete fools believe anything different from us.",
            "biasLevel": "biased",
            "biasType": "absolute thinking",
            "explanation": "Unproductive generalization. MIL: value humility in argument."
          },
          {
            "text": "Experts across fields are actively debating this issue.",
            "biasLevel": "balanced",
            "biasType": "expert consultation",
            "explanation": "Acknowledges expertise and ongoing debate."
          },
          {
            "text": "Our side is entirely moral; theirs is destructive to society.",
            "biasLevel": "biased",
            "biasType": "moral superiority",
            "explanation": "Polarizes discussion. MIL: cultivate moral nuance."
          },
          {
            "text": "Nuance is important; multiple stakeholders have valid concerns.",
            "biasLevel": "balanced",
            "biasType": "stakeholder awareness",
            "explanation": "Empathetic and inclusive framing."
          },
          {
            "text": "All dissenters are spreading lies intentionally.",
            "biasLevel": "biased",
            "biasType": "dismissiveness",
            "explanation": "Discourages conversation. MIL: question intent claims."
          },
          {
            "text": "We might update positions with new data.",
            "biasLevel": "balanced",
            "biasType": "open-minded",
            "explanation": "Promotes intellectual flexibility."
          },
          {
            "text": "Their group spreads misinformation deliberately.",
            "biasLevel": "biased",
            "biasType": "accusatory",
            "explanation": "Lacks neutral examination. MIL: demand evidence."
          },
          {
            "text": "Open debate is our path to truth.",
            "biasLevel": "balanced",
            "biasType": "dialogue",
            "explanation": "Supports democratic engagement."
          },
          {
            "text": "Only our sources are credible.",
            "biasLevel": "biased",
            "biasType": "source bias",
            "explanation": "Encourages narrow thinking. MIL: diversify sources."
          },
          {
            "text": "Multiple credible sources support the claim.",
            "biasLevel": "balanced",
            "biasType": "verification",
            "explanation": "Promotes triangulation."
          },
          {
            "text": "Our community is intellectually superior.",
            "biasLevel": "biased",
            "biasType": "intellectual arrogance",
            "explanation": "Discourages critical humility."
          },
          {
            "text": "No one can agree yet—we need more research.",
            "biasLevel": "balanced",
            "biasType": "provisional conclusion",
            "explanation": "Appreciates uncertainty."
          },
          {
            "text": "We have facts; they have lies.",
            "biasLevel": "biased",
            "biasType": "dogmatism",
            "explanation": "Promotes intolerance."
          },
          {
            "text": "Let’s assess evidence impartially.",
            "biasLevel": "balanced",
            "biasType": "critical evaluation",
            "explanation": "Models fair analysis."
          },
          {
            "text": "Our narrative is the only truth.",
            "biasLevel": "biased",
            "biasType": "monism",
            "explanation": "Suppresses diversity."
          },
          {
            "text": "Evidence evolves—adapt your view.",
            "biasLevel": "balanced",
            "biasType": "adaptability",
            "explanation": "Values learning."
          },
          {
            "text": "They manipulate for political gain.",
            "biasLevel": "biased",
            "biasType": "attribution bias",
            "explanation": "Needs scrutiny."
          },
          {
            "text": "Everyone’s voice matters in discussion.",
            "biasLevel": "balanced",
            "biasType": "inclusivity",
            "explanation": "Encourages diverse participation."
          },
          {
            "text": "Question everything—but stay open-minded.",
            "biasLevel": "balanced",
            "biasType": "critical openness",
            "explanation": "Balances skepticism and curiosity."
          }
        ],
        "recent_unesco_mil_news": [
          {
            "title": "UNESCO launches MIL course for adult educators",
            "date": "8 November 2024",
            "summary": "The UNESCO Institute for Lifelong Learning launched an online Media and Info Literacy course (≈10 hours, free until 31 May 2025) for adult educators to foster critical thinking, digital safety, and combat misinformation.",
            "source": "UNESCO Institute for Lifelong Learning launch" 
          },
          {
            "title": "UNESCO piloting MIL Cities initiative",
            "date": "11 June 2025",
            "summary": "UNESCO convened 24 pilot cities in a global meeting to integrate MIL into urban life—public transport, signage, cinemas—with local leaders drafting city‑specific roadmaps.",
            "source": "UNESCO MIL Cities global meeting"
          },
          {
            "title": "‘No Filter’ MIL campaign launched in Lebanon",
            "date": "9 July 2025",
            "summary": "UNESCO, Lebanon's Ministry of Information, and OIF launched “No Filter: Believe Everything? Think Again” campaign with media awareness videos and journalist training to combat disinformation and hate speech.",
            "source": "Lebanon national MIL campaign"
          },
          {
            "title": "Urgent MIL training needed for online influencers",
            "date": "26 November 2024",
            "summary": "UNESCO warns two‑thirds of social media creators don’t fact‑check content; partnered with Knight Center to launch free course for influencers about fact‑checking, sponsorship disclosure, and responsible content.",
            "source": "UNESCO influencer fact‑checking training"
          },
          {
            "title": "UNESCO releases policy brief on MIL & Generative AI",
            "date": "14 February 2024",
            "summary": "UNESCO published a brief highlighting MIL’s role in empowering users to evaluate AI‑generated content ethically and calls on policymakers to embed AI literacy in education and governance.",
            "source": "UNESCO policy brief on MIL and GAI"
          },
          {
            "title": "UNESCO introduces audio‑based MIL MOOC",
            "date": "10 April 2024",
            "summary": "UNESCO launched ‘Think Critically, Click Wisely’: an audio‑based MIL MOOC (20 modules, English/Spanish) with quizzes, available as podcast to enhance media literacy via storytelling.",
            "source": "UNESCO audio‑based MIL MOOC"
          },
          {
            "title": "South African Digital Literacy Day launched",
            "date": "25 October 2024",
            "summary": "As part of Global MIL Week, South Africa launched Digital Literacy Day to raise public awareness of digital skills, via libraries, schools, and government‑civil society collaboration.",
            "source": "South African Digital Literacy Day"
          }
        ],
        "important_mil_teachings": [
          "Verify sources: always check author credentials, publication, and domain.",
          "Demand evidence: extraordinary claims require credible documentation.",
          "Recognize media tactics: be aware of sensationalism, emotional language, clickbait, anonymity, and conspiracy framing.",
          "Cross‑verify: use multiple, independent sources including official sites, peer‑reviewed journals, and subject‑matter experts.",
          "Understand platform dynamics: social media may amplify misinformation due to algorithms and popularity biases.",
          "Develop digital/algorithmic literacy: learn how algorithms influence content exposure and how to critically assess AI‑generated media.",
          "Promote inclusivity: include diverse perspectives and empower vulnerable groups through MIL.",
          "Balance skepticism with openness: question information critically, without falling into cynicism.",
          "Foster ethical production: journalists, creators, and educators must disclose sources, sponsorships, and resist sensationalism.",
          "Advocate structural change: support policy and institutional actions to integrate MIL in education, public services, and urban infrastructure."
        ]
      };

// Export the fallback stories for use in games
window.FALLBACK_STORIES = FALLBACK_STORIES;
