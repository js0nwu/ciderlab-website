// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-home",
    title: "home",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-publications",
          title: "publications",
          description: "Publications from CIDER Lab and collaborators.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-people",
          title: "people",
          description: "Meet the members and collaborators of the CIDER Lab!",
          section: "Navigation",
          handler: () => {
            window.location.href = "/people/";
          },
        },{id: "nav-join",
          title: "join",
          description: "Opportunities for students and collaborators.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/join/";
          },
        },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "news-hello-world-cider-lab-joins-purdue-university",
          title: 'Hello World! CIDER Lab joins Purdue University.',
          description: "",
          section: "News",},{id: "news-our-paper-improving-user-interface-generation-models-from-designer-feedback-has-been-conditionally-accepted-to-chi-2026",
          title: 'Our paper Improving User Interface Generation Models from Designer Feedback has been conditionally...',
          description: "",
          section: "News",},{id: "news-join-us-at-the-purdue-spring-faculty-undergraduate-research-seminar",
          title: 'Join us at the Purdue Spring Faculty Undergraduate Research Seminar!',
          description: "",
          section: "News",},{id: "projects-framekit",
          title: 'FrameKit',
          description: "Authoring adaptive interfaces through keyframe workflows.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/ai-for-science-workflows/";
            },},{id: "projects-uiclip",
          title: 'UIClip',
          description: "Assessing user interface quality with data-driven models.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/foundation-model-evaluation/";
            },},{id: "projects-uicoder",
          title: 'UICoder',
          description: "Generating user interface code with automated feedback.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/retrieval-augmented-reasoning/";
            },},{id: "teachings-data-science-fundamentals",
          title: 'Data Science Fundamentals',
          description: "This course covers the foundational aspects of data science, including data collection, cleaning, analysis, and visualization. Students will learn practical skills for working with real-world datasets.",
          section: "Teachings",handler: () => {
              window.location.href = "/teachings/data-science-fundamentals/";
            },},{id: "teachings-introduction-to-machine-learning",
          title: 'Introduction to Machine Learning',
          description: "This course provides an introduction to machine learning concepts, algorithms, and applications. Students will learn about supervised and unsupervised learning, model evaluation, and practical implementations.",
          section: "Teachings",handler: () => {
              window.location.href = "/teachings/introduction-to-machine-learning/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%6A%61%73%6F%6E%77%75@%70%75%72%64%75%65.%65%64%75", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/js0nwu", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/jsonwu", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=aKqh7zIAAAAJ", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },];
