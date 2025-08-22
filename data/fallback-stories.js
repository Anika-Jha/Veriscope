// Fallback Stories for all Veriscope games
// These stories are used when AI analysis fails or is unavailable

const FALLBACK_STORIES = {
    rumorville: [
        {
            text: "BREAKING: Aliens spotted landing in Town Square at midnight! Multiple witnesses confirm seeing strange lights and unusual beings!",
            isTrue: false,
            explanation: "This is a classic example of sensationalized fake news. No credible sources, official statements, or physical evidence support alien landings. Always verify extraordinary claims with reliable sources."
        },
        {
            text: "Mayor announces new free health clinic opening next month to serve all residents regardless of insurance status.",
            isTrue: true,
            explanation: "This appears to be legitimate local government news. Health clinic announcements are typically verified through official city websites, press releases, or local news outlets."
        },
        {
            text: "Scientists discover chocolate can cure all diseases! Eat 10 bars daily for perfect health, doctors hate this one trick!",
            isTrue: false,
            explanation: "This is clearly misinformation. The sensational language ('cure ALL diseases', 'doctors hate this trick') are red flags. No single food can cure all diseases, and credible health advice comes from medical professionals."
        },
        {
            text: "Local elementary school announces annual science fair next Friday, encouraging student participation in STEM projects.",
            isTrue: true,
            explanation: "School announcements about educational events are typically factual and can be verified through school websites, newsletters, or official communications to parents."
        },
        {
            text: "GOVERNMENT COVER-UP: Secret documents reveal dragon sightings hidden from public for decades!",
            isTrue: false,
            explanation: "Conspiracy theories often use dramatic language like 'COVER-UP' and make extraordinary claims without credible evidence. Dragons are mythical creatures, and such claims require extraordinary proof."
        },
        {
            text: "Weekly farmers' market returns to Main Street this Sunday from 9 AM to 2 PM, featuring local produce and crafts.",
            isTrue: true,
            explanation: "Community event announcements are usually straightforward and factual. Farmers' markets are common public events that can be verified through local government or community organization websites."
        },
        {
            text: "URGENT: Click this link now for miracle diet that melts fat overnight! Doctors are shocked by these results!",
            isTrue: false,
            explanation: "This is a classic clickbait scam. Red flags include urgent language, unrealistic promises ('overnight' results), and pressure tactics. Legitimate health information doesn't use such manipulative language."
        },
        {
            text: "Town library adds 500 new books to children's section, expanding educational resources for young readers.",
            isTrue: true,
            explanation: "Library announcements about new acquisitions are typically factual institutional communications that can be verified by contacting the library directly."
        },
        {
            text: "WARNING: New computer virus spreads through Wi-Fi signals, can infect devices just by being near infected networks!",
            isTrue: false,
            explanation: "This is technologically impossible misinformation. While Wi-Fi networks can be compromised, viruses don't 'spread through signals' to just any nearby device. This misunderstands how computer security works."
        },
        {
            text: "High school robotics team wins regional championship, advances to state-level competition next month.",
            isTrue: true,
            explanation: "School achievement announcements are typically factual and can be verified through school websites, local news coverage, or official school district communications."
        }
    ],

    filterbubble: [
        {
            text: "Local farmer markets are struggling and many are closing due to decreased customer traffic",
            sentiment: "Negative",
            explanation: "This presents economic challenges in the community with a negative sentiment about local businesses."
        },
        {
            text: "Community volunteers come together to build new playground for neighborhood children",
            sentiment: "Positive", 
            explanation: "This highlights positive community engagement and collaborative efforts to improve local facilities."
        },
        {
            text: "Major tech companies report quarterly earnings with mixed results across different sectors",
            sentiment: "Neutral",
            explanation: "Business news presenting factual information about corporate performance without strong emotional direction."
        },
        {
            text: "Unemployment rates reach historic low as new job opportunities emerge in green energy sector",
            sentiment: "Positive",
            explanation: "Economic good news highlighting positive employment trends and emerging industry opportunities."
        },
        {
            text: "Severe drought conditions reported in neighboring regions affecting agricultural production",
            sentiment: "Negative",
            explanation: "Environmental challenges that impact communities and local economy with concerning implications."
        },
        {
            text: "Annual arts festival attracts thousands of visitors, boosting local tourism and business revenue",
            sentiment: "Positive", 
            explanation: "Cultural events creating positive economic impact and community engagement."
        },
        {
            text: "Government announces new tax regulations affecting small business operations starting next year",
            sentiment: "Negative",
            explanation: "Policy changes that may create challenges or concerns for small business owners."
        },
        {
            text: "Local tech startup secures funding to create 200 new jobs in the downtown area",
            sentiment: "Positive",
            explanation: "Economic development news highlighting job creation and local business growth."
        },
        {
            text: "Housing prices continue to rise making homeownership challenging for first-time buyers",
            sentiment: "Negative", 
            explanation: "Economic challenges affecting housing accessibility and affordability concerns."
        },
        {
            text: "City council approves expansion of public transportation system to better serve residents",
            sentiment: "Positive",
            explanation: "Infrastructure improvements that benefit community mobility and public service access."
        }
    ],

    digitaldetective: [
        {
            text: "BREAKING: Revolutionary miracle cure discovered by unknown scientists! This breakthrough will change medicine forever! Click here to learn the secret Big Pharma doesn't want you to know!",
            isCredible: false,
            explanation: "Multiple red flags indicate this is not credible: sensational language ('miracle cure'), anonymous sources ('unknown scientists'), conspiracy claims ('Big Pharma doesn't want you to know'), and clickbait format. Legitimate medical breakthroughs are published in peer-reviewed journals with named researchers."
        },
        {
            text: "World Health Organization releases comprehensive report on pandemic preparedness, outlining updated protocols based on recent global health challenges and scientific evidence.",
            isCredible: true,
            explanation: "This appears credible: WHO is an authoritative source for global health information, mentions specific content (pandemic preparedness protocols), and references scientific evidence. Can be verified through official WHO website and publications."
        },
        {
            text: "Celebrity endorses amazing new weight loss supplement that helped them lose 50 pounds in just 2 weeks! No diet or exercise needed! Order now!",
            isCredible: false,
            explanation: "This is not credible health information: unrealistic claims (50 pounds in 2 weeks is dangerous), celebrity endorsement doesn't equal scientific validity, promotes unhealthy practices (no diet/exercise), and uses commercial pressure tactics."
        },
        {
            text: "NASA announces findings from Mars rover mission, publishing detailed analysis of soil samples and geological data in collaboration with international space agencies.",
            isCredible: true,
            explanation: "NASA is a credible scientific authority, the content is specific (Mars rover, soil samples, geological data), mentions collaboration with other agencies, and would be published through official NASA channels and scientific journals."
        },
        {
            text: "You won't believe this shocking news about your favorite foods! Doctors are stunned by what they found! Number 7 will amaze you!",
            isCredible: false,
            explanation: "Classic clickbait format with emotional manipulation ('shocking', 'stunned', 'won't believe'), lacks specific information, uses numbered list format typical of low-quality content farms, and provides no source attribution."
        },
        {
            text: "University research team publishes peer-reviewed study on climate change impacts, with findings published in the Journal of Environmental Science after extensive review process.",
            isCredible: true,
            explanation: "Strong credibility indicators: university research (institutional backing), peer-review process (quality control), specific journal citation (verifiable), and mentions review process. Academic research follows rigorous standards for publication."
        },
        {
            text: "Forward this message to 10 friends to receive free gift cards worth $500! This offer expires in 24 hours and is only available to selected users!",
            isCredible: false,
            explanation: "This is a classic chain message scam. Red flags include: unrealistic free offers, pressure tactics (24-hour expiration), requires forwarding to others (viral scam mechanism), and lacks legitimate business contact information."
        },
        {
            text: "Department of Health issues public advisory on seasonal flu prevention, recommending vaccination and providing guidance on symptoms and treatment options.",
            isCredible: true,
            explanation: "Government health departments are authoritative sources for public health information, the content is appropriate for their mandate (flu prevention), and provides practical health guidance that can be verified through official health department websites."
        },
        {
            text: "Secret blog reveals the truth about vaccines causing mind control! Government conspiracy exposed by insider whistleblower! Share before it's deleted!",
            isCredible: false,
            explanation: "This promotes dangerous health misinformation with conspiracy theory elements: anonymous 'insider' source, extraordinary claims without evidence (mind control), fear tactics ('share before deleted'), and contradicts established medical science."
        },
        {
            text: "International panel of climate scientists releases peer-reviewed assessment of global temperature trends, published in Nature Climate Change with data from multiple research institutions.",
            isCredible: true,
            explanation: "High credibility: international scientific collaboration, peer-review process, publication in prestigious journal (Nature), multiple institutional backing, and specific data focus. This follows standard scientific publication protocols."
        }
    ],

    echochamber: [
        {
            text: "Everyone who disagrees with our position is clearly ignorant and hasn't done any real research on this topic!",
            biasLevel: "biased",
            biasType: "ad hominem",
            explanation: "This statement shows strong bias by dismissing all opposing views as 'ignorant' without engaging with their actual arguments. It uses ad hominem attacks rather than addressing the substance of different perspectives."
        },
        {
            text: "This is a complex issue with valid points on multiple sides. Maybe we should consider different perspectives before reaching conclusions.",
            biasLevel: "balanced",
            biasType: "nuanced thinking",
            explanation: "This statement demonstrates balanced thinking by acknowledging complexity, recognizing multiple valid perspectives, and advocating for careful consideration rather than quick judgments."
        },
        {
            text: "Our group is always right about everything, while those other people constantly spread lies and misinformation!",
            biasLevel: "biased", 
            biasType: "in-group favoritism",
            explanation: "This shows extreme in-group bias by claiming their group is 'always right' while demonizing others as liars. It reflects tribal thinking that prevents objective evaluation of ideas."
        },
        {
            text: "Recent scientific studies suggest the outcomes are mixed, with some evidence supporting different conclusions depending on various factors.",
            biasLevel: "balanced",
            biasType: "evidence-based",
            explanation: "This statement shows balanced reasoning by referencing scientific evidence, acknowledging mixed results, and recognizing that conclusions may vary based on different factors and contexts."
        },
        {
            text: "If you don't agree with us, you're obviously brainwashed by mainstream media and can't think for yourself!",
            biasLevel: "biased",
            biasType: "conspiracy thinking",
            explanation: "This demonstrates bias through conspiracy thinking and personal attacks. Instead of engaging with opposing arguments, it dismisses disagreement as 'brainwashing' and questions others' mental autonomy."
        },
        {
            text: "It's a complicated situation where reasonable people can examine the same evidence and reach different conclusions.",
            biasLevel: "balanced",
            biasType: "intellectual humility", 
            explanation: "This shows intellectual balance by acknowledging that complexity can lead to different interpretations, respecting others as 'reasonable people,' and recognizing that evidence can be interpreted differently."
        },
        {
            text: "Only complete fools would believe anything different from what we know to be true. There's no other rational explanation!",
            biasLevel: "biased",
            biasType: "absolute thinking",
            explanation: "This exhibits bias through absolute thinking ('only fools', 'no other explanation') and intellectual arrogance. It refuses to consider alternative viewpoints and attacks the intelligence of those who disagree."
        },
        {
            text: "Experts across different fields are actively debating this issue, suggesting there are legitimate questions worth exploring further.",
            biasLevel: "balanced",
            biasType: "expert consultation",
            explanation: "This demonstrates balanced thinking by acknowledging expert debate, recognizing legitimate questions exist, and showing openness to further exploration rather than claiming definitive answers."
        },
        {
            text: "Our side represents everything good and moral, while their side is completely evil and destructive to society!",
            biasLevel: "biased",
            biasType: "moral superiority",
            explanation: "This shows extreme bias through moral polarization, painting their group as entirely good and others as entirely evil. This black-and-white thinking prevents understanding nuanced positions and common ground."
        },
        {
            text: "Nuance is important here because there are multiple stakeholders with different but understandable concerns and priorities.",
            biasLevel: "balanced",
            biasType: "stakeholder awareness",
            explanation: "This reflects balanced thinking by emphasizing nuance, recognizing multiple stakeholders, and showing empathy for different concerns and priorities rather than dismissing opposing viewpoints."
        }
    ]
};

// Export the fallback stories for use in games
window.FALLBACK_STORIES = FALLBACK_STORIES;
