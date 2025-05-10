import { Article } from '../types/Article';
import { Comment } from '../types/Comment';
import { User } from '../types/User';

// Mock Users
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
    bio: 'Writer, tech enthusiast, and coffee lover. Sharing thoughts on the digital world.',
    joinedAt: '2023-01-15T12:00:00Z',
    followers: 128,
    following: 76,
  },
  {
    id: '2',
    name: 'Jane Smith',
    username: 'janesmith',
    email: 'jane@example.com',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
    bio: 'Digital artist and UI/UX designer. Passionate about creating beautiful interfaces.',
    joinedAt: '2023-02-18T09:30:00Z',
    followers: 235,
    following: 112,
  },
  {
    id: '3',
    name: 'Robert Johnson',
    username: 'robertj',
    email: 'robert@example.com',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=300',
    bio: 'Software engineer and open-source contributor. Building solutions for everyday problems.',
    joinedAt: '2023-03-05T15:45:00Z',
    followers: 89,
    following: 42,
  },
];

// Mock Articles
export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'The Future of Web Development: Trends to Watch in 2025',
    content: `<p>The web development landscape is constantly evolving, and staying ahead of the curve is essential for developers and businesses alike. As we look toward 2025, several emerging trends are set to reshape how we build and interact with web applications.</p>
    
    <h2>1. WebAssembly Goes Mainstream</h2>
    <p>WebAssembly (Wasm) has been gaining traction for years, but 2025 may be the year it truly goes mainstream. With near-native performance and the ability to use languages like Rust, C++, and Go in the browser, WebAssembly is enabling a new class of high-performance web applications that were previously unimaginable.</p>
    
    <p>Major companies like Adobe, Google, and Microsoft are investing heavily in WebAssembly technology, bringing professional-grade applications to the browser without sacrificing performance.</p>
    
    <h2>2. AI-Driven Development</h2>
    <p>Artificial intelligence is no longer just a buzzword—it's becoming an integral part of the development process itself. AI-assisted coding tools can now generate entire components, suggest optimizations, and even debug code with remarkable accuracy.</p>
    
    <p>By 2025, we'll see most development environments featuring advanced AI assistants that work alongside developers, significantly boosting productivity and code quality while reducing the time spent on repetitive tasks.</p>
    
    <h2>3. The Rise of Edge Computing</h2>
    <p>As users demand ever-faster experiences, traditional client-server architectures are giving way to edge computing models. By deploying code closer to end-users, developers can dramatically reduce latency and improve performance.</p>
    
    <p>Edge functions and distributed data processing will become standard components of web architecture, with frameworks and platforms making these capabilities more accessible to developers of all skill levels.</p>
    
    <h2>4. Enhanced Accessibility as Standard</h2>
    <p>Accessibility is transitioning from an afterthought to a fundamental aspect of web development. In 2025, we'll see accessibility features baked into development frameworks and design systems from the ground up.</p>
    
    <p>Automated testing for accessibility compliance will become more sophisticated, helping developers create inclusive experiences without significant additional effort. This shift will not only benefit users with disabilities but will improve usability for everyone.</p>
    
    <h2>The Road Ahead</h2>
    <p>The future of web development is bright, with new technologies making it possible to create faster, more accessible, and more powerful applications than ever before. Developers who embrace these trends will be well-positioned to create the next generation of web experiences.</p>
    
    <p>What trends are you most excited about? How do you see the web development landscape evolving beyond 2025? Share your thoughts in the comments below!</p>`,
    excerpt: 'Explore the cutting-edge trends that will define web development in 2025, from WebAssembly and AI-driven development to edge computing and accessibility innovations.',
    coverImage: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    publishedAt: '2023-10-15T09:00:00Z',
    readTime: 8,
    category: 'technology',
    tags: ['webdev', 'javascript', 'programming', 'future', 'ai'],
    author: mockUsers[0],
    likeCount: 152,
    commentCount: 24,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: '2',
    title: 'Designing Intuitive User Interfaces: Principles and Practices',
    content: `<p>Great user interfaces don't happen by accident. They're the result of thoughtful design decisions guided by well-established principles and user-centered practices. In this article, we'll explore the fundamental principles of intuitive UI design and how to apply them in your projects.</p>
    
    <h2>Understanding User Expectations</h2>
    <p>Users come to your interface with expectations shaped by their previous experiences. The most intuitive interfaces acknowledge these expectations and work with them rather than against them. This is why we see common patterns across applications—they leverage the user's existing mental models.</p>
    
    <p>For example, users expect a shopping cart icon to lead to their cart contents, and a hamburger menu to reveal navigation options. Deviating from these established patterns without good reason creates friction and confusion.</p>
    
    <h2>The Principle of Least Surprise</h2>
    <p>Elements in your interface should behave in a way that users can anticipate. When a button looks like a button, users expect it to be clickable. When they click it, they expect something to happen immediately. Any deviation from this expected behavior creates cognitive load.</p>
    
    <p>This principle extends to every interaction: form submissions should validate inputs predictably; swiping gestures should be consistent; error messages should be helpful and placed near the point of error.</p>
    
    <h2>Visual Hierarchy and Information Architecture</h2>
    <p>Not all elements in your interface are equally important. A clear visual hierarchy guides users through the content in order of importance, using size, color, contrast, and spacing to indicate relationships and priority.</p>
    
    <p>Similarly, a well-thought-out information architecture ensures that users can find what they're looking for intuitively. This means grouping related items together, creating logical navigation paths, and avoiding deep hierarchies that hide important content.</p>
    
    <h2>Feedback and Responsiveness</h2>
    <p>Every user action deserves a reaction. When users interact with your interface, they should receive immediate feedback confirming that their action was recognized. This could be as simple as a button changing state when clicked or as complex as a progress indicator for a longer process.</p>
    
    <p>The absence of feedback leaves users wondering if their action was registered, often leading to repeated clicks or frustrated abandonment.</p>
    
    <h2>Accessibility is Intuitive Design</h2>
    <p>Designing for accessibility isn't just about compliance or reaching a wider audience—though these are important benefits. Accessible design is inherently more intuitive for everyone.</p>
    
    <p>Clear contrast, descriptive labels, keyboard navigation, and logical tab order make interfaces more usable for people with disabilities but also create a smoother experience for all users.</p>
    
    <h2>Testing with Real Users</h2>
    <p>No matter how closely you follow design principles, there's no substitute for watching real users interact with your interface. User testing reveals pain points that designers might miss and highlights opportunities for improvement.</p>
    
    <p>Even simple tests with a small number of users can uncover major usability issues. The key is to test early and often, incorporating feedback into the design process rather than waiting until the end.</p>
    
    <h2>Conclusion</h2>
    <p>Designing intuitive user interfaces is both an art and a science. By understanding user expectations, following established patterns, creating clear visual hierarchies, providing consistent feedback, and testing with real users, you can create interfaces that feel natural and effortless.</p>
    
    <p>Remember that the best interface is often one that users don't even notice—because it allows them to accomplish their goals without thinking about the interface itself.</p>`,
    excerpt: 'Discover the core principles behind intuitive user interfaces and learn practical techniques for designing experiences that feel natural and effortless to users.',
    coverImage: 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    publishedAt: '2023-09-28T14:30:00Z',
    readTime: 7,
    category: 'design',
    tags: ['uiux', 'design', 'userexperience', 'accessibility'],
    author: mockUsers[1],
    likeCount: 208,
    commentCount: 32,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: '3',
    title: 'Building a Sustainable Business: Strategies for Long-Term Success',
    content: `<p>In today's rapidly changing business landscape, building for long-term sustainability is more important than ever. While quick growth and short-term profits might attract initial attention, it's the businesses with sustainable models and practices that truly stand the test of time.</p>
    
    <h2>Beyond Profit: The Triple Bottom Line</h2>
    <p>Sustainable businesses operate on what's known as the "triple bottom line" — a framework that considers not just profits, but also people and the planet. This holistic approach recognizes that long-term business success depends on social and environmental health as much as financial performance.</p>
    
    <p>Companies like Patagonia have demonstrated that prioritizing environmental responsibility and ethical labor practices can create strong brand loyalty and drive long-term profitability, even if it sometimes means higher short-term costs.</p>
    
    <h2>Building Resilient Business Models</h2>
    <p>The most sustainable businesses are those that can weather economic downturns, supply chain disruptions, and shifting market conditions. This resilience comes from diversified revenue streams, healthy cash reserves, and adaptable operations.</p>
    
    <p>Consider how companies that invested in digital transformation before the COVID-19 pandemic were better positioned to adapt when physical locations had to close. Their foresight in building flexible, technology-enabled business models paid dividends when market conditions suddenly changed.</p>
    
    <h2>Long-term Customer Relationships</h2>
    <p>Acquiring new customers is typically much more expensive than retaining existing ones. Sustainable businesses focus on building lasting customer relationships through exceptional service, consistent quality, and values alignment.</p>
    
    <p>Subscription-based models exemplify this approach, creating predictable revenue streams while encouraging businesses to continuously deliver value to maintain renewals. Companies like Adobe have successfully transitioned from one-time purchases to subscription services, creating more sustainable revenue patterns.</p>
    
    <h2>Investing in Your Team</h2>
    <p>High employee turnover is costly and disruptive. Sustainable businesses invest in their people through fair compensation, professional development opportunities, inclusive cultures, and meaningful work.</p>
    
    <p>Organizations with engaged employees typically outperform their competitors in productivity, customer satisfaction, and profitability. They also benefit from institutional knowledge retention and stronger team collaboration.</p>
    
    <h2>Sustainable Supply Chains</h2>
    <p>A business is only as sustainable as its supply chain. Forward-thinking companies audit their suppliers for environmental practices, labor conditions, and business stability.</p>
    
    <p>Local sourcing where possible, diversifying suppliers to reduce dependency, and building collaborative supplier relationships all contribute to supply chain resilience and sustainability.</p>
    
    <h2>Adapting to Change While Maintaining Core Values</h2>
    <p>Paradoxically, sustainability requires both consistency and adaptation. The most enduring businesses maintain unwavering core values while continuously evolving their strategies and operations to meet changing market conditions.</p>
    
    <p>This balance allows them to build trusted brands while avoiding the trap of outdated business models or products. Companies like IBM have reinvented themselves multiple times over decades while maintaining their fundamental commitment to innovation and customer service.</p>
    
    <h2>Conclusion</h2>
    <p>Building a sustainable business isn't about quick wins or growth at all costs. It's about creating an organization that generates value for all stakeholders—customers, employees, communities, and shareholders—over the long term.</p>
    
    <p>By embracing the triple bottom line, building resilient business models, fostering long-term relationships, investing in people, creating sustainable supply chains, and balancing adaptation with core values, businesses can position themselves for enduring success in an uncertain world.</p>`,
    excerpt: 'Learn essential strategies for building a business that thrives over the long term through sustainable practices, resilient models, and stakeholder-focused approaches.',
    coverImage: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    publishedAt: '2023-09-10T11:15:00Z',
    readTime: 9,
    category: 'business',
    tags: ['sustainability', 'business', 'entrepreneurship', 'leadership'],
    author: mockUsers[2],
    likeCount: 178,
    commentCount: 45,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: '4',
    title: 'Mindful Living: Incorporating Wellness Practices Into Your Daily Routine',
    content: `<p>In our fast-paced world, finding balance and maintaining well-being can feel like an impossible challenge. Yet, incorporating simple mindfulness practices into your daily routine can make a profound difference in your mental, emotional, and physical health.</p>
    
    <h2>The Morning Mindfulness Ritual</h2>
    <p>How you start your day sets the tone for everything that follows. Instead of immediately reaching for your phone—which floods your brain with information and potential stressors—consider creating a morning ritual that centers and grounds you.</p>
    
    <p>This might include a short meditation, gentle stretching, journaling, or simply enjoying your morning beverage with full attention. Even five minutes of mindful presence before diving into the day's demands can shift your entire perspective.</p>
    
    <h2>Mindful Transitions</h2>
    <p>Modern life often has us rushing from one task to the next without pause. Introducing brief moments of mindfulness between activities—what psychologists call "transitions"—can prevent stress accumulation and mental fatigue.</p>
    
    <p>Try taking three conscious breaths before starting a new task, changing your physical position between activities, or spending 30 seconds simply noticing your surroundings when moving between spaces. These micro-practices create small but powerful resets throughout your day.</p>
    
    <h2>The Art of Single-Tasking</h2>
    <p>Contrary to popular belief, multitasking isn't a sign of productivity—it's a recipe for decreased performance and increased stress. Mindful productivity embraces the power of giving one thing your full attention.</p>
    
    <p>This might mean closing unnecessary browser tabs, setting specific times for checking email, or using techniques like the Pomodoro method (focused work intervals followed by short breaks). By honoring one task at a time, you'll likely find yourself more efficient and less mentally drained.</p>
    
    <h2>Mindful Eating</h2>
    <p>Many of us eat on autopilot, barely tasting our food as we scroll through social media or work through lunch. Mindful eating invites us back to the sensory experience of nourishment.</p>
    
    <p>Try eating one meal a day without digital distractions. Notice the colors, smells, textures, and flavors of your food. Chew thoroughly and pause between bites. This practice not only enhances enjoyment but also improves digestion and helps regulate appetite.</p>
    
    <h2>Movement as Meditation</h2>
    <p>Exercise doesn't have to be another checkbox on your to-do list. When approached mindfully, physical movement becomes a form of moving meditation that integrates body and mind.</p>
    
    <p>Whether it's walking, yoga, swimming, or gardening, bring your attention to the sensations in your body, the rhythm of your breath, and the feeling of being fully alive in the present moment. This transforms exercise from obligation to revitalization.</p>
    
    <h2>Digital Boundaries</h2>
    <p>Perhaps the greatest challenge to modern mindfulness is our relationship with technology. Creating intentional boundaries around digital consumption preserves mental space and attention.</p>
    
    <p>Consider implementing a digital sunset (no screens 1-2 hours before bed), designated device-free times or spaces in your home, or apps that limit social media usage. These boundaries protect your capacity for presence and deep thought.</p>
    
    <h2>Evening Reflection</h2>
    <p>Just as a mindful morning sets a positive tone, an evening reflection practice helps process the day's experiences and prepare for restorative rest.</p>
    
    <p>This might include noting three things you're grateful for, a brief meditation, gentle stretching, or reading something inspiring. Creating closure for the day signals to your mind and body that it's time to release effort and embrace rest.</p>
    
    <h2>Starting Small</h2>
    <p>The key to sustainable wellness practices isn't dramatic life overhauls but small, consistent actions that gradually reshape your relationship with daily life. Start with just one practice that resonates with you, integrate it until it becomes natural, then add another.</p>
    
    <p>Remember that mindfulness isn't about perfection—it's about returning again and again to the present moment with kindness and curiosity. Each moment of awareness is a success, regardless of what came before or follows after.</p>`,
    excerpt: 'Discover simple yet powerful mindfulness practices that you can incorporate into your daily routine to reduce stress, enhance well-being, and live more fully in the present moment.',
    coverImage: 'https://images.pexels.com/photos/3560044/pexels-photo-3560044.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    publishedAt: '2023-08-22T16:45:00Z',
    readTime: 8,
    category: 'lifestyle',
    tags: ['wellness', 'mindfulness', 'health', 'selfcare'],
    author: mockUsers[1],
    likeCount: 245,
    commentCount: 38,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: '5',
    title: 'The Renaissance of AI: How Machine Learning is Transforming Industries',
    content: `<p>Artificial intelligence (AI) has moved from science fiction to practical reality, unleashing a transformation across virtually every industry. This technological renaissance is redefining what's possible and creating new paradigms for how businesses operate and deliver value.</p>
    
    <h2>From Data to Intelligence</h2>
    <p>At the heart of the AI revolution is the ability to convert vast amounts of data into actionable intelligence. Machine learning models can now analyze patterns that would be impossible for humans to detect, revealing insights that drive better decision-making.</p>
    
    <p>Companies that embrace this capability gain a significant competitive advantage. For instance, retailers using AI can predict inventory needs with remarkable accuracy, reducing both stockouts and excess inventory while optimizing the supply chain end-to-end.</p>
    
    <h2>Healthcare's AI Transformation</h2>
    <p>Perhaps no field shows more promise for AI-driven transformation than healthcare. Machine learning algorithms now assist with everything from diagnosis to treatment planning to drug discovery.</p>
    
    <p>AI systems can detect early signs of diseases like cancer in medical images with accuracy that rivals or exceeds human experts. They can analyze genetic information to recommend personalized treatments. And they're accelerating pharmaceutical research by predicting which compounds are most likely to succeed as treatments, potentially saving years in the drug development process.</p>
    
    <h2>Reimagining Manufacturing</h2>
    <p>In manufacturing, AI-powered predictive maintenance is preventing costly equipment failures by identifying subtle signs of potential problems before they cause breakdowns. Smart factories use computer vision to detect quality issues that would be invisible to human inspectors.</p>
    
    <p>Perhaps most significantly, AI is enabling a shift toward mass customization, where products can be tailored to individual preferences while maintaining the efficiency of mass production—a capability that was economically unfeasible before advanced automation and intelligence.</p>
    
    <h2>Financial Services Revolution</h2>
    <p>The financial industry has been transformed by AI-powered risk assessment models that can evaluate creditworthiness more accurately than traditional methods, expanding access to financial services while reducing default rates.</p>
    
    <p>Algorithmic trading systems make split-second decisions based on market conditions, while fraud detection systems identify suspicious patterns across billions of transactions, saving financial institutions billions in potential losses.</p>
    
    <h2>Customer Experience Reimagined</h2>
    <p>AI is redefining customer interactions across industries. Natural language processing powers conversational AI that can handle customer inquiries with increasing sophistication. Recommendation engines analyze behavioral patterns to suggest relevant products or content. Personalization engines deliver customized experiences at scale.</p>
    
    <p>These capabilities are raising customer expectations, making AI-driven personalization the new standard rather than a competitive advantage.</p>
    
    <h2>The Human-AI Partnership</h2>
    <p>Contrary to fears of widespread job displacement, the most successful AI implementations are those that enhance human capabilities rather than replacing them. This collaborative approach combines AI's analytical power and consistency with human creativity, judgment, and empathy.</p>
    
    <p>For example, in legal services, AI can rapidly review thousands of documents to identify relevant information, allowing attorneys to focus on strategy and client advocacy. In creative fields, AI tools can generate options or handle technical tasks, freeing human creators to focus on conceptual work and emotional resonance.</p>
    
    <h2>Challenges and Considerations</h2>
    <p>The AI renaissance brings important challenges alongside its opportunities. Ensuring that AI systems are transparent, fair, and free from harmful biases remains a critical concern. Data privacy and security take on new dimensions as AI systems require vast amounts of information to function effectively.</p>
    
    <p>Organizations must also consider the workforce implications of AI adoption, investing in reskilling programs and creating new roles that leverage uniquely human capabilities.</p>
    
    <h2>Looking Forward</h2>
    <p>As AI capabilities continue to advance, we're likely to see even more profound transformations across industries. Organizations that approach this technology thoughtfully—focusing on augmenting human capabilities rather than simply reducing costs—will be best positioned to thrive in this new landscape.</p>
    
    <p>The AI renaissance isn't about replacing humanity with technology; it's about creating systems that amplify human ingenuity and allow us to solve problems that were previously beyond our reach.</p>`,
    excerpt: 'Explore how artificial intelligence and machine learning are revolutionizing industries from healthcare to manufacturing to finance, creating new possibilities and changing how businesses operate.',
    coverImage: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    publishedAt: '2023-08-05T10:30:00Z',
    readTime: 10,
    category: 'technology',
    tags: ['ai', 'machinelearning', 'technology', 'innovation'],
    author: mockUsers[0],
    likeCount: 312,
    commentCount: 57,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: '6',
    title: 'Sustainable Architecture: Designing Buildings for the Future',
    content: `<p>Architecture has always reflected the values and challenges of its time. Today, as we face climate change and resource depletion, sustainable architecture has emerged not just as a trend but as an imperative for responsible design. This movement is redefining how we conceive, construct, and inhabit the built environment.</p>
    
    <h2>Beyond Green Aesthetics</h2>
    <p>Sustainable architecture goes far beyond the visual cues we often associate with "green buildings." While living walls and solar panels might be the most visible elements, true sustainability is embedded in every aspect of a building's design, construction, and operation.</p>
    
    <p>From site selection and orientation to material choices, energy systems, and water management, sustainable architecture takes a holistic approach to minimizing environmental impact while maximizing human wellbeing.</p>
    
    <h2>Passive Design Strategies</h2>
    <p>Perhaps the most elegant sustainable approaches are passive design strategies that work with natural forces rather than against them. These strategies have roots in vernacular architecture—the traditional building methods that evolved in response to local climates before mechanical heating and cooling were available.</p>
    
    <p>Examples include proper building orientation to capture (or avoid) solar heat gain, thermal mass to moderate temperature fluctuations, natural ventilation systems that harness prevailing winds, and daylight design that reduces the need for artificial lighting while avoiding glare and overheating.</p>
    
    <h2>Materials Revolution</h2>
    <p>The materials used in construction have enormous environmental implications, from extraction and manufacturing to transportation, installation, maintenance, and eventual disposal or reuse.</p>
    
    <p>Sustainable architecture favors materials with low embodied carbon (the total greenhouse gas emissions associated with a material's entire lifecycle), renewable resources that can be replenished within a human timeframe, and recycled or reclaimed materials that divert waste from landfills.</p>
    
    <p>Innovations in this space include mass timber construction (which sequesters carbon while reducing the need for carbon-intensive concrete and steel), bio-based materials derived from agricultural waste, and new formulations of concrete that incorporate carbon capture technology.</p>
    
    <h2>Energy Performance</h2>
    <p>Buildings account for approximately 40% of global energy consumption, making energy efficiency a cornerstone of sustainable design. The most advanced sustainable buildings aim for net-zero energy use or even net-positive performance, where they generate more energy than they consume.</p>
    
    <p>This is achieved through a combination of minimal energy requirements (via insulation, high-performance windows, efficient systems, and smart controls) and renewable energy generation (primarily through solar, but sometimes supplemented by wind or geothermal systems).</p>
    
    <h2>Water Consciousness</h2>
    <p>As water scarcity affects more regions globally, sustainable architecture increasingly incorporates water-efficient fixtures, rainwater harvesting, graywater recycling, and landscape design that minimizes irrigation needs through native plantings and efficient delivery systems.</p>
    
    <p>In urban contexts, buildings are also being designed to manage stormwater on-site rather than contributing to runoff and overtaxing municipal systems during heavy precipitation events.</p>
    
    <h2>Healthy Interiors</h2>
    <p>Sustainability extends to human health as well as environmental impact. Sustainable buildings prioritize indoor air quality through low-VOC materials, effective ventilation, access to natural light, connections to nature, and spaces designed for physical and psychological wellbeing.</p>
    
    <p>This "wellness" dimension of sustainable design recognizes that buildings that make people sick or uncomfortable fail in their fundamental purpose, regardless of their environmental performance.</p>
    
    <h2>Adaptive Reuse</h2>
    <p>Sometimes the most sustainable building is one that already exists. Renovating and repurposing existing structures conserves the embodied energy and materials in the original construction while reducing waste and often preserving cultural heritage.</p>
    
    <p>Creative adaptive reuse projects have transformed factories into apartments, power plants into museums, and warehouses into vibrant mixed-use developments—giving new life to structures that might otherwise have been demolished.</p>
    
    <h2>The Future of Sustainable Architecture</h2>
    <p>As climate imperatives become more urgent, sustainable architecture continues to evolve. Emerging focus areas include carbon-negative buildings that sequester more carbon than they emit, regenerative designs that actively improve their environments, and circular economy approaches that plan for eventual disassembly and material reuse.</p>
    
    <p>Through thoughtful design that balances environmental responsibility, social equity, and economic viability, sustainable architecture is creating buildings that will serve humanity and the planet well into the future.</p>`,
    excerpt: 'Discover the principles, strategies, and innovations in sustainable architecture that are creating buildings with minimal environmental impact and maximum human wellbeing.',
    coverImage: 'https://images.pexels.com/photos/1105754/pexels-photo-1105754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    publishedAt: '2023-07-18T13:20:00Z',
    readTime: 9,
    category: 'design',
    tags: ['architecture', 'sustainability', 'design', 'environment'],
    author: mockUsers[2],
    likeCount: 187,
    commentCount: 29,
    isLiked: false,
    isBookmarked: false,
  },
];

// Mock Comments
export const mockComments: Comment[] = [
  {
    id: '1',
    articleId: '1',
    parentId: null,
    author: mockUsers[1],
    content: "This is a fantastic overview of where web development is heading! I'm particularly excited about the potential of WebAssembly to bring more performance-intensive applications to the browser.",
    createdAt: '2023-10-15T14:30:00Z',
    likeCount: 12,
    isLiked: false,
  },
  {
    id: '2',
    articleId: '1',
    parentId: '1',
    author: mockUsers[0],
    content: 'Thanks for your comment! WebAssembly is indeed one of the most exciting developments. Have you experimented with it in any of your projects yet?',
    createdAt: '2023-10-15T15:45:00Z',
    likeCount: 5,
    isLiked: false,
  },
  {
    id: '3',
    articleId: '1',
    parentId: '2',
    author: mockUsers[1],
    content: "I've been using it for a 3D visualization tool in a data analysis project. The performance gain compared to pure JavaScript is remarkable, especially for the matrix calculations we're doing.",
    createdAt: '2023-10-15T16:20:00Z',
    likeCount: 8,
    isLiked: false,
  },
  {
    id: '4',
    articleId: '1',
    parentId: null,
    author: mockUsers[2],
    content: 'I appreciate the emphasis on accessibility becoming a standard rather than an afterthought. We still have a long way to go, but more developers are finally recognizing its importance.',
    createdAt: '2023-10-16T09:10:00Z',
    likeCount: 15,
    isLiked: false,
  },
  {
    id: '5',
    articleId: '2',
    parentId: null,
    author: mockUsers[0],
    content: 'This article should be required reading for anyone working in UI/UX design. The principle of least surprise is so simple yet so often overlooked in modern interfaces.',
    createdAt: '2023-09-28T18:05:00Z',
    likeCount: 23,
    isLiked: false,
  },
  {
    id: '6',
    articleId: '2',
    parentId: '5',
    author: mockUsers[1],
    content: "I'm glad you found it valuable! You're right that sometimes the simplest principles are the most powerful. When users don't have to think about how to use an interface, that's when we've succeeded as designers.",
    createdAt: '2023-09-28T19:15:00Z',
    likeCount: 10,
    isLiked: false,
  },
  {
    id: '7',
    articleId: '2',
    parentId: null,
    author: mockUsers[2],
    content: "Great article, but I think there's a tension between following established patterns and innovating with new interaction models. How do you balance consistency with innovation?",
    createdAt: '2023-09-29T11:30:00Z',
    likeCount: 8,
    isLiked: false,
  },
  {
    id: '8',
    articleId: '3',
    parentId: null,
    author: mockUsers[0],
    content: "The triple bottom line approach has been transformative for our company. We've found that our environmental initiatives have actually created customer loyalty that translates to long-term profitability.",
    createdAt: '2023-09-11T08:45:00Z',
    likeCount: 19,
    isLiked: false,
  },
  {
    id: '9',
    articleId: '3',
    parentId: '8',
    author: mockUsers[2],
    content: "That's great to hear! Would you be willing to share some specific examples of environmental initiatives that resonated most with your customers?",
    createdAt: '2023-09-11T09:20:00Z',
    likeCount: 7,
    isLiked: false,
  },
  {
    id: '10',
    articleId: '3',
    parentId: null,
    author: mockUsers[1],
    content: "I think the section on long-term customer relationships is particularly relevant in today's subscription economy. The shift from one-time purchases to ongoing relationships changes the entire business dynamic.",
    createdAt: '2023-09-12T14:10:00Z',
    likeCount: 12,
    isLiked: false,
  },
  {
    id: '11',
    articleId: '4',
    parentId: null,
    author: mockUsers[2],
    content: "The section on digital boundaries resonated with me deeply. I've implemented a 'digital sunset' practice for the past few months, and it's improved both my sleep and my general sense of wellbeing.",
    createdAt: '2023-08-23T07:15:00Z',
    likeCount: 34,
    isLiked: false,
  },
  {
    id: '12',
    articleId: '4',
    parentId: '11',
    author: mockUsers[1],
    content: "I'm so glad to hear that! The digital sunset practice has been transformative for many people. Have you noticed any specific improvements in your sleep quality?",
    createdAt: '2023-08-23T09:30:00Z',
    likeCount: 8,
    isLiked: false,
  },
  {
    id: '13',
    articleId: '5',
    parentId: null,
    author: mockUsers[2],
    content: "The section on healthcare applications of AI is particularly exciting. I work in medical imaging, and we're already seeing AI assist radiologists in detecting subtle abnormalities that might otherwise be missed.",
    createdAt: '2023-08-06T16:45:00Z',
    likeCount: 27,
    isLiked: false,
  },
  {
    id: '14',
    articleId: '5',
    parentId: '13',
    author: mockUsers[0],
    content: "That's fascinating! Is the AI completely autonomous in your facility, or does it function more as a second opinion for human radiologists?",
    createdAt: '2023-08-06T17:30:00Z',
    likeCount: 11,
    isLiked: false,
  },
  {
    id: '15',
    articleId: '5',
    parentId: '14',
    author: mockUsers[2],
    content: "It's definitely a collaborative approach. The AI flags potential areas of concern, but radiologists make the final interpretations and diagnoses. This partnership leverages the strengths of both: AI's consistency and pattern recognition with the radiologist's contextual understanding and judgment.",
    createdAt: '2023-08-06T18:15:00Z',
    likeCount: 19,
    isLiked: false,
  },
  {
    id: '16',
    articleId: '6',
    parentId: null,
    author: mockUsers[0],
    content: "As someone working in construction, I've noticed a significant shift toward sustainable materials in the past few years. Clients are increasingly requesting low-VOC finishes and responsibly sourced wood products, even when they cost more upfront.",
    createdAt: '2023-07-19T10:20:00Z',
    likeCount: 15,
    isLiked: false,
  },
  {
    id: '17',
    articleId: '6',
    parentId: null,
    author: mockUsers[1],
    content: "The section on adaptive reuse is particularly relevant in cities with historical buildings. I'd love to see more examples of successful adaptive reuse projects that maintain historical character while achieving high sustainability standards.",
    createdAt: '2023-07-20T14:35:00Z',
    likeCount: 21,
    isLiked: false,
  },
];