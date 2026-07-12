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
    title: "E-Commerce Website",
    description: "Full-featured online shopping platform with product catalog, shopping cart, user accounts, and secure payment integration.",
    tags: ["React", "Node.js", "MongoDB"],
    featured: true,
    githubLink: "https://github.com/Shaheer884/CodeAlpha_Task1_Ecommerce",
    liveLink: "https://code-alpha-task1-ecommerce.vercel.app/"
  },
  {
    title: "Auction Bidding System",
    description: "Dynamic auction platform allowing users to create listings, place bids in real-time, and manage their auction activities.",
    tags: ["PHP", "MySQL", "Bootstrap"],
    featured: true,
    githubLink: "https://github.com/Shaheer884/Auction_Bidding_System",
    liveLink: "https://myauctionapp.infinityfreeapp.com/index.php"
  },
  {
    title: "Chat Application",
    description: "Real-time messaging application built with Kotlin for Android. Features include user authentication, message encryption, and push notifications.",
    tags: ["Kotlin", "Firebase", "Android SDK"],
    featured: true,
    githubLink: "https://github.com/Shaheer884",
    liveLink: "https://demo.com"
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

      // Ensure "Typing Speed Test System" is deleted from the database
      const typingSpeedSystem = projects.find(p => p.title === "Typing Speed Test System");
      if (typingSpeedSystem) {
        console.log('Deleting Typing Speed Test System from database...');
        await Project.deleteOne({ title: "Typing Speed Test System" });
        // Refresh project list after delete
        projects = await Project.find().sort({ createdAt: 1 });
      }

      // Ensure existing database entry for Auction Bidding System is updated if it has outdated links
      const auctionSystem = projects.find(p => p.title === "Auction Bidding System");
      if (auctionSystem && (auctionSystem.githubLink === "https://github.com" || auctionSystem.githubLink === "https://github.com/Shaheer884" || auctionSystem.liveLink === "https://demo.com")) {
        console.log('Updating Auction Bidding System links in database...');
        await Project.updateOne(
          { title: "Auction Bidding System" },
          {
            githubLink: "https://github.com/Shaheer884/Auction_Bidding_System",
            liveLink: "https://myauctionapp.infinityfreeapp.com/index.php"
          }
        );
        // Refresh project list after update
        projects = await Project.find().sort({ createdAt: 1 });
      }

      // Ensure existing database entry for E-Commerce Website is updated if it has outdated links
      const ecommerceWebsite = projects.find(p => p.title === "E-Commerce Website");
      if (ecommerceWebsite && (ecommerceWebsite.githubLink === "https://github.com" || ecommerceWebsite.githubLink === "https://github.com/Shaheer884" || ecommerceWebsite.liveLink === "https://demo.com")) {
        console.log('Updating E-Commerce Website links in database...');
        await Project.updateOne(
          { title: "E-Commerce Website" },
          {
            githubLink: "https://github.com/Shaheer884/CodeAlpha_Task1_Ecommerce",
            liveLink: "https://code-alpha-task1-ecommerce.vercel.app/"
          }
        );
        // Refresh project list after update
        projects = await Project.find().sort({ createdAt: 1 });
      }

      // Ensure correct relative order in the database for the default projects
      const defaultTitles = [
        "AI-Based Quiz System",
        "E-Commerce Website",
        "Auction Bidding System",
        "Chat Application"
      ];
      
      const currentDefaultOrder = projects
        .filter(p => defaultTitles.includes(p.title))
        .map(p => p.title);
        
      const isOrderCorrect = currentDefaultOrder.length === defaultTitles.length &&
        currentDefaultOrder.every((title, index) => title === defaultTitles[index]);
        
      if (!isOrderCorrect) {
        console.log('Correcting projects order in database...');
        const baseTime = new Date("2026-06-18T10:00:00Z");
        for (let i = 0; i < defaultTitles.length; i++) {
          await Project.updateOne(
            { title: defaultTitles[i] },
            { createdAt: new Date(baseTime.getTime() + i * 60000) }
          );
        }
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
