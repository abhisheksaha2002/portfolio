export const profile = {
  name: 'Abhishek Dwipen Saha',
  status: 'open to opportunities',
  roles: [
    'agentic RAG platforms',
    'enterprise search systems',
    'graph-based deep learning',
    'distributed backend services',
  ],
  blurb:
    "I build the systems that sit between a question and the right answer. An MS Computer Science student at UMass Amherst, previously an Associate Technical Consultant shipping search infrastructure for Abbott's global platform.",
  email: 'abhisheksaha@umass.edu',
  phone: '+1 (413) 472-6253',
  phoneHref: 'tel:+14134726253',
  linkedin: 'https://www.linkedin.com/in/abhishek-saha-705095200/',
  github: 'https://github.com/abhisheksaha2002',
  location: 'Amherst, Massachusetts',
}

export const stats = [
  { value: '80%', label: 'faster search response time' },
  { value: '25%', label: 'search relevance improvement' },
  { value: '140+', label: 'countries served in rollout' },
  { value: '30%', label: 'fewer API failures' },
  { value: '90%', label: 'smaller RAG prompt context' },
  { value: '0.87M', label: 'params vs 8.7M+ baselines' },
]

export const experience = [
  {
    org: 'Perficient',
    role: "Associate Technical Consultant, embedded with Abbott's engineering team",
    place: 'Chennai',
    when: 'May 2024 – Nov 2025',
    score: 97,
    bullets: [
      'Built Spring Boot microservices for automated data ingestion, integrating AWS S3 during a migration to Coveo and cutting search response time by 80%.',
      "Connected those services to a React-based search interface and Adobe Experience Manager, adding region-specific filtering across Abbott's platforms in 140+ countries.",
      'Tuned Coveo relevance models (ART, RGA) and query pipelines, improving search relevance by 25%.',
      'Traced a production S3 signature bug to request re-encoding, reducing API failures by 30% across distributed services.',
      'Owned deployment for 10+ releases across two-week Agile sprints.',
    ],
  },
  {
    org: 'Oil and Natural Gas Corporation (ONGC)',
    role: 'Software Engineer Intern',
    place: 'Mumbai',
    when: 'Dec 2022 – Feb 2023',
    score: 88,
    bullets: [
      'Built a full-stack financial document portal with Spring Boot and React, cutting document retrieval time by 60% via Spring Security, JWT, and role-based access.',
      'Designed RESTful APIs with JPA/Hibernate and H2, using UUID-based filenames to prevent collisions and path-traversal issues.',
    ],
  },
]

export const projects = [
  {
    name: 'Klaris',
    tag: 'agentic RAG',
    icon: '🔗',
    summary:
      'Multi-source RAG platform that ingests GitHub repos, web pages, and YouTube transcripts into one knowledge base.',
    detail:
      "Its defining feature is cross-source synthesis — querying each source independently, then comparing and contrasting the answers rather than just merging them. Chunking and LanceDB vector indexing cut prompt context size by roughly 90% versus full-document prompting, with a provider layer that swaps between local Ollama inference and cloud-hosted Groq models without touching application code.",
    stack: ['FastAPI', 'React', 'LangChain', 'LanceDB', 'Docker', 'Ollama / Groq'],
    link: undefined as string | undefined,
  },
  {
    name: 'TumorGraphNet',
    tag: 'graph learning',
    icon: '🧠',
    summary:
      'Unsupervised dual-graph autoencoder for brain tumor segmentation on MRI scans.',
    detail:
      'Combines a spatial adjacency graph with a multi-scale feature-similarity graph through a cross-graph attention fusion module. An eight-dimensional superpixel feature pipeline feeds K-Means++ clustering to produce segmentation masks with no labeled training data — reaching competitive accuracy at 0.87M parameters, roughly a tenth the size of the 8.7M–11.4M-parameter baselines it is benchmarked against.',
    stack: ['Python', 'PyTorch', 'Keras', 'OpenCV'],
    link: undefined as string | undefined,
  },
]

export const skillGroups = [
  { name: 'languages', icon: '⌨️', items: ['C++', 'Python', 'Java', 'JavaScript', 'TypeScript', 'SQL'] },
  { name: 'systems & backend', icon: '🛠️', items: ['Spring Boot', 'FastAPI', 'REST APIs', 'Microservices', 'Apache Spark', 'Linux'] },
  { name: 'AI / ML & retrieval', icon: '🤖', items: ['PyTorch', 'TensorFlow', 'LangChain', 'Graph Neural Networks', 'Information Retrieval'] },
  { name: 'frontend', icon: '🎨', items: ['React', 'HTML', 'CSS'] },
  { name: 'databases & search', icon: '🗄️', items: ['LanceDB', 'Vector Databases', 'MySQL', 'Coveo'] },
  { name: 'devops & tools', icon: '☁️', items: ['AWS S3', 'Docker', 'Kubernetes', 'Git', 'Claude Code', 'Jira'] },
]

export const education = [
  {
    school: 'University of Massachusetts Amherst',
    degree: 'Master of Science in Computer Science · CICS',
    when: 'Sep 2026 – May 2028',
    icon: '🎓',
  },
  {
    school: 'Vellore Institute of Technology',
    degree: 'B.Tech in Information Technology · CGPA 8.32/10',
    when: 'Sep 2020 – May 2024',
    icon: '🎓',
  },
]

export const certifications = [
  { name: 'Microsoft SC-900', detail: 'Security, Compliance & Identity Fundamentals', icon: '🛡️' },
]
