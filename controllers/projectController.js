const Project = require('../models/Project');

// Default premium seed projects
const DEFAULT_PROJECTS = [
  {
    title: "AI-Based Quiz System",
    description: "🚀 Built an AI-Powered Quiz System using the MERN stack that generates MCQs instantly with AI, features a modern responsive UI, real-time scoring, secure authentication, and optimized backend performance.",
    tags: ["MongoDB", "Express.js", "React.js", "Node.js", "Gemini AI"],
    featured: true,
    githubLink: "https://github.com/Shaheer884/AI_Quiz_System_Frontend",
    liveLink: "https://ai-quiz-system-frontend.vercel.app/register"
  },
  {
    title: "Auction Bidding System",
    description: "Dynamic auction platform allowing users to create listings, place bids in real-time, and manage their auction activities.",
    tags: ["PHP", "MySQL", "JavaScript", "Bootstrap"],
    featured: true,
    githubLink: "https://github.com/Shaheer884",
    liveLink: "https://demo.com"
  },
  {
    title: "Chat Application",
    description: "Real-time messaging application built with Kotlin for Android. Features include user authentication, message encryption, and push notifications.",
    tags: ["Kotlin", "Firebase", "Android SDK"],
    featured: true,
    githubLink: "https://github.com/Shaheer884",
    liveLink: "https://demo.com"
  },
  {
    title: "E-Commerce Website",
    description: "Full-featured online shopping platform with product catalog, shopping cart, user accounts, and secure payment integration.",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    featured: true,
    githubLink: "https://github.com/Shaheer884",
    liveLink: "https://demo.com"
  },
  {
    title: "Typing Speed Test System",
    description: "A real-time typing performance application that measures typing speed (WPM), accuracy, and error rate. Features include timer-based tests, performance tracking, leaderboard rankings, and detailed typing analytics to help users improve their typing skills.",
    tags: ["React", "Node.js", "Express.js", "MongoDB", "JWT"],
    featured: true,
    githubLink: "https://github.com/Shaheer884/Typing_Speed_System_Frontend",
    liveLink: "https://typing-speed-system-frontend.vercel.app/"
  }
];

// @desc    Get all projects (and auto-seed if empty)
// @route   GET /api/projects
// @access  Public
exports.getProjects = async (req, res) => {
  try {
    let projects = await Project.find().sort({ createdAt: 1 });
    
    // If no projects in database, seed it automatically with default premium ones
    if (projects.length === 0) {
      console.log('Seeding default projects to MongoDB...');
      projects = await Project.create(DEFAULT_PROJECTS);
    } else {
      // Ensure existing database entry for AI-Based Quiz System is updated if it has outdated links
      const quizSystem = projects.find(p => p.title === "AI-Based Quiz System");
      if (quizSystem && (quizSystem.githubLink === "https://github.com/Shaheer884" || quizSystem.liveLink === "https://demo.com")) {
        console.log('Updating AI-Based Quiz System links in database...');
        await Project.updateOne(
          { title: "AI-Based Quiz System" },
          {
            githubLink: "https://github.com/Shaheer884/AI_Quiz_System_Frontend",
            liveLink: "https://ai-quiz-system-frontend.vercel.app/register"
          }
        );
        // Refresh project list after update
        projects = await Project.find().sort({ createdAt: 1 });
      }

      // Ensure existing database entry for Typing Speed Test System is updated if it has outdated links
      const typingSpeedSystem = projects.find(p => p.title === "Typing Speed Test System");
      if (typingSpeedSystem && (typingSpeedSystem.githubLink === "https://github.com" || typingSpeedSystem.githubLink === "https://github.com/Shaheer884" || typingSpeedSystem.liveLink === "https://demo.com")) {
        console.log('Updating Typing Speed Test System links in database...');
        await Project.updateOne(
          { title: "Typing Speed Test System" },
          {
            githubLink: "https://github.com/Shaheer884/Typing_Speed_System_Frontend",
            liveLink: "https://typing-speed-system-frontend.vercel.app/"
          }
        );
        // Refresh project list after update
        projects = await Project.find().sort({ createdAt: 1 });
      }
    }
    
    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
