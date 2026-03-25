import { useState, useEffect, useRef } from "react";

const NICHES = [
  { id: "finance", label: "💰 Finance", color: "#d4f7dc", accent: "#1a7a3a" },
  { id: "parenting", label: "👶 Parenting", color: "#fce4ec", accent: "#b5294e" },
  { id: "lifestyle", label: "✨ Lifestyle", color: "#e8eaf6", accent: "#3949ab" },
  { id: "fitness", label: "🏋️ Fitness", color: "#fff3e0", accent: "#e65100" },
  { id: "food", label: "🍜 Food", color: "#fdf3dc", accent: "#b06000" },
  { id: "tech", label: "💻 Tech", color: "#e0f2f1", accent: "#00695c" },
  { id: "beauty", label: "💄 Beauty", color: "#fce4f6", accent: "#8e24aa" },
  { id: "mindset", label: "🧠 Mindset", color: "#ede7f6", accent: "#4527a0" },
];

const IDEA_CARDS = {
  finance: [
    "The real cost of buying coffee every day (the math will shock you)",
    "How I saved $5k without feeling broke",
    "3 subscriptions you're forgetting to cancel right now",
    "What a $1,000 emergency fund actually gets you",
    "Why your 20s are the best time to start investing",
    "The envelope budgeting method explained simply",
    "How to negotiate your bills in 10 minutes",
    "What I wish I knew about credit scores at 22",
  ],
  parenting: [
    "Toddler meal ideas for picky eaters (actually works)",
    "5-minute wind-down routine that puts kids to sleep fast",
    "Screen time: what the research actually says",
    "How to talk to your toddler about big emotions",
    "The toy rotation trick that keeps kids entertained",
    "Why 'good job' might not be the best thing to say",
    "What to do when your kid won't eat anything new",
    "Gentle ways to handle toddler tantrums in public",
  ],
  lifestyle: [
    "The Sunday reset routine that changed my week",
    "How I decluttered without feeling guilty",
    "Morning habits that actually stick (from someone with ADHD)",
    "Why I stopped making my bed every day",
    "The 15-minute home reset that keeps things clean",
    "What a slow morning really looks like",
    "How I simplified my wardrobe and stopped hating it",
    "A real look at what digital minimalism does for you",
  ],
  fitness: [
    "The 10-minute workout you'll actually do every day",
    "Why rest days are doing more than you think",
    "How to start working out when you hate working out",
    "The truth about walking as exercise",
    "What happened when I did 30 days of yoga",
    "How to build a home gym for under $100",
    "The difference between soreness and injury",
    "Why you don't need to track every calorie",
  ],
  food: [
    "5 meals I make every week for under $50",
    "The lazy girl's meal prep that actually saves time",
    "Why your pasta water is the most important ingredient",
    "The one sauce that goes on everything",
    "How to make rice taste like a restaurant",
    "Fridge cleanout recipe that always works",
    "The 3-ingredient dinners my family loves",
    "What cooking for a picky toddler taught me",
  ],
  tech: [
    "5 free AI tools I use every single day",
    "How to protect your privacy online (basics)",
    "The apps that actually improved my productivity",
    "Why I deleted social media and came back",
    "How to use ChatGPT for your actual job",
    "The browser extensions you're missing",
    "What automation I set up that saves me 3 hours a week",
    "Why your password strategy is probably wrong",
  ],
  beauty: [
    "The 5-product routine I never skip",
    "How I cleared my skin without expensive products",
    "What I actually spend on beauty per month (honest)",
    "Drugstore dupes that beat the luxury version",
    "The skincare order everyone gets wrong",
    "Why less really is more when it comes to makeup",
    "How to find your undertone once and for all",
    "The one beauty habit that changed everything",
  ],
  mindset: [
    "The journaling prompt that shifted my whole perspective",
    "What I learned from failing publicly",
    "How to stop overthinking (something that actually works)",
    "The difference between motivation and discipline",
    "Why you don't need to be consistent every day",
    "What therapy taught me that I wish I knew sooner",
    "How to stop comparing yourself on social media",
    "The mindset shift that made me stop procrastinating",
  ],
};

const PLATFORMS = ["TikTok", "YouTube", "Substack", "Instagram", "LinkedIn", "Podcast"];

const PLATFORM_ICONS = {
  TikTok: "🎵",
  YouTube: "▶️",
  Substack: "📝",
  Instagram: "📸",
  LinkedIn: "💼",
  Podcast: "🎙️",
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function IdeaCard({ idea, niche, accent, onGenerate, isActive, onClick }) {
  const [platform, setPlatform] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    if (!isActive) {
      setOutput("");
      setGenerated(false);
      setPlatform("");
    }
  }, [isActive]);

  const handleGenerate = async () => {
    if (!platform) return;
    setLoading(true);
    setOutput("");

    // Simulate a loading delay so it feels real
    await new Promise((res) => setTimeout(res, 1400));

    const getMockOutput = (platform, idea, niche) => {
      const templates = {
        TikTok: `[HOOK]
Nobody talks about this in the ${niche} space, but: ${idea}. And I had to figure it out on my own.

[BODY]
Here's what most people miss:
→ It's not about doing more — it's about doing the right thing
→ Once you understand this, it compounds over time
→ The people getting results? They all figured this out

I used to skip past this completely. Now it's one of the first things I think about.

[CTA]
Save this if it resonated. And follow for more ${niche} content that actually tells you the truth. 👇`,

        YouTube: `[HOOK]
"${idea}" — I wish someone had told me this years ago. Nobody did, so I figured it out myself, and today I'm walking you through all of it.

[PREVIEW]
In this video, we're covering exactly what this means, why most people get it wrong, and the simple shift that made it click for me. No fluff — just what actually works in the ${niche} space.

By the end you'll know exactly what to do next, no matter where you're starting from.

[CTA]
If you're into real, practical ${niche} content — hit subscribe. I post every week and I don't waste your time. Let's get into it.`,

        Substack: `There's a version of me from a few years ago who really needed to read this.

She was doing everything "right" — or at least what she thought was right. Following the standard advice, copying what seemed to work for others, waiting to feel ready before making moves.

Then something shifted. Not overnight. But slowly I started paying attention to one thing: ${idea}.

It sounds obvious when you say it out loud. But actually sitting with it — applying it in the ${niche} space — is completely different.

This week I want to get into what I've actually learned about this. What the standard advice gets wrong. What made a real difference. And what I'd tell someone starting from zero.

There's a lot here. Let's go. ↓`,

        Instagram: `Hot take for anyone in the ${niche} space: ${idea} — and most people never talk about why. 👇

Here's what I've actually learned:
→ It's not about doing more, it's about doing the right thing consistently
→ The basics work if you stick with them
→ Progress is slower than the internet makes it look — and that's okay

The shift that changed everything for me was just being honest about where I was starting from. No shortcuts. No comparison. Just showing up.

What's one thing about ${niche} you had to figure out the hard way? Drop it below. 👇

#${niche}tips #${niche}life #contenttips #creatorlife #realness`,

        LinkedIn: `Something the ${niche} space doesn't say enough: ${idea}.

I didn't learn this from a course or a book. I learned it by doing the work and paying close attention to what actually happened.

The standard advice is fine — but it assumes everyone starts from the same place with the same context. They don't.

What moved the needle for me was getting specific. Specific about what I was trying to achieve. Specific about what was working. Specific about what I was willing to trade off.

That specificity is what I try to bring to everything I share here.

What's one insight from the ${niche} space you had to discover yourself? I'd love to hear it in the comments.`,

        Podcast: `Hey, welcome back. Glad you're here today — this one has been sitting in my head for a while and I'm finally ready to dig into it properly.

The topic: ${idea}.

If you've been in the ${niche} space for any amount of time, you've probably heard surface-level takes on this. The usual stuff. Some of it is fine — but I think we can go deeper.

There's something underneath the obvious advice that doesn't get enough airtime. And today that's what we're doing. I'm going to share what I've actually experienced, what I've seen work, and what I think most people are getting backwards.

Grab something to drink. Get comfortable. Let's get into it.`,
      };

      return templates[platform] || `[MOCK] ${platform} content for: "${idea}" in the ${niche} niche.`;
    };

    setOutput(getMockOutput(platform, idea, niche));
    setGenerated(true);
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div
      ref={cardRef}
      onClick={!isActive ? onClick : undefined}
      style={{
        background: "white",
        border: `2px solid ${isActive ? accent : "#e8e8e8"}`,
        borderRadius: "16px",
        padding: isActive ? "24px" : "20px",
        cursor: isActive ? "default" : "pointer",
        transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        transform: isActive ? "scale(1.02)" : "scale(1)",
        boxShadow: isActive
          ? `0 8px 32px ${accent}22, 0 2px 8px rgba(0,0,0,0.08)`
          : "0 2px 8px rgba(0,0,0,0.06)",
        gridColumn: isActive ? "1 / -1" : "auto",
      }}
    >
      <p style={{
        fontFamily: "'Fraunces', Georgia, serif",
        fontSize: isActive ? "1.15rem" : "0.95rem",
        fontWeight: 600,
        color: "#1a1a1a",
        margin: 0,
        lineHeight: 1.4,
      }}>
        {idea}
      </p>

      {isActive && (
        <div style={{ marginTop: "20px" }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#666", marginBottom: "10px", fontWeight: 500 }}>
            What are you creating this for?
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
            {PLATFORMS.map((p) => (
              <button
                key={p}
                onClick={() => setPlatform(p)}
                style={{
                  padding: "8px 14px",
                  borderRadius: "100px",
                  border: `2px solid ${platform === p ? accent : "#e0e0e0"}`,
                  background: platform === p ? accent : "white",
                  color: platform === p ? "white" : "#444",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {PLATFORM_ICONS[p]} {p}
              </button>
            ))}
          </div>

          <button
            onClick={handleGenerate}
            disabled={!platform || loading}
            style={{
              padding: "12px 24px",
              borderRadius: "100px",
              border: "none",
              background: platform && !loading ? accent : "#ccc",
              color: "white",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.9rem",
              fontWeight: 700,
              cursor: platform && !loading ? "pointer" : "not-allowed",
              transition: "all 0.2s",
              letterSpacing: "0.01em",
            }}
          >
            {loading ? "✨ Generating..." : generated ? "↺ Regenerate" : "✨ Generate Content"}
          </button>

          {output && (
            <div style={{
              marginTop: "20px",
              background: "#fafafa",
              borderRadius: "12px",
              padding: "20px",
              border: "1px solid #eee",
              position: "relative",
            }}>
              <pre style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.88rem",
                color: "#2a2a2a",
                whiteSpace: "pre-wrap",
                lineHeight: 1.65,
                margin: 0,
              }}>
                {output}
              </pre>
              <button
                onClick={copyToClipboard}
                style={{
                  marginTop: "14px",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  border: `1px solid ${accent}`,
                  background: "white",
                  color: accent,
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                📋 Copy
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function MicroMuse() {
  const [selectedNiche, setSelectedNiche] = useState(null);
  const [cards, setCards] = useState([]);
  const [activeCard, setActiveCard] = useState(null);

  const niche = NICHES.find((n) => n.id === selectedNiche);

  const handleSelectNiche = (id) => {
    setSelectedNiche(id);
    setCards(shuffle(IDEA_CARDS[id]).slice(0, 6));
    setActiveCard(null);
  };

  const handleShuffle = () => {
    setCards(shuffle(IDEA_CARDS[selectedNiche]).slice(0, 6));
    setActiveCard(null);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: selectedNiche ? niche.color : "#f4f0eb",
      transition: "background 0.5s ease",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,700;1,9..144,400&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{
        padding: "32px 40px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid rgba(0,0,0,0.07)",
      }}>
        <div>
          <h1 style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
            fontWeight: 700,
            color: selectedNiche ? niche.accent : "#1a1a1a",
            margin: 0,
            letterSpacing: "-0.02em",
            transition: "color 0.4s",
          }}>
            MicroMuse ✦
          </h1>
          <p style={{
            fontSize: "0.85rem",
            color: "#888",
            margin: "4px 0 0",
            fontWeight: 500,
          }}>
            Pick a niche. Get ideas. Make content.
          </p>
        </div>
        {selectedNiche && (
          <button
            onClick={() => { setSelectedNiche(null); setActiveCard(null); }}
            style={{
              padding: "8px 16px",
              borderRadius: "100px",
              border: `2px solid ${niche.accent}`,
              background: "transparent",
              color: niche.accent,
              fontSize: "0.82rem",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            ← Change niche
          </button>
        )}
      </div>

      <div style={{ padding: "32px 40px", maxWidth: "900px", margin: "0 auto" }}>
        {!selectedNiche ? (
          <>
            <h2 style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#1a1a1a",
              marginBottom: "6px",
            }}>
              What do you create content about?
            </h2>
            <p style={{ color: "#888", fontSize: "0.9rem", marginBottom: "28px" }}>
              Choose a niche and we'll give you ideas ready to go.
            </p>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
              gap: "14px",
            }}>
              {NICHES.map((n) => (
                <button
                  key={n.id}
                  onClick={() => handleSelectNiche(n.id)}
                  style={{
                    padding: "22px 18px",
                    borderRadius: "16px",
                    border: "2px solid transparent",
                    background: n.color,
                    color: n.accent,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "1rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px) scale(1.03)";
                    e.currentTarget.style.boxShadow = `0 8px 24px ${n.accent}30`;
                    e.currentTarget.style.borderColor = n.accent;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)";
                    e.currentTarget.style.borderColor = "transparent";
                  }}
                >
                  {n.label}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
              <div>
                <h2 style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  color: niche.accent,
                  margin: 0,
                }}>
                  {niche.label} ideas
                </h2>
                <p style={{ color: "#888", fontSize: "0.85rem", margin: "4px 0 0" }}>
                  Click any card to generate content for it
                </p>
              </div>
              <button
                onClick={handleShuffle}
                style={{
                  padding: "10px 20px",
                  borderRadius: "100px",
                  border: "none",
                  background: niche.accent,
                  color: "white",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                🔀 Shuffle ideas
              </button>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "14px",
            }}>
              {cards.map((idea, i) => (
                <IdeaCard
                  key={idea}
                  idea={idea}
                  niche={selectedNiche}
                  accent={niche.accent}
                  isActive={activeCard === i}
                  onClick={() => setActiveCard(activeCard === i ? null : i)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div style={{
        textAlign: "center",
        padding: "24px",
        color: "#aaa",
        fontSize: "0.78rem",
        fontWeight: 500,
      }}>
        MicroMuse — built for creators who actually want to make stuff
      </div>
    </div>
  );
}
