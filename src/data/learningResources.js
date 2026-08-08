// Structured learning content per topic: trusted resources, prerequisites,
// short practice quizzes, and project ideas. Links point to real, well-known
// platforms/providers for each subject.

export const LEARNING_TOPICS = [
  {
    id: 'dsa',
    title: 'DSA',
    difficulty: 'Intermediate',
    estimatedHours: 60,
    rating: 4.8,
    prerequisites: ['Basic programming in any language'],
    resources: [
      { provider: 'Striver', title: 'A2Z DSA Sheet', type: 'Course', duration: '8–10 weeks', free: true, rating: 4.9, url: 'https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2' },
      { provider: 'NeetCode', title: 'NeetCode Roadmap', type: 'Course', duration: '6–8 weeks', free: true, rating: 4.8, url: 'https://neetcode.io/roadmap' },
      { provider: 'LeetCode', title: 'Practice Problems', type: 'Practice', duration: 'Ongoing', free: false, rating: 4.7, url: 'https://leetcode.com/problemset/' },
      { provider: 'GeeksforGeeks', title: 'DSA Self-Paced Course', type: 'Course', duration: '10 weeks', free: false, rating: 4.4, url: 'https://www.geeksforgeeks.org/courses/dsa-self-paced' },
      { provider: 'VisuAlgo', title: 'Algorithm Visualizations', type: 'Reference', duration: 'Self-paced', free: true, rating: 4.6, url: 'https://visualgo.net/en' },
    ],
    quiz: [
      { q: 'Which data structure uses FIFO ordering?', options: ['Stack', 'Queue', 'Tree', 'Graph'], answer: 1 },
      { q: 'Time complexity of binary search?', options: ['O(n)', 'O(n log n)', 'O(log n)', 'O(1)'], answer: 2 },
      { q: 'Which traversal visits the root first?', options: ['In-order', 'Post-order', 'Pre-order', 'Level-order'], answer: 2 },
    ],
    projects: [
      { title: 'Visualize sorting algorithms', difficulty: 'Beginner' },
      { title: 'Build a pathfinding visualizer (A*, Dijkstra)', difficulty: 'Advanced' },
    ],
  },
  {
    id: 'react',
    title: 'React',
    difficulty: 'Intermediate',
    estimatedHours: 35,
    rating: 4.7,
    prerequisites: ['JavaScript fundamentals', 'HTML & CSS'],
    resources: [
      { provider: 'React', title: 'Official Documentation', type: 'Docs', duration: 'Self-paced', free: true, rating: 4.8, url: 'https://react.dev/' },
      { provider: 'freeCodeCamp', title: 'React Full Course', type: 'Video', duration: '12 hours', free: true, rating: 4.7, url: 'https://www.freecodecamp.org/news/tag/react/' },
      { provider: 'Scrimba', title: 'Learn React', type: 'Interactive Course', duration: '6 hours', free: false, rating: 4.6, url: 'https://scrimba.com/learn/learnreact' },
      { provider: 'Frontend Mentor', title: 'React Practice Projects', type: 'Practice', duration: 'Ongoing', free: true, rating: 4.5, url: 'https://www.frontendmentor.io/' },
      { provider: 'LeetCode', title: 'Front-end / React Questions', type: 'Practice', duration: 'Ongoing', free: false, rating: 4.2, url: 'https://leetcode.com/studyplan/react/' },
    ],
    quiz: [
      { q: 'What hook manages local state in a function component?', options: ['useEffect', 'useState', 'useRef', 'useMemo'], answer: 1 },
      { q: 'What does JSX compile to?', options: ['HTML strings', 'React.createElement calls', 'CSS objects', 'JSON'], answer: 1 },
      { q: 'Which hook runs side effects after render?', options: ['useState', 'useReducer', 'useEffect', 'useContext'], answer: 2 },
    ],
    projects: [
      { title: 'Build a component library with Storybook', difficulty: 'Intermediate' },
      { title: 'Kanban board with drag-and-drop', difficulty: 'Advanced' },
    ],
  },
  {
    id: 'python',
    title: 'Python',
    difficulty: 'Beginner',
    estimatedHours: 40,
    rating: 4.8,
    prerequisites: [],
    resources: [
      { provider: 'Python.org', title: 'Official Documentation', type: 'Docs', duration: 'Self-paced', free: true, rating: 4.7, url: 'https://docs.python.org/3/' },
      { provider: 'Harvard', title: 'CS50\'s Introduction to Python', type: 'Course', duration: '10 weeks', free: true, rating: 4.9, url: 'https://cs50.harvard.edu/python/' },
      { provider: 'freeCodeCamp', title: 'Python for Everybody', type: 'Video', duration: '14 hours', free: true, rating: 4.7, url: 'https://www.freecodecamp.org/news/python-for-everybody/' },
      { provider: 'Kaggle', title: 'Kaggle Learn: Python', type: 'Interactive Course', duration: '5 hours', free: true, rating: 4.6, url: 'https://www.kaggle.com/learn/python' },
      { provider: 'HackerRank', title: 'Python Practice', type: 'Practice', duration: 'Ongoing', free: true, rating: 4.4, url: 'https://www.hackerrank.com/domains/python' },
    ],
    quiz: [
      { q: 'Which keyword defines a function in Python?', options: ['func', 'def', 'function', 'lambda'], answer: 1 },
      { q: 'What does `len([1,2,3])` return?', options: ['2', '3', '4', 'Error'], answer: 1 },
      { q: 'Which is a mutable data type?', options: ['tuple', 'str', 'list', 'int'], answer: 2 },
    ],
    projects: [
      { title: 'CLI expense tracker', difficulty: 'Beginner' },
      { title: 'Web scraper with data export', difficulty: 'Intermediate' },
    ],
  },
  {
    id: 'java',
    title: 'Java',
    difficulty: 'Beginner',
    estimatedHours: 45,
    rating: 4.5,
    prerequisites: ['Basic OOP concepts'],
    resources: [
      { provider: 'Oracle', title: 'Official Java Documentation', type: 'Docs', duration: 'Self-paced', free: true, rating: 4.5, url: 'https://docs.oracle.com/en/java/' },
      { provider: 'freeCodeCamp', title: 'Java Full Course', type: 'Video', duration: '12 hours', free: true, rating: 4.6, url: 'https://www.freecodecamp.org/news/tag/java/' },
      { provider: 'GeeksforGeeks', title: 'Java Programming Course', type: 'Course', duration: '8 weeks', free: false, rating: 4.3, url: 'https://www.geeksforgeeks.org/java/java-programming-language/' },
      { provider: 'HackerRank', title: 'Java Practice', type: 'Practice', duration: 'Ongoing', free: true, rating: 4.3, url: 'https://www.hackerrank.com/domains/java' },
    ],
    quiz: [
      { q: 'Which keyword is used to inherit a class?', options: ['implements', 'extends', 'inherits', 'super'], answer: 1 },
      { q: 'What is the default value of a boolean field?', options: ['true', 'false', 'null', '0'], answer: 1 },
      { q: 'Which collection maintains insertion order?', options: ['HashSet', 'TreeSet', 'ArrayList', 'HashMap'], answer: 2 },
    ],
    projects: [
      { title: 'Library management system', difficulty: 'Beginner' },
      { title: 'Multi-threaded chat server', difficulty: 'Advanced' },
    ],
  },
  {
    id: 'ai',
    title: 'AI',
    difficulty: 'Advanced',
    estimatedHours: 55,
    rating: 4.7,
    prerequisites: ['Python', 'Linear algebra basics', 'Statistics basics'],
    resources: [
      { provider: 'DeepLearning.AI', title: 'AI For Everyone', type: 'Course', duration: '6 hours', free: false, rating: 4.8, url: 'https://www.deeplearning.ai/courses/ai-for-everyone/' },
      { provider: 'Kaggle', title: 'Kaggle Learn: Intro to AI/ML', type: 'Interactive Course', duration: '5 hours', free: true, rating: 4.6, url: 'https://www.kaggle.com/learn' },
      { provider: 'freeCodeCamp', title: 'Machine Learning with Python', type: 'Video', duration: '10 hours', free: true, rating: 4.6, url: 'https://www.freecodecamp.org/learn/machine-learning-with-python/' },
      { provider: 'Coursera', title: 'Andrew Ng — Machine Learning Specialization', type: 'Course', duration: '3 months', free: false, rating: 4.9, url: 'https://www.coursera.org/specializations/machine-learning-introduction' },
    ],
    quiz: [
      { q: 'What is overfitting?', options: ['Model too simple', 'Model memorizes training data', 'Model trains too fast', 'Model has no data'], answer: 1 },
      { q: 'Which is a supervised learning task?', options: ['Clustering', 'Classification', 'Dimensionality reduction', 'Anomaly detection'], answer: 1 },
      { q: 'What does a loss function measure?', options: ['Model speed', 'Prediction error', 'Data size', 'Memory usage'], answer: 1 },
    ],
    projects: [
      { title: 'Sentiment analysis on tweets', difficulty: 'Intermediate' },
      { title: 'Fine-tune a small classifier', difficulty: 'Advanced' },
    ],
  },
  {
    id: 'ml',
    title: 'Machine Learning',
    difficulty: 'Advanced',
    estimatedHours: 50,
    rating: 4.7,
    prerequisites: ['Python', 'Statistics basics'],
    resources: [
      { provider: 'Coursera', title: 'Machine Learning Specialization', type: 'Course', duration: '3 months', free: false, rating: 4.9, url: 'https://www.coursera.org/specializations/machine-learning-introduction' },
      { provider: 'Kaggle', title: 'Kaggle Learn: Intro to ML', type: 'Interactive Course', duration: '3 hours', free: true, rating: 4.6, url: 'https://www.kaggle.com/learn/intro-to-machine-learning' },
      { provider: 'scikit-learn', title: 'Official User Guide', type: 'Docs', duration: 'Self-paced', free: true, rating: 4.7, url: 'https://scikit-learn.org/stable/user_guide.html' },
      { provider: 'Udemy', title: 'Machine Learning A-Z', type: 'Course', duration: '44 hours', free: false, rating: 4.5, url: 'https://www.udemy.com/course/machinelearning/' },
    ],
    quiz: [
      { q: 'Which algorithm is used for classification?', options: ['Linear Regression', 'Logistic Regression', 'K-Means', 'PCA'], answer: 1 },
      { q: 'What does "features" mean in ML?', options: ['Output labels', 'Input variables', 'Model weights', 'Error terms'], answer: 1 },
      { q: 'Which technique reduces dimensionality?', options: ['PCA', 'Gradient Descent', 'Cross-validation', 'Regularization'], answer: 0 },
    ],
    projects: [
      { title: 'House price prediction with regression', difficulty: 'Beginner' },
      { title: 'End-to-end ML pipeline with deployment', difficulty: 'Advanced' },
    ],
  },
  {
    id: 'devops',
    title: 'DevOps',
    difficulty: 'Intermediate',
    estimatedHours: 40,
    rating: 4.4,
    prerequisites: ['Linux basics', 'Networking basics'],
    resources: [
      { provider: 'Docker', title: 'Official Get Started Guide', type: 'Docs', duration: 'Self-paced', free: true, rating: 4.6, url: 'https://docs.docker.com/get-started/' },
      { provider: 'Kubernetes', title: 'Official Documentation', type: 'Docs', duration: 'Self-paced', free: true, rating: 4.5, url: 'https://kubernetes.io/docs/home/' },
      { provider: 'freeCodeCamp', title: 'DevOps Full Course', type: 'Video', duration: '11 hours', free: true, rating: 4.5, url: 'https://www.freecodecamp.org/news/tag/devops/' },
      { provider: 'Udemy', title: 'Docker & Kubernetes: The Practical Guide', type: 'Course', duration: '22 hours', free: false, rating: 4.6, url: 'https://www.udemy.com/course/docker-kubernetes-the-practical-guide/' },
    ],
    quiz: [
      { q: 'What does CI/CD stand for?', options: ['Code Integration / Code Deployment', 'Continuous Integration / Continuous Delivery', 'Container Instance / Container Deployment', 'Code Inspection / Code Debugging'], answer: 1 },
      { q: 'What is a Docker image?', options: ['A running container', 'A blueprint for containers', 'A virtual machine', 'A network config'], answer: 1 },
      { q: 'What does Kubernetes manage?', options: ['Databases only', 'Containerized applications at scale', 'DNS records', 'Git repositories'], answer: 1 },
    ],
    projects: [
      { title: 'Containerize a full-stack app', difficulty: 'Intermediate' },
      { title: 'Set up a CI/CD pipeline with GitHub Actions', difficulty: 'Intermediate' },
    ],
  },
  {
    id: 'system-design',
    title: 'System Design',
    difficulty: 'Advanced',
    estimatedHours: 45,
    rating: 4.7,
    prerequisites: ['Data structures basics', 'Networking basics', 'Databases basics'],
    resources: [
      { provider: 'GitHub', title: 'System Design Primer', type: 'Reference', duration: 'Self-paced', free: true, rating: 4.9, url: 'https://github.com/donnemartin/system-design-primer' },
      { provider: 'ByteByteGo', title: 'System Design Interview Newsletter', type: 'Reference', duration: 'Ongoing', free: true, rating: 4.7, url: 'https://blog.bytebytego.com/' },
      { provider: 'Educative', title: 'Grokking the System Design Interview', type: 'Course', duration: '20 hours', free: false, rating: 4.6, url: 'https://www.educative.io/courses/grokking-the-system-design-interview' },
      { provider: 'NeetCode', title: 'System Design for Beginners', type: 'Video', duration: '5 hours', free: true, rating: 4.6, url: 'https://neetcode.io/courses/system-design-for-beginners' },
    ],
    quiz: [
      { q: 'What does a load balancer do?', options: ['Stores data', 'Distributes traffic across servers', 'Compiles code', 'Encrypts passwords'], answer: 1 },
      { q: 'What is horizontal scaling?', options: ['Adding more power to one server', 'Adding more servers', 'Reducing server count', 'Compressing data'], answer: 1 },
      { q: 'What problem does caching solve?', options: ['Security', 'Reducing repeated expensive computation/reads', 'Code readability', 'Data loss'], answer: 1 },
    ],
    projects: [
      { title: 'Design a URL shortener', difficulty: 'Intermediate' },
      { title: 'Design a scalable notification system', difficulty: 'Advanced' },
    ],
  },
  {
    id: 'web-dev',
    title: 'Web Development',
    difficulty: 'Beginner',
    estimatedHours: 50,
    rating: 4.6,
    prerequisites: [],
    resources: [
      { provider: 'MDN', title: 'Web Docs — Learn Web Development', type: 'Docs', duration: 'Self-paced', free: true, rating: 4.8, url: 'https://developer.mozilla.org/en-US/docs/Learn' },
      { provider: 'freeCodeCamp', title: 'Responsive Web Design', type: 'Course', duration: '15 hours', free: true, rating: 4.8, url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/' },
      { provider: 'Frontend Mentor', title: 'Real-world Practice Projects', type: 'Practice', duration: 'Ongoing', free: true, rating: 4.6, url: 'https://www.frontendmentor.io/' },
      { provider: 'Udemy', title: 'The Complete Web Developer Course', type: 'Course', duration: '30 hours', free: false, rating: 4.5, url: 'https://www.udemy.com/topic/web-development/' },
    ],
    quiz: [
      { q: 'Which tag defines the largest heading in HTML?', options: ['<h6>', '<heading>', '<h1>', '<head>'], answer: 2 },
      { q: 'Which CSS property controls spacing outside an element?', options: ['padding', 'margin', 'border', 'gap'], answer: 1 },
      { q: 'What does the "box model" describe?', options: ['Browser storage', 'Layout of content, padding, border, margin', 'Color theory', 'HTTP requests'], answer: 1 },
    ],
    projects: [
      { title: 'Responsive multi-page portfolio site', difficulty: 'Beginner' },
      { title: 'Progressive Web App with offline support', difficulty: 'Advanced' },
    ],
  },
]

export function getTopic(id) {
  return LEARNING_TOPICS.find((t) => t.id === id)
}
