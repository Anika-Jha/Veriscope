// Fallback Stories for all Veriscope games
// These stories are used when AI analysis fails or is unavailable

const FALLBACK_STORIES = {
    
  "rumorville": [
    {
      "text": "A new study shows that drinking coffee reduces risk of heart attacks by 70%.",
      "isTrue": false,
      "explanation": "The percentage is exaggerated. Real studies show mixed results with far smaller effects. MIL: always check sample size and publication."
    },
    {
      "text": "The city council has approved funding to renovate all public parks within the next year.",
      "isTrue": true,
      "explanation": "Local news confirmed through government press release. MIL: cross-check official announcements."
    },
    {
      "text": "A local influencer claims that rubbing lemon on your skin prevents COVID-19 infection.",
      "isTrue": false,
      "explanation": "Health misinformation. MIL: verify with WHO or trusted health sources."
    },
    {
      "text": "The regional transit authority will increase fares by 10% starting in October.",
      "isTrue": true,
      "explanation": "Covered by multiple newspapers and official transit board statement."
    },
    {
      "text": "Viral post claims vaccines contain microchips for government surveillance.",
      "isTrue": false,
      "explanation": "Classic conspiracy theory debunked by independent fact-checkers."
    },
    {
      "text": "The local hospital is opening a new mental health wing for teenagers.",
      "isTrue": true,
      "explanation": "Community health initiative verified by hospital's official website."
    },
    {
      "text": "Drinking a glass of red wine daily cures diabetes, according to Facebook posts.",
      "isTrue": false,
      "explanation": "False medical claim with no credible backing. MIL: consult peer-reviewed studies and doctors."
    },
    {
      "text": "The new public library will feature free coding classes for students this summer.",
      "isTrue": true,
      "explanation": "Educational program announced by library’s press office."
    },
    {
      "text": "Breaking: Photos circulating show a celebrity shopping in your town yesterday.",
      "isTrue": false,
      "explanation": "Often clickbait. MIL: verify images via reverse search."
    },
    {
      "text": "Local university researchers are working on drought-resistant crops for farmers.",
      "isTrue": true,
      "explanation": "Reported in academic press and university media."
    },
    {
      "text": "WhatsApp forward claims cooking rice in an iron pot boosts your IQ permanently.",
      "isTrue": false,
      "explanation": "Pseudoscience. MIL: watch for extraordinary claims without studies."
    },
    {
      "text": "Municipal authorities have banned single-use plastics starting January next year.",
      "isTrue": true,
      "explanation": "Policy change documented in official circulars and local TV reports."
    },
    {
      "text": "Instagram post claims climate change is a hoax created by scientists for funding.",
      "isTrue": false,
      "explanation": "Disinformation tactic, widely debunked by UN and IPCC."
    },
    {
      "text": "The local museum will host an exhibition on ancient trade routes next month.",
      "isTrue": true,
      "explanation": "Confirmed by museum schedule and event page."
    },
    {
      "text": "Forwarded message: Boiling garlic water cures cancer in three weeks.",
      "isTrue": false,
      "explanation": "Dangerous health misinformation. MIL: cross-check with credible medical organizations."
    },
    {
      "text": "The national exam schedule has been postponed due to extreme weather warnings.",
      "isTrue": true,
      "explanation": "Education board confirmed on their verified social media."
    },
    {
      "text": "A viral tweet says a supermarket is secretly adding addictive chemicals to bread.",
      "isTrue": false,
      "explanation": "Fearmongering rumor. MIL: demand evidence, verify with regulators."
    },
    {
      "text": "Local high school team wins state-level robotics competition.",
      "isTrue": true,
      "explanation": "Reported by school, local press, and event organizers."
    },
    {
      "text": "A chain message says mobile phones cause instant brain tumors if kept near the pillow.",
      "isTrue": false,
      "explanation": "Fear-based misinformation without scientific evidence."
    },
    {
      "text": "City announces free public Wi-Fi zones in downtown area starting this winter.",
      "isTrue": true,
      "explanation": "Official initiative confirmed in municipal press release."
    }
  ],
        "filterbubble": [
          {
            "text": "Local hospital reports shortage of nurses due to burnout",
            "sentiment": "Negative",
            "explanation": "MIL: confirm with healthcare workforce reports."
          },
          {
            "text": "New library program offers free coding classes for teenagers",
            "sentiment": "Positive",
            "explanation": "MIL: check program details and inclusivity."
          },
          {
            "text": "Wildfires destroy homes in multiple rural communities",
            "sentiment": "Negative",
            "explanation": "MIL: verify emergency updates from local authorities."
          },
          {
            "text": "University researchers discover potential treatment for rare disease",
            "sentiment": "Positive",
            "explanation": "MIL: evaluate peer-review status and replication."
          },
          {
            "text": "Public trust in local government declines after corruption scandal",
            "sentiment": "Negative",
            "explanation": "MIL: distinguish fact from rumor in political reporting."
          },
          {
            "text": "Neighborhood recycling program reduces landfill waste by 30%",
            "sentiment": "Positive",
            "explanation": "MIL: assess independent environmental studies."
          },
          {
            "text": "Protests erupt after proposed increase in tuition fees",
            "sentiment": "Negative",
            "explanation": "MIL: cross-check perspectives from students, faculty, and government."
          },
          {
            "text": "Women-led cooperative expands organic food distribution",
            "sentiment": "Positive",
            "explanation": "MIL: validate claims of economic empowerment."
          },
          {
            "text": "Housing shortage forces families into temporary shelters",
            "sentiment": "Negative",
            "explanation": "MIL: analyze housing policy and regional data."
          },
          {
            "text": "Community theater stages play about climate resilience",
            "sentiment": "Positive",
            "explanation": "MIL: reflect on culture’s role in awareness."
          },
          {
            "text": "Police face criticism for excessive use of surveillance technology",
            "sentiment": "Negative",
            "explanation": "MIL: assess privacy and civil rights implications."
          },
          {
            "text": "Small businesses recover faster than expected after pandemic",
            "sentiment": "Positive",
            "explanation": "MIL: examine financial data trends."
          },
          {
            "text": "Local sports team accused of mismanaging public funding",
            "sentiment": "Negative",
            "explanation": "MIL: separate investigative reporting from speculation."
          },
          {
            "text": "High school integrates media literacy into curriculum",
            "sentiment": "Positive",
            "explanation": "MIL: evaluate outcomes for critical thinking."
          },
          {
            "text": "Fake job ads spreading online target unemployed workers",
            "sentiment": "Negative",
            "explanation": "MIL: fact-check recruitment sources carefully."
          },
          {
            "text": "Art installation raises awareness about ocean plastic pollution",
            "sentiment": "Positive",
            "explanation": "MIL: combine artistic expression with verified science."
          },
          {
            "text": "New housing project criticized for displacing low-income residents",
            "sentiment": "Negative",
            "explanation": "MIL: review evidence from community groups."
          },
          {
            "text": "Local radio station wins award for investigative journalism",
            "sentiment": "Positive",
            "explanation": "MIL: highlight role of independent media."
          },
          {
            "text": "Cybersecurity breach exposes personal data of thousands",
            "sentiment": "Negative",
            "explanation": "MIL: confirm with official disclosures."
          },
          {
            "text": "University launches open course on fact-checking online sources",
            "sentiment": "Positive",
            "explanation": "MIL: open access supports global media literacy."
          },
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
            "text": "Breaking: Local council secretly sells public park to developers!",
            "isCredible": false,
            "explanation": "Anonymous claim without documentation. MIL: verify through council records."
          },
          {
            "text": "Ministry of Education publishes annual literacy statistics.",
            "isCredible": true,
            "explanation": "Official government data. MIL: cross-check on ministry portal."
          },
          {
            "text": "Facebook post claims 5G towers cause severe illness.",
            "isCredible": false,
            "explanation": "Conspiracy theory, no scientific support. MIL: consult WHO reports."
          },
          {
            "text": "National Science Academy announces grant funding for renewable energy research.",
            "isCredible": true,
            "explanation": "Institutional release. MIL: confirm via academy website."
          },
          {
            "text": "Unknown blog alleges that elections are pre-programmed.",
            "isCredible": false,
            "explanation": "Unsupported allegation. MIL: compare with independent observers."
          },
          {
            "text": "Peer-reviewed journal publishes new vaccine safety trial data.",
            "isCredible": true,
            "explanation": "Academic peer review ensures reliability. MIL: assess journal quality."
          },
          {
            "text": "Viral video claims lemon water cures cancer.",
            "isCredible": false,
            "explanation": "Unverified medical claim. MIL: consult oncology experts."
          },
          {
            "text": "Weather bureau issues early storm warning for coastal areas.",
            "isCredible": true,
            "explanation": "Official meteorological service. MIL: confirm with regional alerts."
          },
          {
            "text": "Chain message warns of food shortages next week.",
            "isCredible": false,
            "explanation": "Fear-inducing rumor. MIL: verify with supply chain reports."
          },
          {
            "text": "University press release highlights breakthroughs in solar panel efficiency.",
            "isCredible": true,
            "explanation": "Institutional announcement. MIL: check publication date and authorship."
          },
          {
            "text": "Click here to win a free iPhone! Limited spots!",
            "isCredible": false,
            "explanation": "Classic phishing tactic. MIL: avoid suspicious links."
          },
          {
            "text": "Health ministry publishes guidelines for safe drinking water.",
            "isCredible": true,
            "explanation": "Credible authority. MIL: confirm with official portal."
          },
          {
            "text": "Influencer warns that microwaves alter DNA permanently.",
            "isCredible": false,
            "explanation": "Pseudoscience. MIL: verify with peer-reviewed health studies."
          },
          {
            "text": "UNESCO launches new initiative to promote media literacy worldwide.",
            "isCredible": true,
            "explanation": "Official organizational release. MIL: confirm on UNESCO’s website."
          },
          {
            "text": "Anonymous Twitter account reveals 'classified UFO documents'.",
            "isCredible": false,
            "explanation": "Anonymous, no verification. MIL: check for credible sources."
          },
          {
            "text": "Research institute publishes findings on rising sea levels.",
            "isCredible": true,
            "explanation": "Scientific data. MIL: examine methodology."
          },
          {
            "text": "Celebrity chef claims certain foods boost immunity instantly.",
            "isCredible": false,
            "explanation": "Health exaggeration. MIL: confirm via scientific consensus."
          },
          {
            "text": "World Bank releases annual poverty reduction report.",
            "isCredible": true,
            "explanation": "Respected institution. MIL: access original report."
          },
          {
            "text": "Blog post alleges hidden chemicals in tap water causing mass illness.",
            "isCredible": false,
            "explanation": "Fear-based misinformation. MIL: cross-check with health authority."
          },
          {
            "text": "Peer-reviewed article finds connection between exercise and mental health improvement.",
            "isCredible": true,
            "explanation": "Academic research. MIL: evaluate sample size and replication."
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
            "text": "If you’re not with us, you’re against us.",
            "biasLevel": "biased",
            "biasType": "false dichotomy",
            "explanation": "Forces oversimplified choices. MIL: teach nuance in perspectives."
          },
          {
            "text": "Different communities can experience this issue in unique ways.",
            "biasLevel": "balanced",
            "biasType": "contextual awareness",
            "explanation": "Recognizes diversity of experience."
          },
          {
            "text": "Only idiots trust mainstream institutions anymore.",
            "biasLevel": "biased",
            "biasType": "anti-institutional",
            "explanation": "Discredits institutions without evidence. MIL: seek accountability, not dismissal."
          },
          {
            "text": "This topic is complicated; let’s compare multiple sources.",
            "biasLevel": "balanced",
            "biasType": "source diversity",
            "explanation": "Encourages triangulation of information."
          },
          {
            "text": "Our political party is the only one that cares about the people.",
            "biasLevel": "biased",
            "biasType": "partisan bias",
            "explanation": "Overgeneralizes political motives. MIL: compare policy records."
          },
          {
            "text": "Experts disagree; let’s look at where consensus exists.",
            "biasLevel": "balanced",
            "biasType": "consensus-seeking",
            "explanation": "Builds on expert discourse responsibly."
          },
          {
            "text": "People on the other side are all corrupt liars.",
            "biasLevel": "biased",
            "biasType": "generalization",
            "explanation": "Sweeping claim. MIL: challenge stereotypes."
          },
          {
            "text": "Let’s consider the data before rushing to conclusions.",
            "biasLevel": "balanced",
            "biasType": "evidence-first",
            "explanation": "Promotes rational analysis."
          },
          {
            "text": "They’re just sheep who can’t think for themselves.",
            "biasLevel": "biased",
            "biasType": "dehumanization",
            "explanation": "Dismisses individuals. MIL: emphasize empathy."
          },
          {
            "text": "This may depend on cultural context—different societies solve it differently.",
            "biasLevel": "balanced",
            "biasType": "cultural awareness",
            "explanation": "Respects global perspectives."
          },
          {
            "text": "Our way is the only solution—everything else is fake news.",
            "biasLevel": "biased",
            "biasType": "dogmatism",
            "explanation": "Rejects plural viewpoints. MIL: promote open inquiry."
          },
          {
            "text": "Good arguments exist on both sides; let’s weigh them carefully.",
            "biasLevel": "balanced",
            "biasType": "fair-mindedness",
            "explanation": "Supports deliberative thinking."
          },
          {
            "text": "They control the media, so you can’t trust anything they say.",
            "biasLevel": "biased",
            "biasType": "conspiracy",
            "explanation": "Unfalsifiable accusation. MIL: prioritize verifiable evidence."
          },
          {
            "text": "Let’s listen to multiple communities before forming judgments.",
            "biasLevel": "balanced",
            "biasType": "inclusive listening",
            "explanation": "Expands dialogue across groups."
          },
          {
            "text": "Anyone who disagrees is brainwashed.",
            "biasLevel": "biased",
            "biasType": "dismissive labeling",
            "explanation": "Avoids engaging with arguments. MIL: encourage discussion."
          },
          {
            "text": "Science evolves—we should update beliefs as new research emerges.",
            "biasLevel": "balanced",
            "biasType": "scientific mindset",
            "explanation": "Values adaptability."
          },
          {
            "text": "Opponents are evil and want to destroy society.",
            "biasLevel": "biased",
            "biasType": "demonization",
            "explanation": "Polarizes discourse. MIL: question motives with evidence."
          },
          {
            "text": "Let’s check if independent fact-checkers covered this claim.",
            "biasLevel": "balanced",
            "biasType": "fact-checking",
            "explanation": "Promotes verification through trusted intermediaries."
          },
          {
            "text": "Our community knows the truth; outsiders never will.",
            "biasLevel": "biased",
            "biasType": "elitism",
            "explanation": "Creates echo chamber isolation."
          },
          {
            "text": "Evidence can be interpreted differently, but facts remain the same.",
            "biasLevel": "balanced",
            "biasType": "distinction between fact/opinion",
            "explanation": "Models careful reasoning."
          },
          {
            "text": "The other side doesn’t care about people like us.",
            "biasLevel": "biased",
            "biasType": "victimhood narrative",
            "explanation": "Assumes intent. MIL: check policies, not feelings."
          },
          {
            "text": "Multiple solutions might work depending on the situation.",
            "biasLevel": "balanced",
            "biasType": "pluralism",
            "explanation": "Encourages flexible thinking."
          },
          {
            "text": "Only our leaders are trustworthy; everyone else deceives.",
            "biasLevel": "biased",
            "biasType": "leader worship",
            "explanation": "Discourages accountability."
          },
          {
            "text": "Different political ideologies sometimes overlap in goals.",
            "biasLevel": "balanced",
            "biasType": "bridge-building",
            "explanation": "Acknowledges shared values."
          },
          {
            "text": "It’s all propaganda if it doesn’t come from us.",
            "biasLevel": "biased",
            "biasType": "propaganda framing",
            "explanation": "Reduces trust in diverse sources."
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
